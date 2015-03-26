'use strict';

angular.module('wines').directive('wineResultList',[
    function(){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                wineResult: "=wineResult",
                onAddItem: "&onAddItem",
                onDisplayItem: "&"
            },
            templateUrl: "modules/wines/views/wineResultList.html",
            link: function(scope){
                scope.addItem = function(item){
                    scope.onAddItem({ item: item });
                };

                scope.unitTotal = function(unit_price, unit_size) {
                    return unit_price * unit_size;
                };
            }
        }
    }
]);
