(function() {
  'use strict';

  angular.module('manager_organigram.service', [])
  .factory('ManagerOrganigram', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/manager_organigram/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });
  });
}());