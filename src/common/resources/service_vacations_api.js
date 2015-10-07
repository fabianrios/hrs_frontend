(function() {
  'use strict';

  angular.module('service_vacations.service', [])

  .factory('Service_Vacation_requirement', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/service_vacations/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    });
	
  });
}());

