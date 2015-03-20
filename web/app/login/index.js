(function() {
    'use strict';

    function LoginController () {

        var ctrl = this;
        ctrl.submitted = false;

        ctrl.authenticate = function(loginFormCtrl) {
            if(loginFormCtrl.$invalid) {
                ctrl.submitted = true;
                return;
            }

            // Use Authentication Service and login in
            console.log('Yay!');
        };

    };

    angular.module("SimpleApp")
        .controller("LoginController", LoginController);
})();