/**
 * 
 * @version v0.0.1 - 2014-10-31
 * @link 
 * @author 
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(){
	'use strict';

	angular.module('ua.security')
	  .factory('stateManager', ['securityService', '$state', '$rootScope', function (securityService,   $state,   $rootScope) {
	
	    //TODO Make these properties configurable
	    var loginStateName = 'login';
	    var homeStateName = 'home';
	    var unauthorizedStateName = 'unauthorized';
	
	    var loggedIn = function () {
	      return securityService.isAuthenticated();
	    };
	
	    var goToLoginState = function () {
	      $state.go(loginStateName);
	    };
	
	    var goToHomeState = function () {
	      $state.go(homeStateName);
	    };
	
	    var goToUnauthorizedState = function () {
	      $state.go(unauthorizedStateName);
	    };
	
	    var stateRequiresAuthorization = function(state){
	      return 'roles' in state;
	    };
	
	    var authorizedToTransitionTo = function (toState) {
	      return !stateRequiresAuthorization(toState) || currentUserIsAllowed(toState);
	    };
	
	    var currentUserIsAllowed = function (state) {
	      return securityService.hasAnyRoles(state.roles);
	    };
	
	    //TODO Create overridable/configurable handler
	    var stateChangeStartAuthorizationInterceptor = function(event, toState, toParams, fromState, fromParams) {
	      if (!authorizedToTransitionTo(toState)){
	        event.preventDefault();
	
	        //TODO Allow multiple 'unauthorizedStateChange' handlers (in order to perform functions like logging)
	        unauthorizedStateChange(event, toState, toParams, fromState, fromParams);
	      }
	    };
	
	    //TODO Create overridable/configurable handler
	    var unauthorizedStateChange = function (event, toState, toParams, fromState) {
	
	      if (!atLoginState(fromState)){
	        if (loggedIn()){
	          goToUnauthorizedState();
	        } else {
	          goToLoginState();
	        }
	      }
	    };
	
	    var atLoginState = function (state) {
	      return state.name === loginStateName;
	    };
	
	    var initialize = function() {
	      //Register route authorization handler
	      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
	        stateChangeStartAuthorizationInterceptor(event, toState, toParams, fromState, fromParams);
	      });
	    };
	
	    return {
	      loggedIn: loggedIn,
	      authorizedToTransitionTo: authorizedToTransitionTo,
	      stateRequiresAuthorization: stateRequiresAuthorization,
	      goToHomeState: goToHomeState,
	      goToLoginState: goToLoginState,
	      goToUnauthorizedState: goToUnauthorizedState,
	      init: initialize
	    };
	
	  }])
	  .run(['stateManager', function (stateManager) {
	    stateManager.init();
	  }]);
	
}());