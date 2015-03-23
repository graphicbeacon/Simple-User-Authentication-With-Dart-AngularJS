(function() {
    'use strict';

    function LoginController (Http, Location, AuthenticationService) {

        this.submitted = false;
        this.userCredentials = {};

        this.authenticate = function(loginFormCtrl) {

            var form = loginFormCtrl;

            if(form.$invalid) {
                form.attemptedSubmission = true;
                return;
            }

            AuthenticationService
                .login(form, this.userCredentials)
                .success(function(successData, status, headers) {

                    var authToken = headers('SimpleAppAuthToken');

                    if(authToken && localStorage.getItem('SimpleAppAuthToken') == null) {
                        localStorage.setItem('SimpleAppAuthToken', authToken);
                    }
                    // Redirect to homepage
                    Location.path(successData.redirectTo);

                    // Reset form to pristine state
                    form.$setPristine();
                    this.userCredentials = {};
                    form.problemLogin = false;
                })
                .error(function() {
                    form.$setPristine();
                    form.problemLogin = true;
                });
        };
    };

    
    LoginController.$inject = ['$http', '$location', 'AuthenticationService'];

    angular.module("simpleApp")
        .controller("LoginController", LoginController);
})();