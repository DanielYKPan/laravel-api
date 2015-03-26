'use strict';

angular.module('account').config([
    '$stateProvider',
    'SecurityAuthorizationProvider',
    function($stateProvider, SecurityAuthorizationProvider){
        $stateProvider
            .state('account', {
                abstract: true,
                url: '/account',
                template: '<ui-view/>'
            })
            .state('account.login', {
                url: '/login',
                templateUrl: 'modules/account/views/login.html'
            })
            .state('account.inform',{
                url: '/inform',
                templateUrl: 'modules/account/views/index.myaccount.html',
                resolve: SecurityAuthorizationProvider.requireAuthenticatedUser,
                controller: 'MyAccountController',
            })
            .state('account.register',{
                url: '/register',
                templateUrl: 'modules/account/views/register.html'
            })
            .state('cart.checkout',{
                url: '/checkout',
                templateUrl: 'modules/cart/views/checkout.html',
                controller: 'CheckoutController',
                resolve: SecurityAuthorizationProvider.requireAuthenticatedUser
            });
    }
]);