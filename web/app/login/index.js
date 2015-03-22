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

            // TODO: Move this to independent 'Authentication' Service
            // TODO: Implement logout service
            // TODO: Have global navigation shared across controllers, maybe using factories
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

                    // ;-)
                    // console && console.clear();
                })
                .error(function(data, status) {

                });
        };
    };

    
    LoginController.$inject = ['$http', '$location'];

    angular.module("SimpleApp")
        .controller("LoginController", LoginController);
})();