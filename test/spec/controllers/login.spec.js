'use strict';

describe('Controller: loginController', function () {

  // load the controller's module
  beforeEach(module('example'));

  var loginController,
      scope,
      securityService,
      deferred,
      rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _securityService_, $q) {
    rootScope = $rootScope;
    scope = rootScope.$new();
    loginController = $controller('loginController', {
      $scope: scope
    });
    securityService = _securityService_;

    deferred = $q.defer();

    spyOn(securityService, 'login').andReturn(deferred.promise);
  }));

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

  it('should show a successful message when login is succesful', function () {
    var user = {
      username: 'user',
      token: 'myToken',
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    };

    scope.login(user.username, 'password');
    deferred.resolve(user);
    rootScope.$apply();

    expect(securityService.login).toHaveBeenCalledWith(user.username, 'password');
    expect(scope.message).toBe('success');
  });

});
