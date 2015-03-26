'use strict';

angular.module('wines').factory('WineService',[
    '$http',
    '$q',
    '$state',
    function($http, $q, $state){

        return {
            fetchVarieties: function(filter){
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/varieties',
                    data: {
                        'wine_types': filter.types
                    }
                })
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });

                return deferred.promise;
            },

            fetchTypes: function(filter){
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/api/types',
                    data: {
                        'wine_varieties': filter.varieties
                    }
                })
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });

                return deferred.promise;
            },

            fetchCountries: function() {
                return $http.get('/api/countries');
            },

            fetchWines: function(filter){
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'api/wines/search',
                    data: {
                        'wine_types': filter.types,
                        'wine_varieties': filter.varieties,
                        'wine_countries' : filter.countries,
                        'wine_price_range' : filter.priceRange,
                        'sort_name': filter.sort.sort_name,
                        'sort_order': filter.sort.sort_order,
                        'perPage': filter.perPage,
                        'currentPage': filter.currentPage
                    }
                })
                    .success(function(wines){
                        deferred.resolve(wines);
                    })
                    .error(function(reason){
                        deferred.reject(reason);
                    });

                return deferred.promise;
            },

            search: function(filter){
                return $q.all([
                    this.fetchTypes(filter),
                    this.fetchVarieties(filter),
                    this.fetchWines(filter)
                ]);
            },

            fetchSpecificWine: function($product_code){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'api/wines/inform/'+ $product_code,
                })
                    .success(function(response){
                        deferred.resolve(response.data);
                    })
                    .error(function(reason){
                        $state.go('error',{},{reload: true});
                        //deferred.reject(reason);
                    });

                return deferred.promise;
            },

            displayWineInform : function($product_code){
                $state.go('wine.inform',{productCode: $product_code}, {reload: true});
            }
        };
    }
]);