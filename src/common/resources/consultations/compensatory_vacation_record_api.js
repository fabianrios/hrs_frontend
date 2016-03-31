(function() {
  'use strict';
  angular.module('compensatory_vacation_record.service', [])
  .factory('CompensatoryVacationRecord', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/compensatory_vacation_records.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());
