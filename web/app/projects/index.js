(function() {
    'use strict';

    function ProjectsController () {
        this.title = "Projects";
    };

    angular.module("simpleApp")
        .controller("ProjectsController", ProjectsController);
})();