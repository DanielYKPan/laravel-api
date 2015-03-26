'use strict';

angular.module('core').controller('CoreController', [
    '$scope',
    'CartService',
    function($scope, CartService){
        $scope.cart = {};
        $scope.cart.items= CartService.getCart();
        $scope.cart.qty = CartService.getCartQty();
        $scope.cart.total = CartService.getCartTotal();
    }
]);