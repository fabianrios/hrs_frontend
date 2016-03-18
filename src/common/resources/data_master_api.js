(function() {
  'use strict';

  angular.module('data_master.service', [])

  .factory('DataMaster', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/employees/:id.json');
    return $resource(url, { id: '@id' }, {
    	'master_data_labels_company': { url:  HRAPI_CONF.apiBaseUrl('/employees/master_data_labels_company.json'), method: 'GET', isArray: false }
    });

  });
}());