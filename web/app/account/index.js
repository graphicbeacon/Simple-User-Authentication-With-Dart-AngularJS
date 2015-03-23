(function() {
    'use strict';

    function AccountController () {
        this.title = "Accounts";
    };

    angular.module("simpleApp")
        .controller("AccountController", AccountController);
})();