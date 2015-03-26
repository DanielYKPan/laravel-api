'use strict';

angular.module('core').controller('HomeController', [
    '$scope',
    '$http',
    '$sanitize',
    '$state',
    'SecurityService',
    function($scope, $http, $sanitize, $state, SecurityService){
            $scope.currentUser = SecurityService.currentUser;
            $scope.test = function(){
                $state.go('cart.checkout',{}, {reload:true});
            };

        $scope.pagination= {
            numPages: 9,
            currentPage: 3
        }

        /*$scope.$watch('pagination.currentPage', function(newValue){
            console.log(newValue);
        });*/

        $scope.selectPageHandler = function(page){
            console.log(page);
        }
    }
]);
