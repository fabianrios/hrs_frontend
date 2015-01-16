(function(){
  'use strict';

  angular.module('hrsReleaseApp', [

    // Plugins
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
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

  .config(function($stateProvider){
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
  });
  
  
}());
