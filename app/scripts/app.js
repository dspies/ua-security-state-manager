'use strict';

angular.module('example', ['ua.security', 'ui.router', 'ngMockE2E'])
  .config(function (authenticationServiceProvider, $stateProvider, $urlRouterProvider) {

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
        roles: ['ROLE_USER'],
        templateUrl: 'views/home.html',
        controller: 'homeController'
      })
      .state('admin', {
        url: '/admin',
        roles: ['ROLE_ADMIN'],
        templateUrl: 'views/admin.html',
        controller: 'adminController'
      })
      .state('unauthorized', {
        url: '/unauthorized',
        template: 'You are not authorized'
      });

  });