'use strict';

angular.module('wines').directive('checkBox',[
                                                'WineService',
    function(WineService){
        return {
            restrict: "A",
            scope: {
                panel: '=panel',
                search: '=search',
                result: '=result',
                checkboxItems: '=checkboxItems',
                value: '@'
            },
            link: function(scope, elem){
                var handler = function(setup) {
                    var checked = elem.prop('checked');
                    var index = scope.panel.indexOf(scope.value);
                    if (checked && index == -1) {
                        if (setup)
                            elem.prop('checked', false);
                        else
                            scope.panel.push(scope.value);
                    } else if (!checked && index != -1) {
                        if (setup)
                            elem.prop('checked', true);
                        else
                            scope.panel.splice(index, 1);
                    }
                };


                //Not Understand. Need to google about .bind();
                var setupHandler = handler.bind(null, true);
                var changeHandler = handler.bind(null, false);

                elem.bind('change', function() {
                    scope.$apply(changeHandler);
                    scope.$apply(function(){
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
                });
                scope.$watch('panel', setupHandler, true);
            }
        }
    }
]);