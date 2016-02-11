(function() {
  'use strict';

  angular.module('personal_rotation.service', [])

  .factory('PersonalRotation', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/staff_turnover/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });

  });
}());