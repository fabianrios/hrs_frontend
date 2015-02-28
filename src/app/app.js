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

  .controller('RootController', function($http, $scope, $animate, $location, $window, UserService, Auth, Company, User, Employee){
	  
	  // /watch location
  	  $scope.$on("$stateChangeSuccess", function (next, current) {
		  $scope.ubicacion = current.url;
  		  // console.log("ubicacion:",$scope.ubicacion);
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
	  $scope.vacation = {};
	  $scope.employee_info = {};
	  $scope.saldos = {};
	  $scope.betrg = [];
	  $scope.fpend = [];
	  
	  $scope.dateHanldler = function(date){
	    var dt = new Date(date);
		dt.getTime()
		return dt;
	  };
	  
  	   UserService.current_user.then(function(user) {
          // User was logged in, or Devise returned
          // previously authenticated session.
		   
		 	// variables para cesantias
			$scope.newbetrg = [];
			$scope.intbetrg = [];
			$scope.intfpend = [];
			$scope.intnewbetrg = [];
			$scope.elsaldocesantias = "";
			$scope.deduc = [];
			$scope.devng = [];
			$scope.fechas_deudas = [];
			$scope.ingresos = [];
			$scope.deducciones = [];
			
			$scope.user = user;
			$scope.elusuario = User.get({ id: $scope.user.id });
			$scope.elusuario.$promise.then(function(items){
	  			  $scope.employee = items.employee;
	  			  $scope.vacation = items.vacation;
				  $scope.employee_info = items.employee_info;
				  $scope.saldos = items.saldos;
				  // console.log($scope.saldos);
				  // meter las cesantias
				  angular.forEach($scope.saldos.t_cesantias,function(value,index){
			          $scope.betrg.push(value.betrg);
					  $scope.fpend.push(value.fpend);
			      })
				  // console.log($scope.fpend,$scope.betrg);
				  // console.log(items);
				  // Estos hay que parsearlos como numeros porque llegan como un string
	  			  $scope.vacationdays = [parseInt(items.vacation.resumen[1]),parseInt(items.vacation.resumen[2])];
				  $scope.vacationdates = items.vacation.detalle;
				  // console.log($scope.vacationdates);
				  $scope.company = items.company;
				 
				// Variables para cesantias 
	  			$scope.saldos = items.saldos;
	  			$scope.elsaldocesantias = $scope.saldos.saldo;
	  			$scope.intcesantias = $scope.saldos.intsaldo;
	  			// meter las cesantias
	  			angular.forEach($scope.saldos.t_cesantias,function(value,index){
	  				$scope.newbetrg.push(value.betrg);
	  				$scope.fpend.push(value.fpend);
	  			})
	  			// meter las int. cesantias			
	  			angular.forEach($scope.saldos.t_intcesantias,function(value,index){
	  				$scope.intbetrg.push(value.betrg);
	  				$scope.intfpend.push(value.fpend);
	  			})	
	  			// saldo de cesantias a numeros
	  			$scope.betrg.forEach(function(entry, index) {
	  			    $scope.newbetrg[index] = parseInt(entry);
	  			});
				
	  			// Intereses de cesantias a numeros
	  			$scope.intbetrg.forEach(function(entry) {
	  			    $scope.intnewbetrg.push(parseInt(entry));
	  			});
				
				$scope.newbetrg = $scope.newbetrg.reverse();
				$scope.fpend = $scope.fpend.reverse()
				$scope.intnewbetrg = $scope.intnewbetrg.reverse();
				$scope.intfpend = $scope.intfpend.reverse()
				
				//Deudas
	  			angular.forEach($scope.saldos.t_endeudamiento,function(value,index){
	  				$scope.deduc.push(value.deduc);
	  				$scope.devng.push(value.devng);
					$scope.fechas_deudas.push(value.fpend);
	  			})	
				
				$scope.deduc.forEach(function(deuda) {
	  			    $scope.deducciones.push(parseInt(deuda));
	  			});
				

				$scope.devng.forEach(function(ingresos) {
	  			    $scope.ingresos.push(parseInt(ingresos));
	  			});
				
				$scope.ingresos = $scope.ingresos.reverse();
				$scope.deducciones = $scope.deducciones.reverse();
				$scope.fechas_deudas = $scope.fechas_deudas.reverse();
				  
		  });
		  
		  
		  $scope.company = Company.show({id: $scope.user.company_id});
		  // para comprobar que si esta autenticado
		  $scope.autenticado = Auth.isAuthenticated(user);
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
