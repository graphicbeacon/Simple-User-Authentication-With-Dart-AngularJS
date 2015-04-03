(function(){
    'use strict';


    // TODO: Logic to manage top navigation items, maybe on rootScope
    // TODO: Manage all urls in service?

    function SimpleAppController () {
        this.appName = "Simple App";
    }

    function validateRoutes(Q, AuthenticationService) {
        var deferred = Q.defer();

        AuthenticationService.validateToken()
            .then(function (validResponse) {
                deferred.resolve({authenticated: true, response: validResponse});
            },
            function(reason) {
                deferred.reject({authenticated: false, response: reason});
            });

        return deferred.promise;
    }

    validateRoutes.$inject = ['$q', 'AuthenticationService'];

    function updateNavigation (Q, RootScope, AuthenticationService, NavigationService) {
        var deferred = Q.defer();

        NavigationService
            .getNav(AuthenticationService.getAuthToken())
            .then(function(response) {
                deferred.resolve({menu: response.data});
            },
            function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    updateNavigation.$inject = ['$q', '$rootScope', 'AuthenticationService', 'NavigationService'];

    function RoutesConfig (RouteProvider, HttpProvider) {
        // http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
        HttpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        RouteProvider
        .when('/', {
            templateUrl: '/app/dashboard/index.html',
            controller: 'DashboardController',
            controllerAs: 'dashboardCtrl',
            resolve: {
                auth: validateRoutes,
                nav: updateNavigation
            }
        })
        .when('/account', {
            templateUrl: '/app/account/index.html' ,
            controller: 'AccountController',
            controllerAs: 'accountCtrl',
            resolve: {
                auth: validateRoutes,
                nav: updateNavigation
            }
        })
        .when('/login', {
            templateUrl: '/app/login/index.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl',
            resolve: {
                nav: updateNavigation
            }
        })
        .when('/logout', {
            templateUrl: '/app/logout/index.html',
            controller: 'LogoutController',
            controllerAs: 'logoutCtrl',
            resolve: {
                logout: ['$q','AuthenticationService', function(Q, AuthenticationService) {
                    var deferred = Q.defer();

                    AuthenticationService
                        .logout()
                        .then(function(response) {

                            // Remove localStorage token
                            AuthenticationService.setAuthToken(null);

                            deferred.resolve(response.data);

                        },
                        function(error) {
                            console.log(error);

                            deferred.reject(error);
                        });

                    return deferred.promise;
                }],
                nav: updateNavigation
            }
        })
        .when('/projects', {
            templateUrl: '/app/projects/index.html',
            controller: 'ProjectsController',
            controllerAs: 'projectsCtrl',
            resolve: {
                auth: validateRoutes,
                nav: updateNavigation
            }
        })
        .otherwise({
            redirectTo: '/'
        });
    }

    RoutesConfig.$inject = ['$routeProvider', '$httpProvider'];

    // Module Setup
    angular.module('simpleApp', ['ngRoute','ngMessages'])
        .controller('SimpleAppController', SimpleAppController)
        .config(RoutesConfig)
        .run(['$rootScope', '$location', 'AuthenticationService', 'NavigationService',
            function($rootScope, $location, AuthenticationService, NavigationService) {

            $rootScope.$on('$routeChangeSuccess', function(event, response) {
                // Update global navigation
                $rootScope.globalNav = response.locals.nav.menu;
                $rootScope.currentUrl = '#' + response.$$route.originalPath;

                console.log('Route change success', event, response);
            });

            //http://www.sitepoint.com/implementing-authentication-angular-applications/
            $rootScope.$on('$routeChangeError', function(ev, current, previous, response) {
                console.log('Route change error', ev, current, previous, response);

                if(response.authenticated === false) {
                    $location.path('/login');
                }
            });

        }]);

})();