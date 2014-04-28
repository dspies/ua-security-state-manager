'use strict';

angular.module('example', ['ua.security', 'ui.router', 'ngMockE2E'])
  .config(function ($stateProvider, $urlRouterProvider, authenticationServiceProvider) {

    authenticationServiceProvider.setAuthenticationUrl('api/login');
    authenticationServiceProvider.setLogoutUrl('api/logout');

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'loginController'
      })
      .state('home', {
        url:'/home',
        templateUrl: 'views/home.html',
        controller: 'homeController'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'adminController'
      });
  });
