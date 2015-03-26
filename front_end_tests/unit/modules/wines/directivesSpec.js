describe('pagination directive', function () {
    var scope, element, lis, rangeSize;
    beforeEach(module('ui.router'));
    beforeEach(module('my.templates'));
    beforeEach(module('wines'));
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;
        scope.pagination ={
            numPages:  9,
            currentPage:  3
        }
        rangeSize = 5;
        element = $compile(
            '<my-pagination num-pages="pagination.numPages"' +
            'current-page="pagination.currentPage"' +
            'on-select-page="selectPageHandler(page)">'+
            '</my-pagination>'
        )(scope);
        scope.$digest();
        lis = function() { return element.find('li'); };
    }));

    it('has a "pagination" css class', function() {
        expect(element.find('ul').eq(0).hasClass('pagination')).toBe(true);
    });

    it('should contain one ul element', function(){
        expect(element.find('ul').length).toBe(1);
    });

    describe("pagination.numberPages < rangeSize", function(){
        it('should contain pagination.numberPages +2 li elements', function(){
            scope.pagination.numPages = 4;
            scope.$digest();
            lis = function(){ return element.find('li'); };
            expect(lis().length).toBe(6);
            expect(lis().eq(0).find('a').eq(0).text()).toBe('<< Prev');
            expect(lis().eq(-1).find('a').eq(0).text()).toBe('Next >>');
        });
        it('should have the number(from 1 to pagination.numberPages) as the text in each page item ', function(){
            scope.pagination.numPages = 4;
            scope.rangeSize = 5;
            scope.$digest();
            lis = function(){ return element.find('li'); };
            for(var i=1; i<= scope.pagination.numberPages;i++) {
                expect(lis().eq(i).text()).toEqual('' + i);
            }
        });
    });

    describe("pagination.numberPages >= rangeSize", function(){
        it('should contain rangeSize + 2 li elements', function(){
            scope.pagination.numPages = 9;
            scope.$digest();
            lis = function(){ return element.find('li'); };
            expect(lis().length).toBe(7);
            expect(lis().eq(0).find('a').eq(0).text()).toBe('<< Prev');
            expect(lis().eq(-1).find('a').eq(0).text()).toBe('Next >>');
        });
        it('should the text from currentPage to (currentPage+rangeSize-1) if currentPage <= (numberPages-rangeSize)', function(){
            scope.pagination.numPages = 9;
            scope.pagination.currentPage = 4;
            scope.$digest();
            lis = function(){ return element.find('li'); };
            for(var i=1; i<= rangeSize;i++) {
                var expectNum = scope.pagination.currentPage+i-1;
                expect(lis().eq(i).find('a').eq(0).text()).toEqual('' + expectNum);
            }
        });

        it('should the text from (numPages-rangeSize +1 ) to numPages if currentPage >(numPages-rangeSize)', function(){
            scope.pagination.numPages = 9;
            scope.pagination.currentPage = 7;
            scope.rangeSize = 5;
            scope.$digest();
            lis = function(){ return element.find('li'); };
            for(var i=1; i<= rangeSize;i++) {
                var expectNum = scope.pagination.numPages-rangeSize+i;
                expect(lis().eq(i).find('a').eq(0).text()).toEqual('' + expectNum);
            }
        });
    });

    it('set the current page to be active', function(){
        var currentPageItem;
        for(var i=1; i<= rangeSize;i++) {
            if(lis().eq(i).find('a').eq(0).text() == (scope.pagination.currentPage).toString() ){
                currentPageItem = lis().eq(i);
            }
        }
        expect(currentPageItem.hasClass('active')).toBe(true);
    });

    it('disables the "previous" link if currentPage is the first page item', function() {
        scope.pagination.currentPage = 1;
        scope.$digest();
        var previousPageItem = lis().eq(0);
        expect(previousPageItem.hasClass('disabled')).toBe(true);
    });

    it('disables the "next" link if currentPage is numberPages', function() {
        scope.pagination.currentPage = 9;
        scope.$digest();
        var nextPageItem = lis().eq(-1);
        expect(nextPageItem.hasClass('disabled')).toBe(true);
    });

    it('changes currentPage if a page link is clicked', function() {
        scope.pagination.currentPage = 1;
        scope.$digest();
        var page2 = lis().eq(2);
        page2.click();
        scope.$digest();
        expect(scope.pagination.currentPage).toBe(2);
    });

    it('changes currentPage if the "previous" link is clicked', function() {
        var previous = lis().eq(0).find('a').eq(0);
        previous.click();
        scope.$digest();
        expect(scope.pagination.currentPage).toBe(2);
    });

    it('changes currentPage if the "next" link is clicked', function() {
        var next = lis().eq(-1).find('a').eq(0);
        next.click();
        scope.$digest();
        expect(scope.pagination.currentPage).toBe(4);
    });

    it('should execute the onSelectPage expression when the current page changes', function(){
        scope.selectPageHandler = jasmine.createSpy('selectPageHandler');
        scope.pagination.currentPage = 1;
        scope.$digest();
        var page2 = lis().eq(2);
        page2.click();
        scope.$digest();
        expect(scope.selectPageHandler).toHaveBeenCalledWith(2);
    });
});

