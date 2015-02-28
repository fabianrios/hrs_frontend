(function(){
	'use strict';

	angular.module('hrsReleaseApp', [

		// Plugins
		'ngResource',
		'ngSanitize',
		'ui.router',
		'ui.sortable',
		'Devise',
		'ngPopup',
		'chart.js',

		// Config
		'app.config',

		// Services
		'sap.service',
		'user.service',
		'organigram.service',
		'employee.service',
		'vacation.service',
		'vacation_requirement.service',
		'employee_info.service',

		// Directives
		'ngS3upload',
		'highcharts-ng',

		// Modules
		'navbar',
		'sidebar',
		'profile',
		'expandbanner',
		'companies',
		'vacations',
		'employee_info',
		'sessions',
		'dashboard',
		'organigram'
	])

	.config(function($stateProvider, AuthProvider, $httpProvider, HRAPI_CONF, AuthInterceptProvider){
		$httpProvider.defaults.headers.common['X-CSRF-Token'] = angular.element('meta[name=csrf-token]').attr('content');
		// console.log($httpProvider.defaults.headers.common['X-CSRF-Token'],angular.element('meta[name=csrf-token]').attr('content'));
		// Intercept 401 Unauthorized everywhere
		AuthInterceptProvider.interceptAuth(true);
	
	
		// Tenemos que sobreescribir todas las posibles funciones con el prefijo api/
		var loginurl = HRAPI_CONF.apiBaseUrl('/users/sign_in.json');
		var logout = HRAPI_CONF.apiBaseUrl('/users/sign_out.json');
		var register = HRAPI_CONF.apiBaseUrl('/users.json');
		// AuthProvider.loginPath(loginurl);
		// AuthProvider.logoutPath(logout);
		// AuthProvider.registerPath(register);
		AuthProvider.loginPath('api/users/sign_in.json');
		AuthProvider.logoutPath('api/users/sign_out.json');
		AuthProvider.registerPath('api/users.json');
	
		$stateProvider
		.state('main', {
			abstract: true,
			templateUrl: 'app/layouts/remain.tpl.html',
			resolve: {
				employees: function(Employee){
					return Employee.index().$promise;
				}
			},
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
				profile: {
					templateUrl: 'app/profile/profile.tpl.html',
					controller: 'Profile.ProfileController'
				},
				expandbanner: {
					templateUrl: 'app/expandbanner/expandbanner.tpl.html',
					controller: 'Expandbanner.ExpandbannerController'
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
	.run(function($rootScope) {
		$rootScope.$on('$viewContentLoaded', function () {
			$(document).foundation({
				offcanvas : {
					// Sets method in which offcanvas opens.
					// [ move | overlap_single | overlap ]
					open_method: 'move', 
					close_on_click : true
				}
			});
		})
	})
	.factory('UserService', function(Auth) {

		return {
			autenticado : Auth.isAuthenticated(),
			current_user: Auth.currentUser()
		};
	})

	.controller('RootController', function($http, $scope, $state, $animate, $location, $window, UserService, Auth, Company, User, Employee, UserInfo){
	  
		// /watch location
		$scope.$on("$stateChangeSuccess", function (next, current) {
			$scope.ubicacion = current.url;
			console.log("ubicacion:",$scope.ubicacion, $state);
		})
	  
		// MODAL OPEN
		$scope.openModal = function(modal) {
			$('#myModal-'+modal).foundation('reveal', 'open');  
		};
	  
		$scope.autenticado;
	  
		//alertas
		$scope.alerts = [];
		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
		///alertas
	  
		$scope.employee = {};
		$scope.user = {};
	  
		$scope.dateHanldler = function(date){
			var dt = new Date(date);
			dt.getTime()
			return dt;
		};
	  
	  
	  	UserInfo.currentUser().then(function(user_info){
	  		
			$scope.user = user_info;
			$scope.employee = user_info.employee;
			$scope.company = user_info.company
			$scope.autenticado = true;
			
	  	}, function(error){
			//codigo handling error interfaz
			console.log(error,"algo paso con el usuario autenticado");
		});
		  
			 
		// Catch unauthorized requests and recover.
		$scope.$on('devise:unauthorized', function(event, xhr, deferred) {
			// Ask user for login credentials
			$location.path('/login');
		});
			 
	  
		$scope.common = {};
	
		$scope.edit_profile = function(){
			$location.path('/edit');
		};

		//toggle expand vacation box
		$scope.toggle = function(e){
			// console.log(e.currentTarget);
			$(e.currentTarget).toggleClass("active");
			$(".expandbanner").slideToggle();
		}
	
		//sort stuff icon-bar
		$scope.sorthings = function(e,data){
			// console.log(e);
			$(".icon-bar a.item").removeClass("active");
			$(e.currentTarget).toggleClass("active");
			$('.information').hide('fast');
			$("."+data).show('slow');
		}
	
		//iconos
		$scope.icons = ["icon-location","fa fa-location-arrow", "fa fa-phone", "fa fa-envelope-o"];
	
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
