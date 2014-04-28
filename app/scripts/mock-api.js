angular.module('example')
    .run(function ($httpBackend) {
      'use strict';

      var user = {
        request: {
          username:'user',
          password:'user'
        },
        response: {
          username:'user',
          token:'IAmAHappyToken',
          roles: ['ROLE_USER']
        }
      };

      var admin = {
        request: {
          username:'admin',
          password:'admin'
        },
        response: {
          username:'admin',
          token:'IAmAHappyTokenToo',
          roles: ['ROLE_USER', 'ROLE_ADMIN']
        }
      };

      //Login request with username='user' should return regular user
      $httpBackend.whenPOST('api/login', user.request).respond(user.response);

      //Login request with username='admin' should return admin user
      $httpBackend.whenPOST('api/login', admin.request).respond(admin.response);

      //All requests for templates/views should be passed on
      $httpBackend.whenGET(/\.html$/).passThrough();
    });
