'use strict';

angular.module('account').directive('uniqueEmail',[
    'UserService',
    function(UserService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, control){
                var original;
                control.$formatters.unshift(function(modelValue){
                    original = modelValue;
                    return modelValue;
                });

                control.$parsers.push(function(viewValue){
                    if(viewValue && viewValue != original){
                        var promise = UserService.fetchUser(viewValue);
                        promise.then(function(response){
                            if(response.users.length === 0){
                                control.$setValidity('uniqueEmail', true);
                            }else{
                                control.$setValidity('uniqueEmail', false);
                            }
                        });
                    }
                    return viewValue;
                });
            }
        }
    }
]);
