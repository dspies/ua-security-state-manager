// uiRouterNoop.js helper module
// created from https://github.com/angular-ui/ui-router/issues/212#issuecomment-24766298
angular.module('uiRouterNoop', [])
  .service('$state', function() {
    'use strict';
    return {};
  })
  .service('$urlRouter', function() {
    'use strict';
    return {};
  });

//Include in a spec where $state and $urlRouter should be skipped -- ie. a http model
//beforeEach(module('uiRouterNoop'));