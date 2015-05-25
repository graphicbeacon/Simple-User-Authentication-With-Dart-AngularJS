(function() {
    'use strict';

    function LoginController (Q, Location, AuthenticationService) {

        var vm = this;

        vm.title = "Login";
        vm.submitted = false;
        vm.userCredentials = {};

        vm.authenticate = function(loginFormCtrl) {
            var vm = this;
            var form = loginFormCtrl;

            if(form.$invalid) {
                form.attemptedSubmission = true;
                return;
            }

            AuthenticationService.login(form, vm.userCredentials)
                .then(function(response, status, headers) {

                    var authToken = response.data;

                    // Store token locally
                    AuthenticationService.setAuthToken(authToken);

                    // Reset form to pristine state
                    form.$setPristine();
                    form.problemLogin = false;

                    // Proceed to dashboard
                    Location.path('/dashboard');
                },
                function(error) {

                    form.$setPristine();
                    form.problemLogin = true;
                    vm.userCredentials = {};

                    Q.reject(error);
                });
        };
    }

    LoginController.$inject = ['$q', '$location', 'AuthenticationService'];

    angular.module("simpleApp")
        .controller("LoginController", LoginController);
})();