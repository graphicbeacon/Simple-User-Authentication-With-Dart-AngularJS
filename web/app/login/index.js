(function() {
    'use strict';

    function LoginController (AuthenticationService) {

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

            AuthenticationService.login(form, this.userCredentials);
        };
    }

    LoginController.$inject = ['AuthenticationService'];

    angular.module("simpleApp")
        .controller("LoginController", LoginController);
})();