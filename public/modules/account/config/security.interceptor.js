'use strict';

angular.module('account').config([
    '$httpProvider',
    function($httpProvider){
        $httpProvider.interceptors.push('SecurityInterceptor');
    }
]);