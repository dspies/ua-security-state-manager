'use strict';

angular.module('example')
  .controller('loginController', ['$scope', 'securityService', 'stateManager',
                         function ($scope,   securityService,   stateManager) {

    $scope.message = '';

    $scope.login = function(username, password){
      securityService.login(username, password)
        .then(function(){
          stateManager.goToHomeState();
        }, function(){
          $scope.message = 'Invalid username or password';
        });
    };
  }]);
