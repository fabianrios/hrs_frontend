(function() {
  'use strict';
  angular.module('enjoyed_vacation.service', [])
  .factory('EnjoyedVacation', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/vacation_record.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());