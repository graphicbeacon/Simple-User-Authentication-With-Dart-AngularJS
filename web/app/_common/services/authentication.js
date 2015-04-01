(function() {

    function AuthenticationService(Http) {

        var authUrls = {
            login: '/auth/login',
            logout: '/auth/logout',
            validToken: '/auth/token'
        };

        this.login = function(form, userCredentials) {
            return Http.post(authUrls.login, userCredentials);
        };

        this.validateToken = function(token) {
            return Http.post(authUrls.validToken, token);
        };

        this.logout = function(username) {
            // TODO: Implement logout service
        };
    }

    AuthenticationService.$inject = ['$http'];

    angular.module('simpleApp')
        .service('AuthenticationService', AuthenticationService);

})();