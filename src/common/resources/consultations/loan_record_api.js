(function() {
  'use strict';
  angular.module('loan_record.service', [])
  .factory('LoanRecord', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/loan_records.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());