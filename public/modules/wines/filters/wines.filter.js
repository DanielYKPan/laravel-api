'use strict';

angular.module('wines').filter('labelCase', function(){
    return function(input){
        if(input)
            input = input.replace(/_/g, " ");
        input = input.split(' ').reduce(
            function(prevValue, word){
                return  prevValue + word.substring(0, 1).toUpperCase() + word.substring(1)+' ';
            }, '');
        return input;
    }
});
