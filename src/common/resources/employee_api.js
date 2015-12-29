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
      'search': { url:  HRAPI_CONF.apiBaseUrl('/employees/search') ,method: 'GET', isArray: true, params: { q: '@q'} },
			'dams': { url:  HRAPI_CONF.apiBaseUrl('/employees/dams') ,method: 'GET', isArray: false, params: { q: '@q'} },
      'all_by_fecha_de_ingreso': { url:  HRAPI_CONF.apiBaseUrl('/employees/all_by_fecha_de_ingreso.json'), method: 'GET', isArray: true },
      'all_by_cumpleano_mes': { url:  HRAPI_CONF.apiBaseUrl('/employees/all_by_cumpleano_mes.json'), method: 'GET', isArray: true },
      'all_by_current_month_entry': { url:  HRAPI_CONF.apiBaseUrl('/employees/all_by_current_month_entry.json'), method: 'GET', isArray: true }
    });
	
  });
}());

