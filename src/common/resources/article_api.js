(function() {
  'use strict';

  angular.module('article.service', [])

  .factory('Article', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/articles/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { url: HRAPI_CONF.apiBaseUrl('/articles.json?per=:per'), method: 'GET', isArray: false, params: {per: '@per'} },
      'show': { method: 'GET', isArray: false },
      'update': { method: 'PUT', params: {id: '@id'} }
    });
	
  });
}());

