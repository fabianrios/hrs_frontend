(function() {
  'use strict';

  angular.module('employee_info.service', [])

  .factory('Employee_info', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/employee_infos/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    });
	
  });
}());

