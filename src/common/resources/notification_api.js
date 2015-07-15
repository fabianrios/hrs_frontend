(function() {
  'use strict';

  angular.module('notification.service', [])

  .factory('Notification', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/notifications/:id.json');
    return $resource(url, { id: '@id' }, {
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} }      
    });
	
  });
}());
