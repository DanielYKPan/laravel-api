'use strict';

angular.module('cart').factory('CartService',[
                                                'localStorageService',
    function(localStorageService){
        return {
            addCartItem: function(cartItems, item){
                var i;
                for(i = 0 ; i< cartItems.length; i++){
                    if(cartItems[i].name == item.name){
                        return false;
                    }
                }
                cartItems.push(item);
                return localStorageService.set('cart', cartItems);
            },

            updateCart: function(newCart){
                localStorageService.remove('cart');
                localStorageService.set('cart', newCart);
            },

            //check if cart exists in local storage
            //if exists, return it. else return an empty array
            getCart: function(){
                return localStorageService.get('cart')? localStorageService.get('cart') : [];
            },

            setCartItem: function(item){
                var cartItem={};
                cartItem.id = item.id;
                cartItem.code = item.code;
                cartItem.name = item.name;
                cartItem.price = item.price;
                cartItem.discount_price = item.discount_price;
                cartItem.case_size = item.case_size;
                cartItem.image = item.image;
                cartItem.qty = 1;
                cartItem.qty_unit = 'case';
                return cartItem;
            },

            getCartQty: function(){
                return this.getCart()? this.getCart().length : 0;
            },

            getCartTotal: function(){
                var cartItems = this.getCart();
                var i;
                var total = 0;
                for(i = 0 ; i< cartItems.length; i++){
                    if(cartItems[i].qty_unit == 'bottle' && cartItems[i].qty < cartItems[i].case_size){
                        total = total + (cartItems[i].price * cartItems[i].qty);
                    }else if(cartItems[i].qty_unit == 'bottle' && cartItems[i].qty >= cartItems[i].case_size) {
                        total = total + cartItems[i].discount_price * cartItems[i].qty;
                    } else {
                        total = total + cartItems[i].discount_price * cartItems[i].case_size * cartItems[i].qty;
                    }
                }
                return total;
            }
        }
    }
]);
