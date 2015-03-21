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

        var request = function(config) {

            if('undefined' == typeof config.headers['SimpleAppAuthToken']) {
                Location.path('/login');
            }

            return config;
        };

        var requestError = function(error) {
            return Q.reject(error);
        };

        var response = function(response) {
            return response;
        };

        return {
            request: request,
            requestError: requestError,
            response: response
        };
    }

    RouteInterceptors.$inject = ['$q', '$location'];



    // Module Setup
    angular.module('SimpleApp', ['ngRoute'])
        .controller('SimpleAppController', SimpleAppController)
        .factory('RouteInterceptors', RouteInterceptors)
        .config(RoutesConfig);

})();