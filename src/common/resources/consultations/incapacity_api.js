(function() {
  'use strict';
  angular.module('incapacity.service', [])
  .factory('Incapacity', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/incapacities.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());