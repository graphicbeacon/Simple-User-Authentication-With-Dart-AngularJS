(function(){
    'use strict';


    // TODO: Logic to manage top navigation items, maybe on rootScope
    // TODO: Manage all urls in service?

    function SimpleAppController () {
        this.appName = "Simple App";
    };

    function RoutesConfig (Route, HttpProvider) {

        Route.when('/', {
            templateUrl: '/app/account/index.html' ,
            controller: 'AccountController',
            controllerAs: 'accountCtrl'
        })
        .when('/login', {
            templateUrl: '/app/login/index.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .when('/projects', {
            templateUrl: '/app/projects/index.html',
            controller: 'ProjectsController',
            controllerAs: 'projectsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        HttpProvider.interceptors.push('RouteInterceptors');
    };

    RoutesConfig.$inject = ['$routeProvider', '$httpProvider'];


    function RouteInterceptors(Q, Location) {

        var request, requestError, response, responseError;

        request = function(config) {

            var authToken = localStorage.getItem('SimpleAppAuthToken');

            // TODO: Manage sitemap structure (allow entry to '/' with link at top to login instead to going straight to /login)
            if(authToken == null) {
                Location.path('/login');
            }
            else if(authToken && config.url == '/app/login/index.html') {
                Location.path('/');
            }

            return config;
        };

        requestError = function(error) {
            return Q.reject(error);
        };

        response = function(response) {
            return response;
        };

        responseError = function(error) {
            return Q.reject(error.data);
        };

        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };
    }

    RouteInterceptors.$inject = ['$q', '$location'];



    // Module Setup
    angular.module('simpleApp', ['ngRoute','ngMessages'])
        .controller('SimpleAppController', SimpleAppController)
        .factory('RouteInterceptors', RouteInterceptors)
        .config(RoutesConfig);

})();