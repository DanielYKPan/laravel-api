'use strict';

angular.module('account').directive('uniqueEmail',[
    '$http',
    '$q',
    '$timeout',
    'UserService',
    function($http, $q, $timeout, UserService){
        return{
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, control){
                var original;
                control.$formatters.unshift(function(modelValue){
                    original = modelValue;
                    return modelValue;
                });

                control.$asyncValidators.uniqueEmail = function(modelValue, viewValue){
                    if(control.$isEmpty(modelValue) || modelValue == original){
                        return $q.when();
                    } else {
                        var deferred = $q.defer();
                        UserService.fetchUser(modelValue)
                            .then(
                            function(response){
                                if(response.users.length === 0){
                                    deferred.resolve();
                                }else{
                                    deferred.reject();
                                }
                            }
                        );
                        return deferred.promise;
                    }
                };

            }
        }
    }
]);
