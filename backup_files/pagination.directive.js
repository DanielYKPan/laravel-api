'use strict';

angular.module('wines').directive('myPagination', [
                                                    'WineService',
    function(WineService){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                result: "=result",
                search: "=search"
            },
            templateUrl: "modules/wines/views/pagination.html",
            link: function(scope){
                scope.range = function() {
                    var rangeSize = 5;
                    var ret = [];
                    var start;

                    if(scope.result.last_page < rangeSize)
                    {
                        for (var i = 1; i <= scope.result.last_page; i++) {
                            ret.push(i);
                        }
                    }else {
                        start = scope.search.currentPage;
                        if(start > scope.result.last_page - rangeSize) {
                            start = scope.result.last_page - rangeSize+1;
                        }

                        for (var i = start; i < start+rangeSize; i++) {
                            ret.push(i);
                        }
                    }
                    return ret;
                };

                scope.prevPage = function(){
                    if(scope.search.currentPage > 1) {
                        scope.search.currentPage--;
                    }
                };

                scope.prevPageDisabled = function(){
                    return scope.search.currentPage == 1 ? "disabled" : "";
                };

                scope.nextPage = function(){
                    if(scope.search.currentPage < scope.result.last_page){
                        scope.search.currentPage++;
                    }
                };

                scope.nextPageDisabled = function(){
                    return scope.search.currentPage == scope.result.last_page ? "disabled" : "";
                };

                scope.setPage = function(n){
                    if(n>=1 && n <= scope.result.last_page){
                        scope.search.currentPage = n;
                    }
                };

                scope.$watch('search.currentPage', function(newValue, oldValue){
                    var result_promise = WineService.fetchWines(scope.search);
                    result_promise.then(function(resp){
                        scope.result.wines = resp.data;
                        scope.result.total = resp.total;
                        scope.result.last_page = resp.last_page;
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                    },function(err){
                        //error handling
                    });
                }, true);
            }
        }
    }
]);
