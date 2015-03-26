'use strict';

angular.module('test').factory('WineService',[
    function($q){
        return {
            fetchWines: function(filter){
                var deferred = $q.defer();
                var results = {
                    data: ['something', 'another thing'],
                    total: 50,
                    last_page : 6
                };
                deferred.resolve(results);
                return deferred.promise;
            }
        }
    }
]);
