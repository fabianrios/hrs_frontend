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


  .run(function($http, $rootScope, $state, UserInfo){
    

    console.log("Current State:", $state.current);
    UserInfo.currentUser().then(function(current_user){
      console.log("Current User:", currentUser);
    });

    $rootScope.$on('$stateChangeStart', function(ev, toState, toParams, fromState){
      console.log("Cambiando estado:", fromState, toState);
    });
    
    // Catch unauthorized requests and recover.
    $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
      // Ask user for login credentials
      console.log("devise:unauthorized -> main.views.login");
      $state.go('main.views.login');
    });

    $rootScope.$on('devise:login', function(event, currentUser) {
      // after a login, a hard refresh, a new tab
      console.log("devise:login -> main.views.dashboard", currentUser);
      $state.go('main.views.dashboard');
    });

    $rootScope.$on('devise:new-session', function(event, currentUser) {
      // user logged in by Auth.login({...})
      console.log("devise:new-session", "nothing done");
    });

    $rootScope.$on('devise:logout', function(event, oldCurrentUser) {
      $state.go('main.views.login', {"logout": true});
    });

    $rootScope.logout = function(){
      Auth.logout().then(function(oldUser) {
          console.log(oldUser.email + "you're signed out now.");
        }, function(error) {
          // An error occurred logging out.
          console.log("An error occurred logging out", error);
      });
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
    
    $scope.dateHanldler = function(date){
      var dt = new Date(date);
      dt.getTime();
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

      $scope.user = user;
      $scope.elusuario = User.get({ id: $scope.user.id });
      $scope.elusuario.$promise.then(function(items){
          $scope.employee = items.employee;
          $scope.vacation = items.vacation;
          $scope.employee_info = items.employee_info;
          $scope.saldos = items.saldos;
          console.log($scope.saldos);

          // meter las cesantias
          angular.forEach($scope.saldos.t_cesantias,function(value){
            $scope.betrg.push(value.betrg);
            $scope.fpend.push(value.fpend);
          });

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
          
                  var cesantias = new Highcharts.Chart({
                      chart:{
                          renderTo: 'cesantias',
                          margin:[15, 0, 0, 0],
                          backgroundColor:'transparent',
                    style: {
                      fontFamily: "futura-pt"
                    }
                      },
                      title:{
                          text:''
                      },
                  colors: [
                              "#1F82E9"
                              ],
                      credits:{
                          enabled:false
                      },
                      xAxis:{
                    categories: $scope.fpend.reverse(),
                          labels:{
                              enabled:false
                          }
                      },
                      yAxis:{
                          maxPadding:0,
                          minPadding:0,
                          gridLineWidth: 0,
                          endOnTick:false,
                          labels:{
                              enabled:false
                          }
                      },
                      legend:{
                          enabled:false
                      },
                    tooltip:{
                        enabled:true,
                        borderWidth: 1,
                        shadow: false,
                        useHTML: true,
                        hideDelay: 2,
                        shared: true,
                        padding: 0,
                    },
                      plotOptions:{
                          series:{
                      name: 'Saldo',
                              enableMouseTracking:true,
                              lineWidth:1,
                              shadow:false,
                      pointWidth: 20,
                      borderWidth: 0,
                              states:{
                                  hover:{
                                      lineWidth:1
                                  }
                              },
                              marker:{
                                  //enabled:false,
                                  radius:0,
                                  states:{
                                      hover:{
                                          radius:2
                                      }
                                  }
                              }
                          }
                      },
                      series: [{type:'column',
                          data: $scope.newbetrg.reverse()
                      }]

                  });

          var intcesantias = new Highcharts.Chart({
                      chart:{
                          renderTo: 'intsaldos',
                          margin:[15, 0, 0, 0],
                          backgroundColor:'transparent',
                    style: {
                      fontFamily: "futura-pt"
                    }
                      },
                      title:{
                          text:''
                      },
                  colors: [
                              "#2ED63B"
                              ],
                      credits:{
                          enabled:false
                      },
                      xAxis:{
                    categories: $scope.intfpend.reverse(),
                          labels:{
                              enabled:false
                          }
                      },
                      yAxis:{
                          maxPadding:0,
                          minPadding:0,
                          gridLineWidth: 0,
                          endOnTick:false,
                          labels:{
                              enabled:false
                          }
                      },
                      legend:{
                          enabled:false
                      },
                    tooltip:{
                        enabled:true,
                        borderWidth: 1,
                        shadow: false,
                        useHTML: true,
                        hideDelay: 2,
                        shared: true,
                        padding: 0,
                    },
                      plotOptions:{
                          series:{
                      name: 'Saldo',
                              enableMouseTracking:true,
                              lineWidth:1,
                              shadow:false,
                      pointWidth: 20,
                      borderWidth: 0,
                              states:{
                                  hover:{
                                      lineWidth:1
                                  }
                              },
                              marker:{
                                  //enabled:false,
                                  radius:0,
                                  states:{
                                      hover:{
                                          radius:2
                                      }
                                  }
                              }
                          }
                      },
                      series: [{type:'column',
                          data: $scope.intnewbetrg.reverse()
                      }]

                  });
          
          $('#endeudamiento').highcharts({
            chart: {
            backgroundColor:'rgba(255, 255, 255, 0)',
            height: 250,
            style: {
              fontFamily: "futura-pt"
            }
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
            categories: fechas_deudas.reverse()
            },
            yAxis: {
                title: {
                    text: 'Unidades en Millones'
                }
            },
            legend: {
                enabled: false
            },
            tooltip:{
                enabled:true,
                borderWidth: 1,
                shadow: false,
                useHTML: true,
                hideDelay: 2,
                shared: true,
                padding: 0,
            },
            plotOptions: {
            areaspline: {
              fillOpacity: 0.5
            },
                area: {
                    marker: {
                        radius: 6,
                lineWidth: 2,
                lineColor: '#ffffff'
                    },
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'spline',
                name: 'Ingresos',
            data: $scope.ingresos.reverse(),
            color: '#2ED63B'
            },
          {
                type: 'spline',
                name: 'Gastos',
            data: $scope.deducciones.reverse(),
            color: '#ff2211'
          }]
          });//endeudamiento
          
          
            //porcentaje
            var porcentaje = 100/($scope.saldos.totdevengos/$scope.saldos.totdeducciones);
                var loader = $('.loader').ClassyLoader({
                  percentage: porcentaje,
                  width: 150, 
                  height: 150, 
                  speed: 15, 
                  fontFamily: "futura-pt",
                  roundedLine: true,
                  diameter: 70,
                  lineColor: "#ff3b30",
                  remainingLineColor: "#2ED63B",
                  lineWidth: 10,
                  fontSize: "35px"    
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

      //toggle expand vacation box
      $scope.toggle = function(e){
        // console.log(e.currentTarget);
        $(e.currentTarget).toggleClass("active");
        $(".expandbanner").slideToggle();
      };
      
      //sort stuff icon-bar
      $scope.sorthings = function(e,data){
        // console.log(e);
        $(".icon-bar a.item").removeClass("active");
        $(e.currentTarget).toggleClass("active");
        $('.information').hide('fast');
        $("."+data).show('slow');
      };
      
      //iconos
      $scope.icons = ["icon-location","fa fa-location-arrow", "fa fa-phone", "fa fa-envelope-o"];
      **/
  });
  
}());
