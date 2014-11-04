'use strict';

angular.module('example', ['ua.security', 'ui.router', 'ngMockE2E'])

  .config(function ($stateProvider, $urlRouterProvider) {

//  .config(function ($stateProvider, $urlRouterProvider, stateManagerProvider) {
//    stateManagerProvider.setLoginStateName('myLogin');
//    stateManagerProvider.setHomeStateName('myHome');
//    stateManagerProvider.setUnauthorizedStateName('myUnauth');

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
