'use strict';

describe('Controller: loginController', function () {

  // load the controller's module
  beforeEach(module('example'));

  // in a spec where $state and $urlRouter should be skipped -- ie. a http model
  beforeEach(module('uiRouterNoop'));

  var loginController,
      scope,
      securityService,
      deferred,
      rootScope,
      stateManager,
      nextState;

  beforeEach(inject(function ($controller, $rootScope, _securityService_, $q, _stateManager_) {
    rootScope = $rootScope;
    scope = rootScope.$new();
    loginController = $controller('loginController', {
      $scope: scope
    });
    securityService = _securityService_;
    stateManager = _stateManager_;
    deferred = $q.defer();

    spyOn(stateManager, 'goToHomeState').andCallFake(function () {
      nextState = 'home';
    });

    spyOn(securityService, 'login').andReturn(deferred.promise);
  }));

  afterEach(function(){
    nextState = '';
  });

  it('should show the appropriate message', function () {
    expect(scope.message).toBe('');
  });

  it('should show an error message when login fails', function () {
    var errorMessage = '403';

    scope.login('user', 'password');
    deferred.reject(errorMessage);
    rootScope.$apply();

    expect(securityService.login).toHaveBeenCalledWith('user', 'password');
    expect(scope.message).toBe('Invalid username or password');
  });

  it('should redirect to the home state when login is successful', function () {
    var user = {
      username: 'user',
      token: 'myToken',
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    };

    scope.login(user.username, 'password');
    deferred.resolve(user);
    rootScope.$apply();

    expect(securityService.login).toHaveBeenCalledWith(user.username, 'password');
    expect(stateManager.goToHomeState).toHaveBeenCalled();
    expect(nextState).toBe('home');
  });

});
