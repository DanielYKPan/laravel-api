'use strict';

angular.module('account').controller('MyAccountController', [
    '$scope',
    'UserService',
    function($scope, UserService){
        $scope.email = 'example@example.com';
        $scope.test = function(){
            var promise = UserService.fetchUser($scope.email);
            promise.then(function(response){

            }, function(error){

            });
        }
    }
]);
