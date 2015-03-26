'use strict';

angular.module('test').factory('UserService',[
    '$q',
    function($q){
        var UserService = {};
        UserService.fetchUser = function(email){
            /*var deferred = $q.defer();
            var response = {
                users : []
            };
            UserService.respondWith = function(Users){
                response.users = Users;
                deferred.resolve(response);
            }
            return deferred.promise;*/
            UserService.fetchUserRespondWith = function(Users){
                var deferred= $q.defer();
                var response = {
                    users : []
                };
                response.users = Users;
                deferred.resolve(response);
                return deferred.promise;
            }
        };
        return UserService;
    }
]);
