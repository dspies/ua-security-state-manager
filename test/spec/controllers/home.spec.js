'use strict';

describe('Controller: homeController', function () {

  // load the controller's module
  beforeEach(module('example'));

  var homeController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    homeController = $controller('homeController', {
      $scope: scope
    });
  }));

  it('should contain the status message', function () {
    expect(scope.message).toBe('You are on the home page');
  });
});
