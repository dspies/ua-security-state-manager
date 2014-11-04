(function () {
  'use strict';

  describe('StateManager (default config)', function () {

    // load the example module to inject the ui.router dependency
    beforeEach(module('example'));

    //load the module under test
    beforeEach(module('ua.security'));

    // instantiate service
    var stateManager;
    var $state;
    var securityService;

    beforeEach(inject(function (_$state_,_stateManager_, _securityService_) {
      stateManager = _stateManager_;
      $state = _$state_;
      securityService = _securityService_;
    }));

    it('init exists', function () {
      expect(angular.isFunction(stateManager.init)).toBe(true);
    });

    describe('loggedIn', function () {

      it('returns true when user exists', function () {
        spyOn(securityService, 'isAuthenticated').andReturn(true);
        expect(stateManager.loggedIn()).toBe(true);
      });

      it('returns false when user does not exist', function () {
        spyOn(securityService, 'isAuthenticated').andReturn(false);
        expect(stateManager.loggedIn()).toBe(false);
      });

    });

    it('goToLoginState goes calls state.go with login state', function () {
      spyOn($state, 'go');
      stateManager.goToLoginState();
      expect($state.go).toHaveBeenCalledWith('login');
    });

    it('goToHomeState goes calls state.go with home state', function () {
      spyOn($state, 'go');
      stateManager.goToHomeState();
      expect($state.go).toHaveBeenCalledWith('home');
    });

    it('goToUnauthorizedState goes calls state.go with unauthorized state', function () {
      spyOn($state, 'go');
      stateManager.goToUnauthorizedState();
      expect($state.go).toHaveBeenCalledWith('unauthorized');
    });

    describe('stateRequiresAuthorization', function () {
      it('returns true when state has roles property', function () {
        var testState = { roles: ['ROLE_USER']};

        expect(stateManager.stateRequiresAuthorization(testState)).toBe(true);
      });

      it('returns false when state has no roles property', function () {
        var testState = {};

        expect(stateManager.stateRequiresAuthorization(testState)).toBe(false);
      });

    });

    describe('authorizedToTransitionTo', function () {

      it('returns true when state does not require authorization', function () {
        var testState = {};
        spyOn(stateManager, 'stateRequiresAuthorization').andReturn(false);
        expect(stateManager.authorizedToTransitionTo(testState)).toBe(true);
      });

      it('returns true when state requires authorization and user is authorized', function () {
        var testState = {
          roles: ['ROLE_USER']
        };

        spyOn(stateManager, 'stateRequiresAuthorization').andReturn(true);
        spyOn(securityService, 'hasAnyRoles').andReturn(true);
        expect(stateManager.authorizedToTransitionTo(testState)).toBe(true);
        expect(securityService.hasAnyRoles).toHaveBeenCalledWith(testState.roles);
      });

      it('returns false when state requires authorization and user is not authorized', function () {
        var testState = {
          roles: ['ROLE_USER']
        };
        spyOn(stateManager, 'stateRequiresAuthorization').andReturn(true);
        spyOn(securityService, 'hasAnyRoles').andReturn(false);
        expect(stateManager.authorizedToTransitionTo(testState)).toBe(false);
        expect(securityService.hasAnyRoles).toHaveBeenCalledWith(testState.roles);
      });

    });

  });

  describe('StateManager (with config)', function () {

    // load the example module to inject the ui.router dependency
    beforeEach(module('example'));

    //load the module under test
    beforeEach(module('ua.security', function (stateManagerProvider) {
      stateManagerProvider.setHomeStateName('myHome');
      stateManagerProvider.setLoginStateName('myLogin');
      stateManagerProvider.setUnauthorizedStateName('myUnauth');
    }));

    // instantiate service
    var stateManager;
    var $state;

    beforeEach(inject(function (_$state_,_stateManager_) {
      stateManager = _stateManager_;
      $state = _$state_;
    }));

    it('goToLoginState goes calls state.go with configured login state', function () {
      spyOn($state, 'go');
      stateManager.goToLoginState();
      expect($state.go).toHaveBeenCalledWith('myLogin');
    });

    it('goToHomeState goes calls state.go with configured home state', function () {
      spyOn($state, 'go');
      stateManager.goToHomeState();
      expect($state.go).toHaveBeenCalledWith('myHome');
    });

    it('goToUnauthorizedState goes calls state.go with configured unauthorized state', function () {
      spyOn($state, 'go');
      stateManager.goToUnauthorizedState();
      expect($state.go).toHaveBeenCalledWith('myUnauth');
    });

  });

  describe('', function () {

    //load the module under test
    beforeEach(module('ua.security'));

    // load the example module to inject the ui.router dependency
    beforeEach(module('uiRouterNoop'));

    // instantiate service
    var stateManager;
    var $state;
    var securityService;
    var $rootScope;
    var newState;
    var toState;
    var toParams;
    var fromState;

    beforeEach(inject(function (_$state_,_stateManager_, _securityService_, _$rootScope_) {
      stateManager = _stateManager_;
      $state = _$state_;
      securityService = _securityService_;
      $rootScope = _$rootScope_;

      var goSpy = jasmine.createSpy();
      goSpy.andCallFake(function (stateTransitioningTo) {
        newState = stateTransitioningTo;
      });
      $state.go = goSpy;

      toState = {
        name: 'main',
        roles: ['ROLE_USER']
      };
      toParams = {};
      fromState = {
        name: 'home'
      };

    }));

    afterEach(function () {
      newState = '';
    });

    it('stops attempted state transition and transitions to unauthorized state when user is ' +
      'authenticated but not authorized', function () {

      spyOn(securityService, 'isAuthenticated').andReturn(true);
      spyOn(securityService, 'hasAnyRoles').andReturn(false);

      stateManager.init();
      var evt = $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState);

      expect(evt.defaultPrevented).toBe(true);  //event was stopped
      expect(newState).toBe('unauthorized');    //user redirected to unauthorized state
      expect(securityService.hasAnyRoles).toHaveBeenCalled();   //check if user is authorized
      expect(securityService.isAuthenticated).toHaveBeenCalled(); //used to find next state
    });

    it('stops attempted state transition and transitions to login state when user is' +
      'not authenticated and not on the login page', function () {

      spyOn(securityService, 'isAuthenticated').andReturn(false);

      stateManager.init();
      var evt = $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState);

      expect(evt.defaultPrevented).toBe(true);  //event was stopped
      expect(newState).toBe('login');           //user redirected to login state
      expect(securityService.isAuthenticated).toHaveBeenCalled();
    });

    it('stops attempted state transition and leaves user at login state when user is ' +
      'not authenticated and on the login page', function(){

      fromState = {
        name: 'login'
      };
      spyOn(securityService, 'isAuthenticated').andReturn(false);
      spyOn(securityService, 'hasAnyRoles').andReturn(false);

      stateManager.init();
      var evt = $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState);

      expect(evt.defaultPrevented).toBe(true);  //event was stopped
      expect($state.go).not.toHaveBeenCalled(); //leaving the user at the login state
      expect(securityService.isAuthenticated).not.toHaveBeenCalled(); //at the login screen, so no check
      // if the user is authentecated
      expect(securityService.hasAnyRoles).toHaveBeenCalled(); //should check if the user is authorized
    });

    it('allows transition if state has no authorization requirements', function(){

      toState = {
        name: 'publicstate'
      };

      spyOn(securityService, 'isAuthenticated').andCallThrough();
      spyOn(securityService, 'hasAnyRoles').andCallThrough();

      stateManager.init();
      var evt = $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState);

      expect(evt.defaultPrevented).toBe(false);  //event was not stopped
      expect(securityService.isAuthenticated).not.toHaveBeenCalled();
      expect(securityService.hasAnyRoles).not.toHaveBeenCalled();
    });

    it('allows transition if state has authorization requirements met by the current user', function(){

      spyOn(securityService, 'hasAnyRoles').andReturn(true);

      stateManager.init();
      var evt = $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState);

      expect(evt.defaultPrevented).toBe(false);  //event was not stopped
      expect(securityService.hasAnyRoles).toHaveBeenCalled();
    });

  });

}());
