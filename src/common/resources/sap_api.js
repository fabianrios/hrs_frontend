(function() {
  'use strict';

  angular.module('sap.service', [])

  .factory('Company', ['$resource', function($resource) {
    return $resource('/api/companies/:id.json', { id: '@id' }, {
    'create': { method: 'POST' },
    'index': { method: 'GET', isArray: true },
    'show': { method: 'GET', isArray: false },
    'update': { method: 'PUT', params: {id: '@id'} },
    'destroy': { method: 'DELETE' }
    });

  }]);
}());
