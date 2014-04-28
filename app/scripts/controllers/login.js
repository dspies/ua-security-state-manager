'use strict';

angular.module('example')
  .controller('loginController', function ($scope, securityService) {
    $scope.message = '';

    $scope.login = function(username, password){
      securityService.login(username, password)
        .then(function(){
          $scope.message = 'success';
        }, function(){
          $scope.message = 'Invalid username or password';
        });
    };
  });
