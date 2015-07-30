(function() {
  'use strict';

  angular.module('employee.service', [])

  .factory('Employee', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/employees/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' },
      'search': { url:  HRAPI_CONF.apiBaseUrl('/employees/search') ,method: 'GET', isArray: true, params: { q: '@q'} }
    });
	
  });
}());

