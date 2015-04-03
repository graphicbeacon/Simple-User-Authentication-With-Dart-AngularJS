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

    function RoutesConfig (RouteProvider, HttpProvider) {
        // http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
        HttpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        RouteProvider
        .when('/', {
            templateUrl: '/app/dashboard/index.html',
            controller: 'DashboardController',
            controllerAs: 'dashboardCtrl',
            resolve: {
                auth: validateRoutes
            }
        })
        .when('/account', {
            templateUrl: '/app/account/index.html' ,
            controller: 'AccountController',
            controllerAs: 'accountCtrl',
            resolve: {
                auth: validateRoutes
            }
        })
        .when('/login', {
            templateUrl: '/app/login/index.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .when('/projects', {
            templateUrl: '/app/projects/index.html',
            controller: 'ProjectsController',
            controllerAs: 'projectsCtrl',
            resolve: {
                auth: validateRoutes
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
        .run(function($rootScope, $location, AuthenticationService, NavigationService) {

            $rootScope.$on('$routeChangeSuccess', function(ev, current, prev, eventobj) {
                //console.log('success', ev, current, prev, eventobj);
            });

            //http://www.sitepoint.com/implementing-authentication-angular-applications/
            $rootScope.$on('$routeChangeError', function(ev, current, previous, response) {
                console.log(ev, current, previous, eventObj);

                if(response.authenticated === false) {
                    $location.path('/login');
                }
            });

        });

})();