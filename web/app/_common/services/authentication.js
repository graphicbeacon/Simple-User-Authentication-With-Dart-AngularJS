(function() {

    function AuthenticationService(Q, Http, Location) {

        var authUrls, setAuthToken, getAuthToken, login, logout, validateToken;

        authUrls = {
            login: '/auth/login',
            logout: '/auth/logout',
            validateToken: '/auth/token'
        };

        setAuthToken = function(token) {
            if(!token) {
                localStorage.removeItem('SimpleAppAuthToken');
            } else {
                localStorage.setItem('SimpleAppAuthToken', token);
            }
        };

        login = function(form, userCredentials) {

            return Http.post(authUrls.login, { data: userCredentials });

        };

        getAuthToken = function() {
            return localStorage.getItem('SimpleAppAuthToken');
        };

        validateToken = function() {

            var token = getAuthToken();

            return Http.post(authUrls.validateToken, { data: token });

        };

        logout = function() {
            var token = getAuthToken();

            return Http.post(authUrls.logout, { data: token });

        };

        return {
            login: login,
            logout: logout,
            getAuthToken: getAuthToken,
            setAuthToken: setAuthToken,
            validateToken: validateToken
        }
    }

    AuthenticationService.$inject = ['$q', '$http','$location'];

    angular.module('simpleApp')
        .factory('AuthenticationService', AuthenticationService);

})();