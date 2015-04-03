(function() {
    'use strict';

    function LoginController (AuthenticationService) {

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

            AuthenticationService.login(form, vm.userCredentials);
        };
    }

    LoginController.$inject = ['AuthenticationService'];

    angular.module("simpleApp")
        .controller("LoginController", LoginController);
})();