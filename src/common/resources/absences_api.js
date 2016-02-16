(function() {
  'use strict';

  angular.module('absences.service', [])

  .factory('Absences', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/absences/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });

  });
}());