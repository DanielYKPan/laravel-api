'use strict';
angular.module('account').factory('UserService',[
    '$http',
    '$q',
    'CSRF_TOKEN',
    function($http, $q, CSRF_TOKEN){
        return {
            fetchUser : function(email){
                var deferred = $q.defer();
                var data = {
                    email: email
                };
                $http({
                    method: 'POST',
                    url: 'api/users',
                    data: data,
                })
                    .success(function(response){
                        deferred.resolve(response);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            registerUser : function(registrationInform){
                var deferred = $q.defer();
                var data = {
                    email: registrationInform.email,
                    password: registrationInform.password,
                    first_name: registrationInform.first_name,
                    last_name: registrationInform.last_name,
                    user_role: 'customer'
                };
                $http({
                    method: 'POST',
                    url: 'api/register',
                    data: angular.extend(data, CSRF_TOKEN),
                })
                    .success(function(response){
                        deferred.resolve(response);
                    })
                    .error(function(error){
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        }
    }
]);
