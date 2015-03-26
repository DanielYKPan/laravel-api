'use strict';

angular.module('account').directive('loginToolbar',[
    'SecurityService',
    function(SecurityService){
        return {
            restrict: 'EA',
            replace: true,
            scope: true,
            templateUrl : "modules/account/views/login-toolbar.html",
            link: function(scope, element, attrs, controller) {
                scope.loginFormOpen = SecurityService.showLogin;
                scope.isAuthenticated  = SecurityService.isAuthenticated;
                scope.logout = SecurityService.logout;
                scope.register = SecurityService.register;
                scope.$watch(function(){
                    return SecurityService.currentUser;
                }, function(currentUser){
                    scope.currentUser = currentUser;
                });
            }
        }
    }
])
