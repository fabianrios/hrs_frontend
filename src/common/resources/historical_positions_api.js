(function() {
  'use strict';

  angular.module('historical_positions.service', [])

  .factory('HistoricalPositions', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/historical_positions/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });

  });
}());