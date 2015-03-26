'use strict';

angular.module('account').factory('SecurityService',[
    '$http',
    '$q',
    '$state',
    '$modal',
    'CSRF_TOKEN',
    'SecurityRetryQueue',
    function($http, $q, $state, $modal, CSRF_TOKEN, SecurityRetryQueue){

        // Redirect to the given state (default to 'home')
        function redirect(state) {
            state = state ? state : 'home';
            $state.go(state,{},{reload: true});
        }

        // Login form dialog stuff
        var loginModalInstance = null;
        function openLoginModal (){
             loginModalInstance = $modal.open({
                templateUrl: 'modules/account/views/login.html',
                controller: 'LoginFormController',
                size: 'lg'
            });
            loginModalInstance.result.then(onLoginModalClose);
        };
        function closeLoginModal(success){
            if(loginModalInstance){
                loginModalInstance.close(success);
                loginModalInstance = null
            }
        };
        function onLoginModalClose(success) {
            if(success){
                SecurityRetryQueue.retryAll();
            } else {
                SecurityRetryQueue.cancelAll();
                redirect();
            }
        }

        // Register a handler for when an item is added to the retry queue
        SecurityRetryQueue.onItemAddedCallbacks.push(function(retryItem){
            if(SecurityRetryQueue.hasMore()){
                service.showLogin();
            }
        });

        var service = {

            //Get the first reason for needing a login
            getLoginReason: function(){
                return SecurityRetryQueue.retryReason();
            },

            // Show the modal login dialog
            showLogin: function(){
                openLoginModal();
            },

            // Attempt to authenticate a user by the give email and password
            login: function(credentials){
                var request = $http({
                                method: 'POST',
                                url: '/api/login',
                                data: angular.extend(credentials, CSRF_TOKEN),
                            });
                return request.then(
                    function(response){
                        if(! response.data.errors){
                            service.currentUser = response.data.user;
                            if (service.isAuthenticated()){
                                closeLoginModal(true);
                            }
                        }
                        return response.data.errors;
                    },
                    function() {
                        redirect('error');
                    }
                );
            },

            // Give up trying to login and clear the retry queue
            cancelLogin: function(){
                closeLoginDialog(false);
                redirect();
            },

            logout: function(state) {
                $http.get('/api/logout').then(function(){
                    service.currentUser = null;
                    redirect(state);
                })
            },

            // Ask the backend to see if a user is already authenticated
            // this may from the previous session.
            requestCurrentUser: function(){
                if(service.isAuthenticated()){
                    return $q.when(service.currentUser);
                } else {
                    return $http({
                        method: 'GET',
                        url: '/api/current-user'
                    }).then(function(response){
                        service.currentUser = response.data.user;
                        return service.currentUser;
                    });
                }
            },

            // Information about the current user
            currentUser : null,

            // Is the current user authenticated?
            isAuthenticated: function(){
                return !!service.currentUser;
            },

            register: function() {
                redirect('account.register');
            }
        }
        return service;
    }
]);