'use strict';

angular.module('wines').controller('WineInformController', [
    '$scope',
    'wine',
    function($scope, wine){
        console.log(wine);
        $scope.wine = wine;
    }
]);