describe('wine result view directives', function(){
    var scope, buttons, element;
    beforeEach(module('ui.router'));
    beforeEach(module('my.templates'));
    beforeEach(module('wines'));
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;
        scope.result = {
            wines : [
                {name: 'wine1', code : 'aaa', discount_price : 8.00, case_size : 12},
                {name: 'wine2', code : 'bbb', discount_price : 7.00, case_size : 12},
                {name: 'wine3', code : 'ccc', discount_price : 6.00, case_size : 12}
            ]
        };
        scope.$digest();
    }));

    describe('wine result grid view directive', function(){
        beforeEach(inject(function($compile){
            element = $compile(
                '<wine-result-grid wine-result="result.wines"'+
                'on-select-item="selectItemHandler(item)">'+
                '</wine-result-grid>'
            )(scope);
            scope.$digest();
            buttons = function() { return element.find('button');};
        }));
        it('has a "wine-inform-grid" css class', function() {
            expect(element.hasClass('wine-inform-grid')).toBe(true);
        });

        it('should have result.wine.length panels', function(){
            var wine_amount = scope.result.wines.length;
            expect(element.find("div[class *='wine-grid-panel']").length).toBe(wine_amount);
        });

        it('should have result.wine.length add buttons', function(){
            var wine_amount = scope.result.wines.length;
            expect(buttons().length).toBe(wine_amount);
            for(i=0; i< buttons().length; i++){
                expect($.trim(buttons().eq(i).text())).toBe('Add to cart');
            }
        });

        it('should show the wine label name', function(){
            for(i=1; i< scope.result.wines.length; i++){
                expect($.trim(element.find("div[class *='wine-grid-module-head']").eq(i).text())).toBe(scope.result.wines[i].name);
            }
        });

        it('should show the correct discount total price with "AD$" currency symbol ', function(){
            for(i=1; i< scope.result.wines.length; i++){
                var wine_discount_total = (scope.result.wines[i].discount_price * scope.result.wines[i].case_size).toFixed(2);
                expect(element.find("h4[class *='discount-total-price']").eq(i).text()).toBe(''+'AD$'+wine_discount_total);
            }
        });

        it('should execute the onAddItem expression when one of the add button click', function(){
            scope.addItemHandler = jasmine.createSpy('addItemHandler');
            scope.$digest();
            var button1 = buttons().eq(0);
            button1.click();
            scope.$digest();
            expect(scope.addItemHandler).toHaveBeenCalled;
        });
    });

    describe('wine result list view directive', function(){
        beforeEach(inject(function($compile){
            element = $compile(
                '<wine-result-list wine-result="result.wines"'+
                'on-select-item="selectItemHandler(item)">'+
                '</wine-result-list>'
            )(scope);
            scope.$digest();
        }));

        it('has a "wine-inform-panel" css class', function() {
            expect(element.hasClass('wine-inform-panel')).toBe(true);
        });
    });
});

