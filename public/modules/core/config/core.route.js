'use strict';

//Setting up route
angular.module('core').config([
    '$stateProvider',
    function($stateProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/modules/core/views/index.html'
            })
            .state('fuck',{
                url: '/fuck?myValue',
                templateUrl: '/modules/core/views/fuck.html',
                controller: 'FuckController',
                resolve: {
                    someValue: function(){
                        return {value: 'some value'};
                    },
                    myValue: ['$stateParams', function($stateParams){
                        if($stateParams.myValue){
                            return { value: $stateParams.myValue.split('+')};
                        }else {
                            return {value: null};
                        }
                    }]
                }
            })
            .state('error', {
                url: '/error',
                templateUrl: '/modules/core/views/error.html'
            });
    }
]);