(function() {
  'use strict';

  angular.module('user.service', ['Devise'])
  
  .factory('User', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/users/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: true },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    	})
	})
  
  .factory('UserInfo', function($q, Auth, User) {
      return {
        currentUser: function(){
          var deferred = $q.defer()
          Auth.currentUser().then(function(user){
            User.get({ id: user.id }).$promise.then(function(user_info){
              deferred.resolve(user_info);
            }, function(error){
              // user info failed
              deferred.reject(error);  // error
            });
          
          }, function(error){
            deferred.reject(error);  // error
			$location.path('/login');
          });

          return deferred.promise;
        },
        autenticado: Auth.isAuthenticated()
      }
  });
}());

