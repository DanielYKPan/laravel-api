'use strict';

angular.module('core').controller('HeaderAccountController', [
    '$scope',
    'SecurityService',
    function($scope, SecurityService){
        $scope.loginFormOpen = function(){
            SecurityService.showLogin();
        };

        $scope.currentUser = SecurityService.currentUser
    }
]);
;