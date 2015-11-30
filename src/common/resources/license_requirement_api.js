(function() {
  'use strict';

  angular.module('license_requirement.service', [])

  .factory('License_requirement', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/license_requirements/:id.json');
    return $resource(url, { id: '@id' }, {      
      'index': { method: 'GET', isArray: true },
      'index_approve': { url: HRAPI_CONF.apiBaseUrl('/license_requirements/approves.json'),method: 'GET', isArray: true },
      'approve': { url: HRAPI_CONF.apiBaseUrl('/license_requirements/:id/approve.json'), method: 'PUT', params: { id: '@id' } },
      'denied': { url: HRAPI_CONF.apiBaseUrl('/license_requirements/:id/denied.json'), method: 'PUT', params: { id: '@id' } },
      'destroy': { method: 'DELETE', params: { id: '@id' } }
    });
	
  });
}());

