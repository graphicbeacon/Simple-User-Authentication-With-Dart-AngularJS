(function() {
    'use strict';

    function LoginController (Http) {

        var ctrl = this;
        ctrl.submitted = false;

        ctrl.authenticate = function(loginFormCtrl) {
            if(loginFormCtrl.$invalid) {
                ctrl.submitted = true;
                return;
            }

            // Use Authentication Service and login in
            Http.post('/auth/login', { data: 'boo' })
              .success(function(data) {
                console.log(data);
              })
              .error(function(data) {
                console.log('Problems' + data);
              });
        };

    };
    
    LoginController.$inject = ['$http'];

    angular.module("SimpleApp")
        .controller("LoginController", LoginController);
})();