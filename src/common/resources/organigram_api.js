(function() {
  'use strict';

  angular.module('organigram.service', [])

  .factory('Organigram', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/organigram/show/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
	  'show': { method: 'GET', isArray: false }
    });

  })
  .factory('google', function(){
    return google;
  })
}());


