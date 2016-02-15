(function() {
  'use strict';

  angular.module('variance_analysis.service', [])

  .factory('VarianceAnalysis', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/variance_analysis/:id.json');
    return $resource(url, { id: '@id' }, {
      'index': { method: 'GET', isArray: false },
    });

  });
}());