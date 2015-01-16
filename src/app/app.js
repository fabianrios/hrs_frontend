(function(){
  'use strict';

  angular.module('hrsReleaseApp', [

    // Plugins
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
	'Devise',
    'mm.foundation',

    // Config
    'app.config',

    // Services
    'sap.service',

    // Directives

    // Modules
    'navbar',
    'sidebar',
    'companies',
    'dashboard'
  ])

  .config(function($stateProvider, AuthProvider, $httpProvider){
	// $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/layouts/remain.tpl.html',
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

  .controller('RootController', function($scope, Auth){
	
	  var credentials = {
	             email: 'hola@fabianrios.co',
	             password: 'f6e02785c'
	         };

	         Auth.login(credentials).then(function(user) {
	             console.log(user); // => {id: 1, ect: '...'}
	         }, function(error) {
	             // Authentication failed...
	         });

	         $scope.$on('devise:login', function(event, currentUser) {
	             // after a login, a hard refresh, a new tab
	         });

	         $scope.$on('devise:new-session', function(event, currentUser) {
	             // user logged in by Auth.login({...})
	         });
	  
    $scope.common = {};
    /**
    $scope.logout = function(){
      security.logout('login.main');

      // Borra los caches (de session storage) necesarios para que sea
      // consistente si otro usuario se loguea en el mismo navegador
      Cache.removeUserCaches();
    };
    **/
  });
  
  
}());
