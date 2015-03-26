'use strict';

angular.module('account').directive('validateEquals',[
    function(){
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function(scope, element, attribute, control){
                function validateEqual(myValue){
                    var valid = (myValue === scope.$eval(attribute.validateEquals));
                    control.$setValidity('equal', valid);
                    return valid? myValue : undefined;
                }

                control.$parsers.push(validateEqual);
                control.$formatters.push(validateEqual);

                scope.$watch(attribute.validateEquals, function(){
                    control.$setViewValue(control.$viewValue);
                });
            }
        }
    }
]);
