(function() {
  'use strict';

  angular.module('compensatory_vacation.service', [])

  .factory('Compensatory_vacation', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/compensatory_vacations/:id.json');
    return $resource(url, { id: '@id' }, {      
      'index': { method: 'GET', isArray: true },
      'index_approve': { url: HRAPI_CONF.apiBaseUrl('/compensatory_vacations/approves.json'),method: 'GET', isArray: true },
      'approve': { url: HRAPI_CONF.apiBaseUrl('/compensatory_vacations/:id/approve.json'), method: 'PUT', params: { id: '@id' } },
      'denied': { url: HRAPI_CONF.apiBaseUrl('/compensatory_vacations/:id/denied.json'), method: 'PUT', params: { id: '@id' } },
      'destroy': { method: 'DELETE', params: { id: '@id' } }
    });
	
  });
}());

