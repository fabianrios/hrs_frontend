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
    'ngFileUpload',
    //'mm.foundation',
    // Config
    'app.config',

    // Services
    'sap.service',
    'user.service',
    'organigram.service',
    'employee.service',
    'article.service',
    'vacation.service',
    'vacation_requirement.service',
    'extra_requirement.service',
    'inhability_requirement.service',
    'license_requirement.service',
    'employee_info.service',
    'info.service',
    'notification.service',
		'service_vacations.service',

    // Directives
    'ngS3upload',
    'highcharts-ng',
    'gantt',

    // Modules
    'navbar',
    'topbar',
    'sidebar',
    'profile',
    'expandbanner',
    'companies',
    'vacations',
		'service_vacations',
    'articles',
    'employee_info',
    'sessions',
    'dashboard',
    'organigram',
    'certificates',
    'severance',
    'loans',
    'managment',
    'extras',
    'inhability',
    'employees',
    'licenses',
    'reports',
    'approvals',
    'notifications'
  ])

  .config(function($stateProvider, $httpProvider, $urlRouterProvider, HRAPI_CONF, AuthProvider, AuthInterceptProvider, ngS3Config){

	
    ngS3Config.theme = 'bootstrap2';

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = angular.element('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.withCredentials = true;
    // $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  
    // Configura angular-devise
    AuthInterceptProvider.interceptAuth(true);
    AuthProvider.loginPath(HRAPI_CONF.apiBaseUrl('/users/sign_in.json'));
    AuthProvider.logoutPath(HRAPI_CONF.apiBaseUrl('/users/sign_out.json'));
    AuthProvider.registerPath(HRAPI_CONF.apiBaseUrl('/users.json'));

    // Enruta a la home
    $urlRouterProvider.otherwise('/home');
  
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
        },
        articles:  function(Article){
          return Article.index();
        },
        vac_requirements: function(Vacation_requirement){
          return Vacation_requirement.index().$promise;
        },
        extras_requirements: function(Extra_requirement){
          return Extra_requirement.index().$promise;
        },
        inhabilities_requirements: function(Inhability_requirement){
          return Inhability_requirement.index().$promise;
        },
        licenses_requirements: function(License_requirement){
          return License_requirement.index().$promise;
        },
				infos:function(Info){
					return Info.index().$promise;
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
          controller: 'Profile.ProfileController',
          resolve: {
            employees: function(Employee){
              return Employee.index();
            }
          }
        },
        expandbanner: {
          templateUrl: 'app/expandbanner/expandbanner.tpl.html',
          controller: 'Expandbanner.ExpandbannerController',
          resolve: {
            employees: function(Employee){
              return Employee.index();
            }
          }
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
  .filter('cut', function () {
    return function (value, max) {
       if (!value) return '';
       max = parseInt(max, 10);
       if (!max) return value;
       if (value.length <= max) return value;
       
       value = value.substr(0, max);
       //re-trim if we are in the middle of a word
       value = value.substr(0, Math.min(value.length, value.lastIndexOf(" ")))
       return value.toLowerCase();
    }
  })
  .run(function($http, $rootScope, $state, UserInfo, Auth, $window, HRAPI_CONF ){    
	 
    // #aca no estamos en ningun lado porque es el defaul
    // console.log("Current State:", $state.current);
    // UserInfo.currentUser().then(function(current_user){
      // no hay usuario no devuelve nada hasta que este logueado
      // console.log("Current User:", currentUser);
      // });      
      $rootScope.employee = {}
      $rootScope.employee_info = {}
	
      // Auth.currentUser().then(function(user){
        // 	console.log("user",user);
        // 	console.log(Auth._currentUser);
        // });
	
        // esta vaina me dice donde estamos y de donde venimos ademas define el rootscope de ubicacion para userlo como variable
        $rootScope.$on('$stateChangeStart', function(ev, toState, toParams, fromState){
          //se logue hay que cambiar de estado 
          // console.log("Cambiando estado:", fromState, toState);
          $rootScope.ubicacion = toState.name;
          $rootScope.locationData = toState.data;
          $rootScope.where = $rootScope.ubicacion.split('.');
          $rootScope.where = $rootScope.where[$rootScope.where.length-1];
          console.log($rootScope.ubicacion, $rootScope.where);
        });
        // Catch unauthorized requests and recover.
        $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
          // Ask user for login credentials
          // console.log("devise:unauthorized -> login.auth", event, xhr, deferred);
          $rootScope.alerts.push({type: 'alert', msg: xhr.data.error});
          window.setTimeout(function() {
            $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
              $(this).remove();
              $rootScope.alerts = [];
            });
          }, 5000);
          $state.go('login.auth');
        });

        $rootScope.$on('devise:login', function(event, currentUser) {
          // after a login, a hard refresh, a new tab
          // console.log("devise:login -> main.views.dashboard", currentUser, event);
          // $rootScope.alerts.push({type: 'success', msg: event});
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
            $rootScope.alerts.push({type: 'warning', msg: oldUser.name + " has cerrado sesión."});
            window.setTimeout(function() {
              $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                $(this).remove(); 
                $rootScope.alerts = [];
              });
            }, 5000);
            localStorage.removeItem('user');
            localStorage.removeItem('psx');
            // console.log(oldUser.email + " has cerrado sesión.");
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
	  
        //toggle expand vacation box
        $rootScope.xtoggle = function(e){
          $(e.currentTarget).toggleClass("active");
          $(".dashboard-profile").toggleClass("smallish");
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
   	 	
        //contar para datos maestros cuantos hijos tiene realmente
        $rootScope.numbers = ["null", "one-up", "two-up", "tree-up", "four-up", "five-up", "six-up", "seven-up", "eight-up"];
        $rootScope.countUp = function(){
          var size = 0;
          size = $(".icon-bar a.item").length;
          return $rootScope.numbers[size];
        };
	  
        // Find translation
        $rootScope.re_laborales = [{"spras": "S", "molga": "38", "ansvh": "01", "atx": "Ley 50."}, {"spras": "S", "molga": "38", "ansvh": "02", "atx": "Régim. Anterior"}, {"spras": "S", "molga": "38", "ansvh": "03", "atx": "Integral."}, {"spras": "S", "molga": "38", "ansvh": "04", "atx": "Aprendizaje."}, {"spras": "S", "molga": "38", "ansvh": "05", "atx": "Pensionado."}];
        $rootScope.find_job_relation = function (obj, compare){
          var len = obj.length;
          for (var i=0; i<len; i++) {
            // console.log(obj[i].bland);
            if (obj[i].ansvh == compare) {
              return obj[i].atx;
            }
          }
          return compare;
        }
		
        //alertas
        $rootScope.alerts = [];
        $rootScope.closeAlert = function(index) {
          $rootScope.alerts.splice(index, 1);
        };
        ///alertas
	  
        //modal
        $rootScope.openModal = function(modal, which) {
          $('#'+which+'-'+modal).foundation('reveal', 'open');
        };

        //format date
        $rootScope.formatDate = function( fecha ){
          if( fecha != null && typeof fecha == "string" ){
            if( fecha === '0000-00-00' ){
              return '';
            }else{
              var parts = fecha.split('-');                    
              return new Date(parts[0],parts[1]-1, parts[2]);                      
            }
          }else{
            return fecha
          }
        }

        $rootScope.stringTo = function( _type, _value ){
          if( _value != null && typeof _value == "string" ){
            switch(_type) {
                case 'NUM':
                    return parseFloat(_value, 10);
                    break;normal
                case 'DATE':
                    if( _value === '0000-00-00' ){
                      return '';
                    }else{
                      var parts = _value.split('-');                    
                      return new Date(parts[0],parts[1]-1, parts[2]);                      
                    }
                    break;
                default:
                    return _value;
            } 
          }else{
            return _value;
          }
        }

        $rootScope.updateUrl = function( url ){
          if(url!=null){
            return HRAPI_CONF.baseUrl( url );
          }else{
            return url
          }
        }

        $rootScope.showMessageErrorRails = function(data){
          angular.forEach( data.errors, function(value, index){
            angular.forEach( value, function( mensaje, id ){
              $rootScope.alerts.push({type: 'alert', msg: index + ' ' + mensaje });
              window.setTimeout(function() {
                $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                  $(this).remove();
                  $rootScope.alerts = [];
                });
              }, 5000);
            });   
          });
        }

      });
  
    }());
