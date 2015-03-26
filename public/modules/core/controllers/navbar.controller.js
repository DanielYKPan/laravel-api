'use strict';

angular.module('core').controller('NavbarController',[
                                                        '$scope',
                                                        '$state',
                                                        'WineService',
    function($scope, $state, WineService){

        $scope.navbar = {};
        $scope.filter = {};
        $scope.filter.types =[ ];
        var variety_promise = WineService.fetchVarieties($scope.filter);
        variety_promise.then(function (resp){
            $scope.navbar.varieties = resp.data;
        }, function (err) {
            //error handling
        });

        $scope.navbar.clickType = function (type) {
            $state.go('wine.type', {wineType: type}, {reload: true});
        };
        $scope.navbar.clickVariety = function (variety) {
          $state.go('wine.variety',{wineType: variety.type, wineVariety: variety.name}, {reload: true});
        };
    }
]);