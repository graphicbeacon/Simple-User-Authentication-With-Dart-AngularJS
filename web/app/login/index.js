(function() {
    'use strict';

    function LoginController (Http, Location, RootScope, AuthenticationService) {

        this.title = "Login";
        this.submitted = false;
        this.userCredentials = {};

        this.authenticate = function(loginFormCtrl) {
            var vm = this;
            var form = loginFormCtrl;

            if(form.$invalid) {
                form.attemptedSubmission = true;
                return;
            }

            AuthenticationService
                .login(form, this.userCredentials)
                .success(function(authToken, status, headers) {
                    // Store token locally
                    localStorage.setItem('SimpleAppAuthToken', authToken);

                    RootScope.loggedIn = true;

                    // Redirect to homepage
                    Location.path('/');

                    // Reset form to pristine state
                    form.$setPristine();
                    vm.userCredentials = {};
                    form.problemLogin = false;
                })
                .error(function(error) {
                    form.$setPristine();
                    form.problemLogin = true;
                });
        };
    }

    LoginController.$inject = ['$http', '$location', '$rootScope', 'AuthenticationService'];

    angular.module("simpleApp")
        .controller("LoginController", LoginController);
})();