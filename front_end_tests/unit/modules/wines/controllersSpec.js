describe('Wine Module Controllers', function() {
    beforeEach(module('ui.router'));
    beforeEach(module('myApp'));
    beforeEach(module('wines'));
    beforeEach(module('cart'));

    describe('WineListController', function() {
        var scope, CartService, WineService, stateParams;

        // mocking the WineService and the CartService
        beforeEach(function(){
            var mockWineService = {};
            module('wines', function($provide){
                $provide.value('WineService', mockWineService);
            });
            var mockCartService = {};
            module('cart', function($provide){
                $provide.value('CartService', mockCartService);
            });
            inject(function($q){
                mockWineService.varieties = {
                    data: [
                        { id: 0, name: 'aaa', type_id: 1 },
                        { id: 1, name: 'bbb', type_id: 2 },
                        { id: 2, name: 'ccc', type_id: 1 }
                    ]
                };
                mockWineService.types = {
                    data: [
                        { id: 0, name: 'aaa' },
                        { id: 1, name: 'bbb' },
                        { id: 2, name: 'ccc' }
                    ]
                };
                mockWineService.searchResults = {
                    data: {
                        data: [
                            { id: 0, name: 'aaa' },
                            { id: 1, name: 'bbb' },
                            { id: 2, name: 'ccc' }
                        ],
                        total: 3,
                        last_page: 1,
                    }
                };
                mockWineService.fetchVarieties = function(search){
                    var deferred = $q.defer();
                    deferred.resolve(this.varieties);
                    return deferred.promise;
                };
                mockWineService.fetchTypes = function(search){
                    var deferred = $q.defer();
                    deferred.resolve(this.types);
                    return deferred.promise;
                };
                mockWineService.fetchWines = function(search){
                    var deferred = $q.defer();
                    deferred.resolve(this.searchResults);
                    return deferred.promise;
                };
                spyOn(mockWineService, "fetchWines").and.callFake(function() {
                    var deferred = $q. defer();
                    deferred.resolve(this.searchResults);
                    return deferred.promise;
                });
            });
        });
        beforeEach(inject(function($controller, $rootScope, _WineService_, _CartService_, $stateParams){
            scope = $rootScope.$new();
            stateParams = $stateParams;
            WineService = _WineService_;
            CartService = _CartService_;
            $controller('WineListController', {$scope: scope, CartService: CartService, WineService : WineService, $stateParams: stateParams});
            scope.$digest();
        }));
        it('should contain all the required varieties', function() {
            expect(scope.checkboxItems.varieties).toEqual([
                { id: 0, name: 'aaa', type_id: 1 },
                { id: 1, name: 'bbb', type_id: 2 },
                { id: 2, name: 'ccc', type_id: 1 }
            ]);
        });
        it('should contain all the required types', function(){
            expect(scope.checkboxItems.types).toEqual([
                { id: 0, name: 'aaa' },
                { id: 1, name: 'bbb' },
                { id: 2, name: 'ccc' }
            ]);
        });
        it('should fetch wines when click the price search button', function(){
            //spyOn(WineService, 'fetchWines');
            scope.search ={};
            scope.priceSearchBtnClick();
            expect(WineService.fetchWines).toHaveBeenCalledWith(scope.search);
        });
    });
});
