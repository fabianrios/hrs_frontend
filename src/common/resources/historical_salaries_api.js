(function() {
  'use strict';

  angular.module('historical_salaries.service', [])
  .factory('HistoricalSalaries', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/historical_salaries/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });
  });
}());