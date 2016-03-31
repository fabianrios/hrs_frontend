(function() {
  'use strict';

  angular.module('indebtedness_level.service', [])

  .factory('IndebtednessLevel', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/indebtedness_level.json');
    return $resource(url, {}, {
      'index': { method: 'GET', isArray: false }
    });

  });
}());