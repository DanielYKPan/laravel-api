'use strict';

angular.module('wines').controller('WineListController', [
    '$scope',
    '$state',
    '$stateParams',
    'CartService',
    'WineService',
    function($scope, $state, $stateParams, CartService, WineService){
        $scope.search = {};
        $scope.search.types = [];
        $scope.search.varieties = [];
        $scope.search.countries = [];
        $scope.search.priceRange = [];
        $scope.priceFrom = null;
        $scope.priceTo = null;
        $scope.search.currentPage = 1;
        $scope.search.perPage = 15;
        $scope.checkboxItems = {};
        $scope.result = {};
        $scope.options = [
            { label: 'Name Ascending', sort_name:'name', sort_order:'asc'},
            { label: 'Name Descending', sort_name:'name', sort_order:'desc'},
            { label: 'Price (Low to High)', sort_name:'discount_price', sort_order:'asc'},
            { label: 'Price (High to Low)', sort_name:'discount_price', sort_order:'desc'}
        ];
        $scope.search.sort =$scope.options[0];
        $scope.gridView = true;

        //Check if the state params include values of wineType, wineVariety and wineCountry
        if($stateParams.wineType){
            $scope.search.types.push($stateParams.wineType);
        }
        if($stateParams.wineVariety){
            $scope.search.varieties.push($stateParams.wineVariety);
        }

        //Initiate the variety, type, and country checkbox
        var variety_promise = WineService.fetchVarieties($scope.search);
        variety_promise.then(function(resp){
            $scope.checkboxItems.varieties = resp.data;
        }, function(err){
            //error handling
        });
        var type_promise = WineService.fetchTypes($scope.search);
        type_promise.then(function(resp){
            $scope.checkboxItems.types = resp.data;
        }, function(err){
            //error handling
        });

        var result_promise = WineService.fetchWines($scope.search);
        result_promise.then(function(resp){
            $scope.result.wines = resp.data;
            $scope.result.total = resp.total;
            $scope.search.numPages = resp.last_page;
            /*$("html, body").animate({ scrollTop: 0 }, "slow");*/
        });

        //disable the price search button if
        //the search price 'from' or 'to' input is null
        // or 'from' >= 'to'
        $scope.priceSearchBtnDisabled = function(){
            return (!$scope.priceFrom || !$scope.priceTo || Number($scope.priceFrom) >= Number($scope.priceTo));
        };

        //when the price search button click
        //fetch wines based on the new search rules
        $scope.priceSearchBtnClick = function(){
            $scope.search.priceRange = [$scope.priceFrom, $scope.priceTo];
            var promise = WineService.fetchWines($scope.search);
            promise.then(function(resp){
                $scope.result.wines = resp.data.data;
                $scope.result.total = resp.data.total;

                //rebuild the pagination links
                $scope.result.last_page = resp.data.last_page;
                $scope.search.currentPage = 1;

            },function(err){
                //error handling
            });
        };

        // sorting the results
        $scope.sort = function(){
            var promise = WineService.fetchWines($scope.search);
            promise.then(function(resp){
                $scope.result.wines = resp.data.data;
                $scope.result.total = resp.data.total;

                //rebuild the pagination links
                $scope.result.last_page = resp.data.last_page;
                $scope.search.currentPage = 1;

            },function(err){
                //error handling
            });
        };

        // change the result view (list or gird)
        $scope.switchResultView = function(grid){
            $scope.gridView = grid;
        };

        // change pagination current page
        $scope.selectPageHandler = function(page){
            $scope.search.currentPage = page;
            var result_promise = WineService.fetchWines($scope.search);
            result_promise.then(function(resp){
                $scope.result.wines = resp.data;
                $scope.result.total = resp.total;
                $scope.search.numPages = resp.last_page;
                $("html, body").animate({ scrollTop: 0 }, "slow");
            });
        };

        // add items into shopping cart
        $scope.addItemHandler = function(item){
            var cartItem;
            cartItem = CartService.setCartItem(item);
            CartService.addCartItem($scope.cart.items, cartItem);
            $scope.cart.qty = CartService.getCartQty();
            $scope.cart.total = CartService.getCartTotal();
        };

        // display specific item inform
        $scope.displayItemHandler = function(product_code){
            WineService.displayWineInform(product_code);
        };
    }
]);