(function() {

    function AuthenticationService(Q, Http, Location) {

        var authUrls, setAuthToken, getAuthToken, login, logout, validateToken;

        authUrls = {
            login: '/auth/login',
            logout: '/auth/logout',
            validateToken: '/auth/token'
        };

        setAuthToken = function(token) {
            if(token === null || token === false) {
                localStorage.removeItem('SimpleAppAuthToken');
            } else {
                localStorage.setItem('SimpleAppAuthToken', token);
            }
        };

        login = function(form, userCredentials) {

            var deferred = Q.defer();

            Http.post(authUrls.login, userCredentials)
                .then(function(response, status, headers) {

                    var authToken = response.data;

                    // Store token locally
                    setAuthToken(authToken);

                    deferred.resolve(authToken);

                    // Redirect to homepage
                    Location.path('/');

                    // Reset form to pristine state
                    form.$setPristine();
                    form.problemLogin = false;
                },
                function(error) {

                    deferred.reject(error);

                    form.$setPristine();
                    form.problemLogin = true;
                });

            return deferred.promise;
        };

        getAuthToken = function() {
            return localStorage.getItem('SimpleAppAuthToken');
        };

        validateToken = function() {

            var token = getAuthToken();

            return Http.post(authUrls.validateToken, { data: token });

        };

        logout = function(username) {

            return Http.post(authUrls.logout, getAuthToken());

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