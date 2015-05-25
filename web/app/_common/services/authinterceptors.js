(function() {
    'use strict';

    function AuthInterceptors(Q, Location) {

        var request, responseError;

        request = function(config) {
            return config;
        };

        responseError = function(error) {

            if(error.status === 401 ||
                error.status === 403) {
                return Q.reject(error.data);
            }

            return Q.reject(error);
        };

        return {
            request: request,
            responseError: responseError
        };
    }

    AuthInterceptors.$inject = ['$q', '$location'];

    function AuthConfig(HttpProvider) {
        HttpProvider.interceptors.push('AuthInterceptors');
    }

    AuthConfig.$inject = ['$httpProvider'];

    angular.module('simpleApp')
        .factory('AuthInterceptors', AuthInterceptors)
        .config(AuthConfig);
})();