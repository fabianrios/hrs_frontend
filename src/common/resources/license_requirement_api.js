(function() {
  'use strict';

  angular.module('license_requirement.service', [])

  .factory('License_requirement', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/license_requirements/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    });
	
  });
}());

