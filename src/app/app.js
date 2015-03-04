(function(){
  'use strict';

  angular.module('hrsReleaseApp', [

    // Plugins
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'Devise',
    'chart.js',
    //'mm.foundation',

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
	'topbar',
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

  .config(function($stateProvider, $httpProvider, HRAPI_CONF, AuthProvider, AuthInterceptProvider){


    $httpProvider.defaults.headers.common['X-CSRF-Token'] = angular.element('meta[name=csrf-token]').attr('content');
    // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  
    // Configura angular-devise
    AuthInterceptProvider.interceptAuth(true);
    AuthProvider.loginPath(HRAPI_CONF.apiBaseUrl('/users/sign_in.json'));
    AuthProvider.logoutPath(HRAPI_CONF.apiBaseUrl('/users/sign_out.json'));
    AuthProvider.registerPath(HRAPI_CONF.apiBaseUrl('/users.json'));
  
    // Configura estados de aplicacion ui-router
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'app/layouts/remain.tpl.html'
      })
      .state('main.views', {
		resolve: {
	        currentUser: function(UserInfo){
	          return UserInfo.currentUser();
	        }
		},
        views: {
          topbar: {
            templateUrl: 'app/topbar/topbar.tpl.html',
            controller: 'Topbar.TopbarController'
          },
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
            controller: 'Sidebar.SidebarController',
		      resolve: {
		          employees: function(Employee){
		              return Employee.index();
		            }
		      }
          },
          content: {
            template: '<div ui-view=""></div>'
          }
        }
      });
  })


  .run(function($http, $rootScope, $state, UserInfo, Auth){
	
	// #aca no estamos en ningun lado porque es el defaul
    // console.log("Current State:", $state.current);
    UserInfo.currentUser().then(function(current_user){
	 // no hay usuario no devuelve nada hasta que este logueado
     // console.log("Current User:", currentUser);
    });
	
	// esta vaina me dice donde estamos y de donde venimos ademas define el rootscope de ubicacion para userlo como variable
    $rootScope.$on('$stateChangeStart', function(ev, toState, toParams, fromState){
	  //se logue hay que cambiar de estado 
      // console.log("Cambiando estado:", fromState, toState);
	  $rootScope.ubicacion = toState.name;
	  console.log($rootScope.ubicacion);
    });
    
    // Catch unauthorized requests and recover.
    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      // Ask user for login credentials
      // console.log("devise:unauthorized -> login.auth");
      $state.go('login.auth');
    });

    $rootScope.$on('devise:login', function(event, currentUser) {
      // after a login, a hard refresh, a new tab
      // console.log("devise:login -> main.views.dashboard", currentUser);
      $state.go('main.views.dashboard');
    });

    $rootScope.$on('devise:new-session', function(event, currentUser) {
      // user logged in by Auth.login({...})
      // console.log("devise:new-session", "nothing done");
    });

    $rootScope.$on('devise:logout', function(event, oldCurrentUser) {
      $state.go('login.auth', {"logout": true});
    });

    $rootScope.logout = function(){
      Auth.logout().then(function(oldUser) {
          console.log(oldUser.email + "you're signed out now.");
        }, function(error) {
          // An error occurred logging out.
          console.log("An error occurred logging out", error);
      });
    };
	
	// Foundation nice and working
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
	  
      //toggle expand vacation box
      $rootScope.toggle = function(e){
        // console.log(e.currentTarget);
        $(e.currentTarget).toggleClass("active");
        $(".expandbanner").slideToggle();
      };
      
      //sort stuff icon-bar
      $rootScope.sorthings = function(e,data){
        // console.log(e);
        $(".icon-bar a.item").removeClass("active");
        $(e.currentTarget).toggleClass("active");
        $('.information').hide('fast');
        $("."+data).show('slow');
      };
      
      //iconos
      $rootScope.icons = ["icon-location","fa fa-location-arrow", "fa fa-phone", "fa fa-envelope-o"];
       
	   
	  // para las fechas que no vienen formateadas
      $rootScope.dateHanldler = function(date){
        var dt = new Date(date);
        dt.getTime();
        return dt;
      };
    
	   
    /**
    
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
    

    UserService.current_user.then(function(user) {
          // User was logged in, or Devise returned
          // previously authenticated session.
       
      // variables para cesantias
      $scope.newbetrg = [];
      $scope.intbetrg = [];
      $scope.intfpend = [];
      $scope.intnewbetrg = [];
      $scope.elsaldocesantias = "";

      $scope.user = user;
      $scope.elusuario = User.get({ id: $scope.user.id });
      $scope.elusuario.$promise.then(function(items){
          $scope.employee = items.employee;
          $scope.vacation = items.vacation;
          $scope.employee_info = items.employee_info;
          $scope.saldos = items.saldos;
          console.log($scope.saldos);

         
        // Variables para cesantias 
          $scope.saldos = items.saldos;
          $scope.elsaldocesantias = $scope.saldos.saldo;
          $scope.intcesantias = $scope.saldos.intsaldo;
          // meter las cesantias
          angular.forEach($scope.saldos.t_cesantias,function(value){
            $scope.newbetrg.push(value.betrg);
            $scope.fpend.push(value.fpend);
          });

          // meter las int. cesantias     
          angular.forEach($scope.saldos.t_intcesantias,function(value){
            $scope.intbetrg.push(value.betrg);
            $scope.intfpend.push(value.fpend);
          });  

          // saldo de cesantias a numeros
          $scope.betrg.forEach(function(entry, index) {
              $scope.newbetrg[index] = parseInt(entry);
          });
        
          // Intereses de cesantias a numeros
          $scope.intbetrg.forEach(function(entry) {
              $scope.intnewbetrg.push(parseInt(entry));
          });
        
        
        //Deudas
        var deduc = [];
        var devng = [];
        var fechas_deudas = [];
        angular.forEach($scope.saldos.t_endeudamiento,function(value){
          deduc.push(value.deduc);
          devng.push(value.devng);
          fechas_deudas.push(value.fpend);
        });  
        
        $scope.deducciones = [];
        deduc.forEach(function(deuda) {
            $scope.deducciones.push(parseInt(deuda));
        });
        
        $scope.ingresos = [];
        devng.forEach(function(ingresos) {
            $scope.ingresos.push(parseInt(ingresos));
        });
      
              $(function () {
      
                  Highcharts.setOptions({
                      global : {
                          useUTC : true
                      }
                  });
         
   
          
              });// /CHART
      
          
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
      
       
    
      $scope.common = {};
    
      $scope.edit_profile = function(){
        $location.path('/edit');
      };


      **/
  });
  
}());
