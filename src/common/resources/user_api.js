(function() {
  'use strict';

  angular.module('user.service', [])

  .factory('User', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/users/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: true },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    });

  });
}());


