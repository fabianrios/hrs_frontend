(function() {
  'use strict';
  angular.module('embargo.service', [])
  .factory('Embargoes', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/embargo.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });
  });
}());