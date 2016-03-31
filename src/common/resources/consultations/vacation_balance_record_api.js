(function() {
  'use strict';
  angular.module('vacation_balance_record.service', [])
  .factory('VacationBalanceRecord', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/vacation_balance_records.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());
