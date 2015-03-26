/*describe('uniqueEmail directive', function(){
    var scope,timeout, testInput,element, UserService;

    beforeEach(module('ui.router'));
    beforeEach(module('account'));
    beforeEach(module('test'));
    beforeEach(inject(function($rootScope, $timeout, $compile, _UserService_){
        scope = $rootScope;
        timeout = $timeout;
        UserService = _UserService_;
        spyOn(UserService, 'fetchUser').and.callThrough();
        element = angular.element(
            '<form name="form">'+
            '<input name="testInput"'+
            'data-ng-model="model.testValue" unique-email>'+
            '</form>'
        );
        $compile(element)(scope);
        scope.model = {};
        scope.$digest();
        testInput = scope.form.testInput;
    }));

    it('should be valid initially', function(){
        expect(testInput.$valid).toBeTruthy();
    });

    *//*it('should not call UserService.fetchUser when the model changes', function(){
        scope.model.testValue = "different";
        scope.$digest();
        expect(UserService.fetchUser).not.toHaveBeenCalled();
        expect(testInput.$viewValue).toBe('different');
    });*//*

    *//*it('should call UserService.fetchUser when the view value changes', function(){
        testInput.$setViewValue( 'different');
        scope.$digest();
        expect(testInput.$viewValue).toBe('different');
        expect(element.find('input').eq(0).attr('name')).toBe('testInput');
        element.find('input').eq(0).blur();
        scope.$digest();
        expect(testInput.$viewValue).toBe('different');
        expect(UserService.fetchUser).toHaveBeenCalled();
    });*//*

    *//*it('should not call UserService.fetchUser when the view value changes to be the same as the original model value', function(){
        scope.model.testValue = "test@test.com";
        scope.$digest();
        testInput.$setViewValue("test@test.com");
        expect(UserService.fetchUser).not.toHaveBeenCalled();
        testInput.$setViewValue("test_different@test.com");
        expect(UserService.fetchUser).toHaveBeenCalled();
        UserService.fetchUser.calls.reset();
        testInput.$setViewValue("test@test.com");
        expect(UserService.fetchUser).not.toHaveBeenCalled();
        scope.model.testValue = "test_different@test.com";
        scope.$digest();
        testInput.$setViewValue("test@test.com");
        expect(UserService.fetchUser).toHaveBeenCalled();
    });*//*

    *//*it('should set model to invalid if the UseService.fetchUser response contains users', function(){
        testInput.$setViewValue("test@test.com");
        UserService.respondWith(['someUser']);
        expect(testInput.$valid).toBe(false);
    });*//*

    *//*it('should set model to valid if the UserService,fetchUser response contains no user', function(){
        testInput.$setViewValue("test@test.com");
        UserService.respondWith([]);
        expect(testInput.$valid).toBe(true);
    });*//*
});*/
