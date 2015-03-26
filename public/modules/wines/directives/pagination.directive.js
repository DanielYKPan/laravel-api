'use strict';

angular.module('wines').directive('myPagination', [

    function(){
        return {
            restrict: 'E',

            scope: {
                numPages: '=',
                currentPage: '=',
                onSelectPage: '&onSelectPage'
            },
            templateUrl: "modules/wines/views/pagination.html",
            replace: true,
            link: function(scope){
                scope.range = function() {
                    var rangeSize = 5;
                    var ret = [];
                    var start;

                    if(scope.numPages < rangeSize)
                    {
                        for (var i = 1; i <= scope.numPages; i++) {
                            ret.push(i);
                        }
                    }else {
                        start = scope.currentPage;
                        if(start > scope.numPages - rangeSize) {
                            start = scope.numPages - rangeSize+1;
                        }

                        for (var i = start; i < start+rangeSize; i++) {
                            ret.push(i);
                        }
                    }
                    return ret;
                };

                scope.noPrevious = function() {
                    return scope.currentPage === 1;
                };

                scope.noNext = function() {
                    return scope.currentPage === scope.numPages;
                };

                scope.isActive = function(page) {
                    return scope.currentPage === page;
                };

                scope.prevPage = function(){
                    if(! scope.noPrevious()) {
                        scope.selectPage(scope.currentPage-1);
                    }
                };

                scope.nextPage = function(){
                    if(! scope.noNext()){
                        scope.selectPage(scope.currentPage+1);
                    }
                };

                scope.selectPage = function(page){
                    if(! scope.isActive(page)){
                        scope.onSelectPage({ page: page });
                        scope.currentPage = page;
                    }
                };
            }
        }
    }
]);
