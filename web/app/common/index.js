(function(){
    'use strict';

    function SimpleAppController () {
        this.appName = "Simple App";
    };



    function RoutesConfig (Route) {

        Route.when('/', {
            templateUrl: '/app/account/index.html' ,
            controller: 'AccountController',
            controllerAs: 'accountCtrl'
        })
        .when('/login', {
            templateUrl: '/app/login/index.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    };

    RoutesConfig.$inject = ['$routeProvider', '$httpProvider'];



    angular.module('SimpleApp', ['ngRoute'])
        .controller('SimpleAppController', SimpleAppController)
        .config(RoutesConfig);

})();