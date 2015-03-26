'use strict';

angular.module('core').controller('HeaderCartController', [
                                                            '$scope',
                                                            'CartService',
                                                            'localStorageService',
    function($scope, CartService, localStorageService){
            //$scope.cart= CartService.getCart();
            //$scope.cart.qty = localStorageService.get('cart')? localStorageService.get('cart').length : 0;
    }
]);
