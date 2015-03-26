'use strict';

angular.module('account').factory('SecurityRetryQueue',[
    '$q',
    '$log',
    function($q, $log){
        var retryQueue = [];
        var service = {
            onItemAddedCallbacks: [],

            hasMore: function(){
                return retryQueue.length > 0;
            },

            push: function(retryItem){
                retryQueue.push(retryItem);
                angular.forEach(service.onItemAddedCallbacks, function(cb){
                    try{
                        cb(retryItem);
                    } catch (e){
                        $log.error('SecurityRetryQueue.push(retryItem): call back threw a error: ' + e);
                    };
                });
            },

            pushRetryFn: function(reason, retryFn){
                // Reason parameter is optional
                if(arguments.length === 1){
                    retryFn = reason;
                    reason = undefined;
                }

                // the deferred object that will be resolved or rejected by calling retry or cancel
                var deferred = $q.defer();
                var retryItem = {
                    reason: reason,
                    retry: function(){
                        // Wrap the result of the retryFn into a promise if it is not already
                        $q.when(retryFn()).then(function(value){
                            // If it was successful then resolve our deferred object
                            deferred.resolve(value);
                        }, function(value){
                            // Otherwise reject it
                            defered.reject(value);
                        });
                    },
                    cancel: function(){
                        // Give up on retrying and reject our deferred object
                        deferred.reject();
                    }
                };
                service.push(retryItem);
                return deferred.promise;
            },

            retryReason: function(){
                return service.hasMore() && retryQueue[0].reason;
            },

            retryAll: function(){
                while(service.hasMore()){
                    retryQueue.shift().retry();
                }
            },

            cancelAll: function(){
                while(service.hasMore()){
                    retryQueue.shift().cancel();
                }
            }
        };
        return service;
    }
]);
