(function() {
    'use strict';

    function DashboardController () {
        this.title = "Dashboard";
    };

    angular.module("simpleApp")
        .controller("DashboardController", DashboardController);
})();