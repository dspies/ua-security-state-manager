'use strict';

describe('Controller: adminController', function () {

  // load the controller's module
  beforeEach(module('example'));

  var adminController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    adminController = $controller('adminController', {
      $scope: scope
    });
  }));

  it('should contain the status message', function () {
    expect(scope.message).toBe('You are on the admin page');
  });

});
