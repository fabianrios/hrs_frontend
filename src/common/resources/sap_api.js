(function() {
  'use strict';

  angular.module('sap.service', [])

  .factory('Company', ['$resource', function($resource) {
    return $resource('/api/companies/:id', { id: '@id' }, {
    'create': { method: 'POST' },
    'index': { method: 'GET', isArray: false },
    'show': { method: 'GET', isArray: false },
    'update': { method: 'PUT' },
    'destroy': { method: 'DELETE' }
    });

  }]);
}());
