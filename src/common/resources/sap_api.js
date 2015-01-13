(function() {
  'use strict';

  angular.module('sap.service', [])

  .factory('Company', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/companies/:id');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    });

  });
}());
