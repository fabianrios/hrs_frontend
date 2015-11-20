(function() {
  'use strict';

  angular.module('compensatory_vacation.service', [])

  .factory('Compensatory_vacation', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/compensatory_vacations/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    });
	
  });
}());

