(function() {
    'use strict';

    function LoginController (Http, Location) {

        this.submitted = false;
        this.userCredentials = {};

        this.authenticate = function(loginFormCtrl) {
            var vm = this;

            if(loginFormCtrl.$invalid) {
                vm.submitted = true;
                return;
            }

            // Use Authentication Service and login in
            Http.post('/auth/login', this.userCredentials)
                .success(function(successfulLogin, status, headers, config) {
                    //console.log('Success', config);
                    var authToken = headers('SimpleAppAuthToken');

                    if(authToken && localStorage.getItem('SimpleAppAuthToken') == null) {
                        localStorage.setItem('SimpleAppAuthToken', authToken);
                    }
                    // Redirect to homepage
                    Location.path(successfulLogin.redirectTo);

                    // Reset form to fresh state
                    loginFormCtrl.$setPristine();
                    vm.submitted = false;
                })
                .error(function(data, status) {
                    console.error('Problems: ' + status);
                });
        };
    };

    
    LoginController.$inject = ['$http', '$location'];

    angular.module("SimpleApp")
        .controller("LoginController", LoginController);
})();