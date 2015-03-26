'use strict';

angular.module('account')

// This service provides guard methods to support AngularJS routes.
// You can add them as resolves to routes to require authorization levels
// before allowing a route change to complete
    .provider('SecurityAuthorization', {

        requireAuthenticatedUser: ['SecurityAuthorization', function(SecurityAuthorization) {
            return SecurityAuthorization.requireAuthenticatedUser();
        }],

        $get: ['SecurityService', 'SecurityRetryQueue', function(SecurityService, SecurityRetryQueue) {
            var service = {

                // Require that there is an authenticated user
                // (use this in a route resolve to prevent non-authenticated users from entering that route)
                requireAuthenticatedUser: function() {
                    var promise = SecurityService.requestCurrentUser().then(function(userInfo) {
                        if ( !SecurityService.isAuthenticated() ) {
                            return SecurityRetryQueue.pushRetryFn('unauthenticated-client', service.requireAuthenticatedUser);
                        }
                    });
                    return promise;
                },
            };
            return service;
        }]
    });