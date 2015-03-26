'use strict';

angular.module('cart').controller('CheckoutController', [
    '$scope',
    'SecurityService',
    function($scope, SecurityService){
        $scope.currentUser = SecurityService.currentUser;
    }
]);
