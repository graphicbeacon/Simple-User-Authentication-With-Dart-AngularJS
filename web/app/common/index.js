(function(){
    'use strict';


    // TODO: Logic to manage top navigation items, maybe on rootScope
    // TODO: Manage all urls in service?

    function SimpleAppController () {
        this.appName = "Simple App";
    };

    function RoutesConfig (Route, HttpProvider) {

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
        .when('/projects', {
            templateUrl: '/app/projects/index.html',
            controller: 'ProjectsController',
            controllerAs: 'projectsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        HttpProvider.interceptors.push('RouteInterceptors');
    };

    RoutesConfig.$inject = ['$routeProvider', '$httpProvider'];

    // Module Setup
    angular.module('simpleApp', ['ngRoute','ngMessages'])
        .controller('SimpleAppController', SimpleAppController)
        .config(RoutesConfig);

})();