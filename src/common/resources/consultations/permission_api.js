(function() {
  'use strict';
  angular.module('permission.service', [])
  .factory('Permission', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/permissions.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());