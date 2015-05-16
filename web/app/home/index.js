(function() {
    'use strict';

    function HomeController () {
        this.title = "Home";
    }

    angular.module("simpleApp")
        .controller("HomeController", HomeController);
})();