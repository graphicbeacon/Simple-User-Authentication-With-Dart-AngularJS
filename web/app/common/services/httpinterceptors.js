(function() {
    'use strict';

    function RouteInterceptors(Q, Location) {

        var request, requestError, response, responseError;

        request = function(config) {

            var authToken = localStorage.getItem('SimpleAppAuthToken');

            // TODO: Manage sitemap structure (allow entry to '/' with link at top to login instead to going straight to /login)
            if (authToken == null) {
                Location.path('/login');
            } else if (authToken && config.url == '/app/login/index.html') {
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

            if(error.status === 401) {
                return Q.reject(error);
            }

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

    angular.module('simpleApp')
        .factory('RouteInterceptors', RouteInterceptors);
})();