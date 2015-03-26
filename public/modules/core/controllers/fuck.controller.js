'use strict';

angular.module('core').controller('FuckController', [
    '$scope',
    'someValue',
    'myValue',
    '$state',
    function($scope, someValue, myValue, $state){
        $scope.test = 'shittttt';
        $scope.someValue = someValue.value;
        console.log(myValue.value);
        $scope.click =function(){
            $state.go('fuck', {myValue: 'some+thing+here'}, {reload: true});
        };
    }
]);
