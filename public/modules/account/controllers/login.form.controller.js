'use strict';

angular.module('account').controller('LoginFormController', [
    '$scope',
    '$state',
    '$sanitize',
    'SecurityService',
    function($scope, $state, $sanitize, SecurityService){
        $scope.submit = function(){
            var credentials = {
                email: $sanitize($scope.email),
                password: $sanitize($scope.password)
            }
            var promise = SecurityService
                .login(credentials);
            promise.then(function(loginErrors){
                if(loginErrors){
                    $scope.loginErrors = loginErrors;
                    $scope.password = null;
                    $scope.loginForm.$setPristine();
                }
            });
        }
    }
]);