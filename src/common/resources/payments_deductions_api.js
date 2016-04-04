(function() {
  'use strict';

  angular.module('payments_deductions.service', [])
  .factory('PaymentsDeductions', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/payments_deductions/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });
  })
  .factory('PaymentsDeductionsRecords', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/employees/payments_deductions.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });
  });
}());