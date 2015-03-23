(function() {

    function AuthenticationService(Http) {

        var authUrls = {
            login: '/auth/login',
            logout: '/auth/logout'
        };

        this.login = function(form, userCredentials) {
            return Http.post(authUrls.login, userCredentials);
        };

        this.logout = function(username) {
            // TODO: Implement logout service
        };
    };

    AuthenticationService.$inject = ['$http'];

    angular.module('simpleApp')
        .service('AuthenticationService', AuthenticationService);

})();