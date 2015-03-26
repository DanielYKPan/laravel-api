'use strict';

angular.module('cart').controller('CartController', [
    '$scope',
    'CartService',
    function($scope, CartService){
        $scope.original_cart = angular.copy($scope.cart.items);

        $scope.removeItem = function(item){
            var index = $scope.cart.items.indexOf(item);
            $scope.cart.items.splice(index, 1);
            update();
        }

        $scope.showAmount = function(item){
            var amount;
            if(item.qty_unit == 'bottle' && item.qty < item.case_size){
                amount = item.price * item.qty;
            } else if(item.qty_unit == 'bottle' && item.qty >= item.case_size) {
                amount = item.discount_price * item.qty;
            } else {
                amount = item.discount_price * item.case_size * item.qty;
            }
            return amount;
        }

        $scope.switchQtyUnit = function(item, qty_unit){
            item.qty_unit = qty_unit;
        }

        $scope.updateCart = function(){
            var i;
            for(i=0; i<$scope.cart.items.length; i++ ){
                if(!$scope.cart.items[i].qty){
                    $scope.cart.items[i].qty = $scope.original_cart[i].qty;
                }
            }
            update();
        }

        function update(){
            CartService.updateCart($scope.cart.items);
            $scope.original_cart = CartService.getCart();
            $scope.cart.qty = CartService.getCartQty();
            $scope.cart.total = CartService.getCartTotal();
            $scope.cartForm.$setPristine();
        }
    }
]);
