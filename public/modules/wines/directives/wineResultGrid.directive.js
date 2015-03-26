'use strict';

angular.module('wines').directive('wineResultGrid',[
    function(){
        return {
            restrict: 'E',
            scope: {
                wineResult: "=wineResult",
                onAddItem: "&onAddItem",
                onDisplayItem: "&"
            },
            templateUrl: "modules/wines/views/wineResultGrid.html",
            replace: true,
            link: function(scope){
                scope.addItem = function(item){
                    scope.onAddItem({ item: item });
                };

                scope.unitTotal = function(unit_price, unit_size) {
                    return unit_price * unit_size;
                };

                scope.fuck = function(wine){
                    console.log(wine);
                }
            }
        }
    }
]);
