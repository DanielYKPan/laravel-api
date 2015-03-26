'use strict';

//Setting up route
angular.module('cart').config([
    '$stateProvider',
    function($stateProvider){
        $stateProvider
            .state('cart', {
                url:'/cart',
                abstract: true,
                template: '<ui-view/>'
            })
            .state('cart.list', {
                url: '/list',
                templateUrl: 'modules/cart/views/index.html',
                controller: 'CartController',
            });
    }
]);