(function() {
  'use strict';

  angular.module('company.service', [])

  .factory('Company', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/companies/:id.json');
    return $resource(url, { id: '@id' }, {
      'show': { method: 'GET', isArray: false }
    });

  });
}());