describe('filterPanel directive', function(){
    var scope, timeout, element, lis, deferred, WineService;

    beforeEach(module('ui.router'));
    beforeEach(module('my.templates'));
    beforeEach(module('wines'));
    beforeEach(inject(function($compile, $rootScope, $timeout, $q, _WineService_) {
        scope = $rootScope;
        timeout = $timeout;
        deferred = $q.defer();
        WineService = _WineService_;
        scope.checkboxItems = {
            tests: [
                { name: 'aaa', amount: 1},
                { name: 'bbb', amount: 2},
                { name: 'ccc', amount: 3},
                { name: 'ccc', amount: 4},
                { name: 'ccc', amount: 5},
                { name: 'ccc', amount: 6},
                { name: 'ccc', amount: 7},
                { name: 'ccc', amount: 8},
            ]
        };
        scope.search = {
            tests: []
        }
        element = $compile(
            '<filter-panel name="test-filter-panel"' +
            'checkbox-items="checkboxItems"' +
            'panel-items="checkboxItems.tests"'+
            'search="search"'+
            'result="result" panel="search.tests"'+
            'num-limit="6"'+
            '>'+
            '</filter-panel>'
        )(scope);
        scope.$digest();
        lis = function() { return element.find('li'); };
    }));

    it('should have name in filter-panel panel-heading div', function(){
        expect($.trim(element.find("h5[class *='panel-title']").eq(0).text().toLowerCase())).toBe(element.attr('name'));
    });

    it('should contain one ul element', function(){
        expect(element.find('ul').length).toBe(1);
    });

    describe("panelItems greater than numLimit", function(){
        it('should contain the numLimit + 1 li element when panel toggle up', function(){
            var numLimit = parseInt(element.attr('num-limit'));
            expect(scope.checkboxItems.tests.length).toBeGreaterThan(numLimit);
            expect(lis().length).toBe(numLimit + 1);
        });

        it('should have a "Show more" li element in the last of the li element array when panel toggle up', function(){
            expect(lis().eq(-1).text()).toBe('Show more');
        });

        it('should show all panel items and have panelItems + 1 li elements when panel toggle down', function(){
            var toggleBtn = lis().eq(-1);
            toggleBtn.click();
            scope.$digest();
            expect(lis().length).toBe(scope.checkboxItems.tests.length + 1);
        });

        it('should have a "Show less" li element in the last of the li element array when panel toggle down', function(){
            var toggleBtn = lis().eq(-1);
            toggleBtn.click();
            scope.$digest()
            expect(lis().eq(-1).text()).toBe('Show less');
        })
    });

    describe("panelItems less than numLimit", function(){
        beforeEach(inject(function(){
            scope.checkboxItems = {
                tests: [
                    { name: 'aaa', amount: 1},
                    { name: 'bbb', amount: 2},
                    { name: 'ccc', amount: 3},
                ]
            };
            scope.$digest();
        }));

        it('should have less panelItems than numLimit', function(){
            var numLimit = parseInt(element.attr('num-limit'));
            expect(scope.checkboxItems.tests.length).toBeLessThan(numLimit);
        });

        it('should show all panelItems', function(){
            var panelItemsTotal = scope.checkboxItems.tests.length;
            expect(lis().length).toBe(panelItemsTotal);
        });

        it('should NOT have a toggle btn li element in the last of the lis element array', function(){
            expect(lis().eq(-1).text()).not.toBe('Show more');
            expect(lis().eq(-1).text()).not.toBe('Show less');
        })
    });

    it('should have a clear btn', function(){
        expect(element.find("span[class *='panel-search-item-clear-btn']").eq(0).text()).toBe('...Clear');
    });

    it('should empty the panel search item array when clear btn click', function(){
        spyOn(WineService,'search').and.returnValue(deferred.promise);
        scope.search = {
            tests: [
                { name: 'aaa', amount: 1},
                { name: 'bbb', amount: 2},
                { name: 'ccc', amount: 3},
            ]
        };
        scope.$digest();
        expect(scope.search.tests).not.toEqual([]);
        var clearBtn = element.find("span[class *='panel-search-item-clear-btn']").eq(0);
        clearBtn.click();
        scope.$digest();
        expect(scope.search.tests).toEqual([]);
        timeout.flush();
        expect(WineService.search).toHaveBeenCalledWith(scope.search);
    });
});
