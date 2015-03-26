'use strict';

angular.module('wines').directive('filterPanel',['$timeout', 'WineService',
    function($timeout, WineService){
        return {
            restrict: "E",
            scope: {
                name: '@name',
                checkboxItems: '=checkboxItems',
                panel: '=panel',
                search: '=search',
                result: '=result',
                panelItems: '=panelItems',
                numLimit: '@numLimit'
            },
            replace: true,
            templateUrl: "modules/wines/views/filterPanel.html",
            link: function(scope){
                scope.toggleLimit = scope.numLimit;
                scope.toggleBtn = "Show more";
                scope.toggle = function(){
                    if(scope.toggleLimit == scope.numLimit){
                        scope.toggleLimit = Infinity;
                        scope.toggleBtn = "Show less";
                    } else {
                        scope.toggleLimit = scope.numLimit;
                        scope.toggleBtn = "Show more";
                    }
                };
                scope.clear = function (){
                    scope.panel = [];
                    $timeout(function() {
                        var promise = WineService.search(scope.search);
                        promise.then(function(resp){
                            //fetch types
                            scope.checkboxItems.types = resp[0].data;

                            //fetch varieties
                            scope.checkboxItems.varieties = resp[1].data;

                            //fetch wines
                            scope.result.wines = resp[2].data;

                            //fetch total items number
                            scope.result.total = resp[2].total;

                            //rebuild the pagination links
                            scope.result.last_page = resp[2].last_page;
                            scope.search.currentPage = 1;

                        }, function(){
                            //error handling
                        });
                    });
                };
            }
        }
    }
]);
