(function() {
  'use strict';

  angular.module('severance.service', [])

  .factory('Severance', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/severances/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: true },
      'index_approve': { url: HRAPI_CONF.apiBaseUrl('/severances/approves.json'),method: 'GET', isArray: true },
      'approve': { url: HRAPI_CONF.apiBaseUrl('/severances/:id/approve.json'), method: 'PUT', params: { id: '@id' } },
      'denied': { url: HRAPI_CONF.apiBaseUrl('/severances/:id/denied.json'), method: 'PUT', params: { id: '@id' } },
      'destroy': { method: 'DELETE', params: { id: '@id' } }
    });
	
  });
}());
