(function(){
    'use strict';

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
        .otherwise({
            redirectTo: '/'
        });

        HttpProvider.interceptors.push('RouteInterceptors');
    };

    RoutesConfig.$inject = ['$routeProvider', '$httpProvider'];




    function RouteInterceptors(Q, Location) {

        var request, requestError, response, responseError;

        request = function(config) {
            //console.dir(config);

            if(localStorage.getItem('SimpleAppAuthToken') == null) {
                Location.path('/login');
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
            //console.dir(error);
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
    angular.module('SimpleApp', ['ngRoute'])
        .controller('SimpleAppController', SimpleAppController)
        .factory('RouteInterceptors', RouteInterceptors)
        .config(RoutesConfig);

})();