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
	'organigram.service',

    // Directives

    // Modules
    'navbar',
    'sidebar',
    'companies',
	'sessions',
    'dashboard',
	'organigram'
  ])

  .config(function($stateProvider, AuthProvider, $httpProvider, AuthInterceptProvider){
	// $httpProvider.defaults.headers.common['X-CSRF-Token'] = angular.element('meta[name=csrf-token]').attr('content');
	// Intercept 401 Unauthorized everywhere
    AuthInterceptProvider.interceptAuth(true);
	
	// Tenemos que sobreescribir todas las posibles funciones con el prefijo api/
	AuthProvider.loginPath('api/users/sign_in.json');
	AuthProvider.logoutPath('api/users/sign_out.json');
	AuthProvider.registerPath('api/users.json');
	
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

  .factory('UserService', function(Auth) {

	  return {
		  autenticado : Auth.isAuthenticated(),
		  current_user: Auth.currentUser()
	    };
  })

  .controller('RootController', function($http, $scope, UserService, Auth, $location, $window, Company){
	  
	  $scope.autenticado;
	  
	  
  	   UserService.current_user.then(function(user) {
          // User was logged in, or Devise returned
          // previously authenticated session.
          // console.log(user); // => {id: 1, ect: '...'}
		  $scope.user = user;
		  $scope.company = Company.show({id: $scope.user.company_id});
		  // para comprobar que si esta autenticado
		  $scope.autenticado = Auth.isAuthenticated(user)
		  // console.log($scope.company);
      }, function(error) {
          // unauthenticated error
		  console.log("error al optener el usuario autenticado");
		  // TO-DO: hay que cambiar esto por un $state
		  $location.path('/login');
      });
		  
			 
 		// Catch unauthorized requests and recover.
         $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
             // Ask user for login credentials
			 $location.path('/login');
         });
			 
	  
    $scope.common = {};
	
	$scope.edit_profile = function(){
		$location.path('/edit');
	}

    $scope.logout = function(){
		Auth.logout().then(function(oldUser) {
            console.log(oldUser.email + "you're signed out now.");
        }, function(error) {
            // An error occurred logging out.
        });

        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            $location.path('/home');
			$window.location.reload();
        });

      // Borra los caches (de session storage) necesarios para que sea
      // consistente si otro usuario se loguea en el mismo navegador
      // Cache.removeUserCaches();
	  
	  
    };

  });
  
  
}());
