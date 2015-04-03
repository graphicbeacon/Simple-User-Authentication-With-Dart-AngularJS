(function() {
    'use strict';

    function NavigationService (Http) {

        var getNav = function(sessionToken) {
            return Http.post('/auth/nav', {data: sessionToken});
        };

        return {
            getNav: getNav
        };

    }

    NavigationService.$inject = ['$http'];

    angular.module('simpleApp')
        .factory('NavigationService', NavigationService);
})();