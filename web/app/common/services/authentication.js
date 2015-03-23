(function() {

    function AuthenticationService(Http) {

        var authUrls = {
            login: '/auth/login',
            logout: '/auth/logout'
        };

        this.login = function(form, userCredentials) {

            Http.post(authUrls.login, userCredentials)
                .success(function(successData) {

                    var authToken = headers('SimpleAppAuthToken');

                    if(authToken && localStorage.getItem('SimpleAppAuthToken') == null) {
                        localStorage.setItem('SimpleAppAuthToken', authToken);
                    }
                    // Redirect to homepage
                    Location.path(successData.redirectTo);

                    // Reset form to fresh state
                    form.$setPristine();
                    form.attemptedSubmission = false;
                    form.problemLogin = false;

                })
                .error(function(data, status) {
                    form.$setPristine();
                    form.problemLogin = true;
                    form.attemptedSubmission = false;
                });
        };

        this.logout = function(username) {

        };
    };

    AuthenticationService.$inject = ['$http'];

    angular.module('SimpleApp', [])
        .service('AuthenticationService', AuthenticationService);

})();