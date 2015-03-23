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

            // TODO: Move this to independent 'Authentication' Service
            // TODO: Implement logout service
            // TODO: Have global navigation shared across controllers, maybe using factories
            AuthenticationService.login(form, userCredentials);
        };
    };

    
    LoginController.$inject = ['$http', '$location', 'AuthenticationService'];

    angular.module("SimpleApp")
        .controller("LoginController", LoginController);
})();