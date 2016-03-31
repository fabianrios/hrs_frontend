(function() {
  'use strict';
  angular.module('extra_hour_record.service', [])
  .factory('ExtraHourRecords', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/extra_hour_records.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());