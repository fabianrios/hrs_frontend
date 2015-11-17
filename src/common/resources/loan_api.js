(function() {
  'use strict';

  angular.module('loan.service', [])

  .factory('Loan', function($resource, HRAPI_CONF) {
    // se debe actualizar servicio, ya no se debe enviar idenficacion del empleado.
    var url = HRAPI_CONF.apiBaseUrl('/loans/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: true },
      'create': { method: 'POST'},
      'update': { method: 'PUT', params: { id: '@id' } },
      'destroy': { method: 'DELETE', params: { id: '@id' } },
      'status': { url: HRAPI_CONF.apiBaseUrl('/api/loans/status.json'),method: 'GET', isArray: false}
    });
	
  });
}());
