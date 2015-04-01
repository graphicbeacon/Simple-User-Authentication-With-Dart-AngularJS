(function() {
    'use strict';

    function NavigationService (Http) {
        var sessionToken = localStorage.getItem('SimpleAppAuthToken') || '';

        var getNav = function() {
            return Http.post('/auth/nav', sessionToken);
        };

        return {
            getNav: getNav
        };

    }

    NavigationService.$inject = ['$http'];

    angular.module('simpleApp')
        .factory('NavigationService', NavigationService);
})();