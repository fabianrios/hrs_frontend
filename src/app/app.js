(function(){
  'use strict';

  angular.module('hrsReleaseApp', [

    // Plugins
    'ngResource',
    'ngSanitize',
    'ui.router',

    // Config
    'app.config',

    // Directives

    // Modules
    'navbar',
    'sidebar',
	'companies',
    'dashboard'
  ])

  .config(function($stateProvider){
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/layouts/main.tpl.html',
        controller: ['$scope', function($scope){
          $scope.ui = {};
        }]
      })
      .state('main.views', {
        views: {
          navbar: {
            templateUrl: 'app/navbar/navbar.tpl.html',
            controller: 'Navbar.NavbarController'
          },
          sidebar: {
            templateUrl: 'app/sidebar/sidebar.tpl.html',
            controller: 'Sidebar.SidebarController'
          },
          content: {
            template: '<div ui-view=""></div>'
          }
        }
      });
  })

  .controller('RootController', function($scope){
    $scope.common = {};
    /**
    $scope.logout = function(){
      security.logout('login.main');

      // Borra los caches (de session storage) necesarios para que sea
      // consistente si otro usuario se loguea en el mismo navegador
      Cache.removeUserCaches();
    };
    **/
  })
  
  .factory('Company', ['$resource', function($resource) {
    return $resource('/api/companies/:id', {id: "@id"}, {
		'create': { method:'POST' },
		'index': { method:'GET', isArray: true },
		'show': { method:'GET', isArray: false },
		'update': { method:'PUT' },
		'destroy': { method:'DELETE' }
    });
  }]);
  
}());
