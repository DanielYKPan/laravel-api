'use strict';

angular.module('account').factory('SecurityInterceptor',[
    '$injector',
    '$q',
    'SecurityRetryQueue',
    function($injector, $q, SecurityRetryQueue){
        return {
            'responseError': function(originalResponse){
                // use $injector service to get the instance of $http service
                // Doing this way is to avoid creating a circular dependency
                var $http = $injector.get('$http');

                if(originalResponse.status === 401 ){

                    // the 'Retry Queue' return a new promise
                    var promise = SecurityRetryQueue.pushRetryFn('unauthorized-server', function retryRequest(){
                        // push the original $http call into 'Retry Queue'
                        return $http(originalResponse.config);
                    });
                    // return the new retried promise
                    return promise;
                }

                //return the original failure response
                return $q.reject(originalResponse);
            }
        }
    }
]);
