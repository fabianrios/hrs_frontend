(function() {
  'use strict';

  angular.module('user.service', ['Devise'])

  .factory('UserInfo', function(Auth) {
    return {
      currentUser: function(){
        var deferred = $q.defer()
        Auth.currentUser().then(function(user){
          User.get({ id: user.id }).then(function(user_info){
            deferred.resolve(user);
          }, function(error){
            // user info failed
            deferred.reject(error);  // error
          });
          
        }, function(error){
          console.log(error);
          deferred.reject(error);  // error
        });

        return deferred.promise;
      },
      autenticado: Auth.isAuthenticated()
    }
  })

  .factory('User', function($resource, HRAPI_CONF) {
    var url = HRAPI_CONF.apiBaseUrl('/users/:id.json');
    return $resource(url, { id: '@id' }, {
      'create': { method: 'POST' },
      'index': { method: 'GET', isArray: true },
      'show': { method: 'GET', isArray: true },
      'update': { method: 'PUT', params: {id: '@id'} },
      'destroy': { method: 'DELETE' }
    });

  });
}());

