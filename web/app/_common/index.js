(function(){
    'use strict';


    // TODO: Logic to manage top navigation items, maybe on rootScope
    // TODO: Manage all urls in service?

    function SimpleAppController () {
        this.appName = "Simple App";
    }

    function validateRoutes(Q, AuthenticationService) {

        var validateToken = AuthenticationService.validateToken(localStorage.getItem('SimpleAppAuthToken'));

        if(validateToken) {
            return Q.when(validateToken);
        } else {
            return Q.reject({authenticated: false});
        }
    }

    validateRoutes.$inject = ['$q', 'AuthenticationService'];


    function RoutesConfig (RouteProvider) {

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
            controllerAs: 'loginCtrl',
            resolve: {
                auth: validateRoutes
            }
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

    RoutesConfig.$inject = ['$routeProvider'];

    // Module Setup
    angular.module('simpleApp', ['ngRoute','ngMessages'])
        .controller('SimpleAppController', SimpleAppController)
        .config(RoutesConfig)
        .run(function($rootScope, $location, AuthenticationService, NavigationService) {

            var authToken = localStorage.getItem('SimpleAppAuthToken') || '';
            //http://www.sitepoint.com/implementing-authentication-angular-applications/
            $rootScope.$on('$routeChangeError', function(ev, current, previous, eventObj) {
                if(eventObj.authenticated == false) {
                    $location.path('/login');
                }
            });

        });

})();