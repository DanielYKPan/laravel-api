'use strict';

//Setting up route
angular.module('wines').config([
                                '$stateProvider',
    function($stateProvider){
        $stateProvider
            .state('wine', {
                abstract: true,
                url: '/wines',
                template: '<ui-view/>'
            })
            .state('wine.list', {
                url: '/search',
                templateUrl: 'modules/wines/views/index.html'
            })
            .state('wine.inform', {
                url: '/inform/:productCode',
                templateUrl: 'modules/wines/views/inform.html',
                controller: 'WineInformController',
                resolve: {
                    wine: ['$stateParams', 'WineService', function($stateParams, WineService){
                        return WineService.fetchSpecificWine($stateParams.productCode);
                    }]
                }
            })
            .state('wine.type', {
                url: '/wineType/:wineType',
                templateUrl: 'modules/wines/views/index.html'
            })
            .state('wine.variety', {
                url: '/wineType/:wineType/wineVariety/:wineVariety',
                templateUrl: 'modules/wines/views/index.html'
            });
    }
]);