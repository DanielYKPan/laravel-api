'use strict';

angular.module('wines').value('sortType', {
    ascendName: ['name', 'asc'],
    descendName: ['name', 'desc'],
    declinePrice: ['discount_price', 'desc'],
    increasePrice: ['discount_price', 'asc']
});
