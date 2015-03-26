'use strict';

angular.module('account').controller('RegistrationFormController', [
    '$scope',
    '$state',
    '$sanitize',
    'UserService',
    function($scope, $state, $sanitize, UserService) {
        $scope.registration = {};

        $scope.submit = function(){
            var promise = UserService.registerUser($scope.registration);
            promise.then(
                function(response){
                    console.log(response);
                },
                function(error){
                    $state.go('error',{},{reload: true});
                }
            );
        };
    }
]);
