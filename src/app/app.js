(function(){
  'use strict';

  angular.module('hrsReleaseApp', [

    // Plugins
    // 'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.sortable',
    'ng-token-auth',
    // 'Devise',
    'chart.js',
    'ngFileUpload',
    // 'mm.foundation',
    // Config
    'app.config',

    // Services
    'company.service',
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
    'data_master.service',
    'info.service',
    'notification.service',
    'loan.service',
    'severance.service',
    'compensatory_vacation.service',
    'personal_rotation.service',
    'historical_positions.service',
    'variance_analysis.service',
    'absences.service',
    'manager_organigram.service',
    'historical_salaries.service',
    'indebtedness_level.service',
    'enjoyed_vacation.service',
    'embargo.service',
    'extra_hour_record.service',
    'incapacity.service',
    'permission.service',
    'loan_record.service',
    'vacation_balance_record.service',
    'compensatory_vacation_record.service',
    'angular-clipboard',
    'sort_tables.service',
    'company.service',
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
    'notifications',
    'compensatory_vacations',
    'indebtedness_levels',
    'seizures', 
    'loan_records',
    'vacation_records',
    'permissions', 
    'extra_hour_records',
    'compensatory_vacation_records',
    'incapacities',
    'vacation_balance_records',
    'personal_rotation', 
    'historical_positions', 
    'absences',
    'variance_analysis', 
    'manager_organigram',
    'payments_deductions',
    'payments_deductions_records',
    'historical_salaries',
  ])

  .config(function($stateProvider, $httpProvider, $urlRouterProvider, HRAPI_CONF, AuthProvider, AuthInterceptProvider, $authProvider){ //ngS3Config, 

	
    // ngS3Config.theme = 'bootstrap2';

    $authProvider.configure({
      apiUrl:                  HRAPI_CONF.apiBaseUrl(''),
      tokenValidationPath:     '/auth/validate_token',
      signOutUrl:              '/auth/sign_out',
      emailRegistrationPath:   '/auth',
      accountUpdatePath:       '/auth',
      accountDeletePath:       '/auth',
      confirmationSuccessUrl:  window.location.href,
      passwordResetPath:       '/auth/password',
      passwordUpdatePath:      '/auth/password',
      passwordResetSuccessUrl: window.location.href,
      emailSignInPath:         '/auth/sign_in',
      storage:                 'cookies',
      forceValidateToken:      false,
      validateOnPageLoad:      true,
      proxyIf:                 function() { return false; },
      proxyUrl:                '/proxy',
      omniauthWindowType:      'sameWindow',      
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data;
      },
      handleAccountUpdateResponse: function(response) {
        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data;
      }
    });

    // Enruta a la login
    $urlRouterProvider.otherwise('/login');
  
    // Configura estados de aplicacion ui-router
    $stateProvider
    .state('main', {
      abstract: true,
      templateUrl: 'app/layouts/remain.tpl.html',
      resolve: {
          auth: function($auth) {
              return $auth.validateUser();
          }
      }
    })
    .state('main.views', {
      views: {
        topbar: {
          templateUrl: 'app/topbar/topbar.tpl.html',
          controller: 'Topbar.TopbarController as tb'
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
          controller: 'Sidebar.SidebarController'
        },
        content: {
          template: '<div ui-view=""></div>'
        }
      }
    });
  })
  .directive('messageReport', function(){
    return {
      restrict: 'E',
      scope: {
        titulo: "=",
        other: "="
      },
      templateUrl: 'app/includes/warning_report.tpl.html'
    }
  })
  .directive('messagePermission', function(){
    return {
      restrict: 'E',
      scope: {
        titulo: "="
      },
      templateUrl: 'app/includes/permission_alert.tpl.html'
    }
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
  .filter('special_capitalize',function(){
    return function (value,type){
      if (!value) return '';
      var words = value.split(" ");
      var newValue = "";
      var newWord;
      var exceptionsAcronyms = ['TI','BTL','SAP','S.A.S','S.A.','LTDA'];
      var namesNoPermited = ['del','de'];
      angular.forEach(words,function(word,iWord){
        if (exceptionsAcronyms.indexOf(word.toUpperCase()) != -1){
          newWord = word.toUpperCase()+" ";;
        }else if((word.length > 0 && word.length <= 3) && (type!="own" && namesNoPermited.indexOf(word.toLowerCase())> -1)){
          newWord = word.toLowerCase()+" ";
        }else{
          newWord = word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase()+" ";
        }
        newValue = newValue.concat(newWord);
      });
      return newValue;
    }
  })
  .constant('CONSTANT', {
    SEVERANCE_LAW_50: "01",
    SEVERANCE_PREVIOUS_REGIME: "02",
    MESSAGE_PERMISSION: "usuario no autorizado"
  })
  .run(function($filter, $http, $rootScope, $state, $window, HRAPI_CONF, $auth , $anchorScroll, $location, Company){
    $rootScope.getAppSubdomain = function(){
      var host = $location.host();
      if (host.indexOf('.') < 0) {
        return null;
      }else{
        return host.split('.')[0];
      }
    }

    $rootScope.lightenColor = function (col, amt) {
        var usePound = false;
      
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
     
        var num = parseInt(col,16);
        var r = (num >> 16) + amt;
     
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
     
        var b = ((num >> 8) & 0x00FF) + amt;
     
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
     
        var g = (num & 0x0000FF) + amt;
     
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
     
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }

    $rootScope.companyStyles = Company.show({id: $rootScope.getAppSubdomain()}, function(){
      var company_styles = $rootScope.companyStyles.company_styles;
      $rootScope.company_styles = company_styles;
      $rootScope.viewforgotpassword = company_styles.login_ldap ? false : true;
      
      /*******images*******/
      $rootScope.login_image_style  = {background: "url('"+company_styles.image_1.url+"') no-repeat 0 0", "background-size": "cover"};
      $rootScope.company_logo       = company_styles.logo;
      $rootScope.image_banner_style = {
        "background-image": "url('"+company_styles.image_2.url+"')",
        "background-position": "top center",
        "background-repeat": "no-repeat",
        "background-attachment": "fixed",
        "background-size":"100%"
      }
      /*******colors*******/
      var header        = company_styles.color_1,
      link_topbar       = company_styles.topbar_color,
      header_hover      = company_styles.color_2,
      header_title      = company_styles.color_3,
      widget_background = company_styles.widget_color,
      icons_color = company_styles.icons_color,
      //Default colors
      comments          = "#ff7e00",
      number            = "#1AB828",
      hover             = "#0A496E",
      registers         = "#1DB3FF";
      var color_default_menu     = "none";

      $rootScope.search_employee_style    = {background: header};
      $rootScope.circle_worker_style      = {border: "2px solid "+link_topbar};
      $rootScope.notifications_icon_style = {color: link_topbar};
      $rootScope.link_topbar_style        = {color: link_topbar};
      $rootScope.icons_style = {color:icons_color};
      $rootScope.icons_style_hover = [];
      $rootScope.background_icons = {background:link_topbar};
      $rootScope.widget_style             = [];
      $rootScope.widget_header_style      = [];
      $rootScope.widget_header_link_style = [];
      $rootScope.new_option = 0;
      $rootScope.picture_employee_style = {border: "3px solid "+header};
      $rootScope.photo_employee_style = {border: "1px solid "+header};

      $rootScope.picture_employee_organigram_style = {border: "2px solid "+header};
      $rootScope.circle_icon_employee_info_style = {"border-color": header,"color":icons_color};
      $rootScope.title_employee_info_style = {color: header};

      $rootScope.widgetInit = function(key){
        $rootScope.widget_style[key]             = {background: widget_background, border: "1px solid "+widget_background};
        $rootScope.widget_header_style[key]      = {background: header, color: header_title};
        $rootScope.widget_header_link_style[key] = {color: header_title};
      }
      $rootScope.widgetHover = function(state, key){
        if (state) {
          $rootScope.widget_style[key] = {background: "rgba(255,255,255,.7)", border: "1px solid "+header_title};
        }else{
          $rootScope.widget_style[key] = {background: widget_background, border: "1px solid "+widget_background};  
        }
      }
      $rootScope.widgetHeaderHover = function(state, key){
        if (state) {
          $rootScope.widget_header_style[key] = {"border-bottom": "1px solid "+header_title, background: header_hover, color: "lighten("+header_hover+",80%)"};
        } else {
          $rootScope.widget_header_style[key] = {background: header, color: header_title};
        }
      }
      $rootScope.widgetHeaderLinkHover = function(state, key){
        if (state) {
          $rootScope.widget_header_link_style[key] = {color: $rootScope.lighten(header_hover,80)};
        } else {
          $rootScope.widget_header_link_style[key] = {color: header_title};
        }
      }

      $rootScope.notificationsIconHover = function(state){
        if(state){
          $rootScope.notifications_icon_style = {color: $rootScope.lighten(link_topbar,20)};
        }else{
          $rootScope.notifications_icon_style = {color: link_topbar};
        }
      }
      //Hover menu y sidebar (Laterales)
      $rootScope.initStyleSides = function(key){
        $rootScope.icons_style_hover[key] = {color:icons_color,background:color_default_menu};
      }
      $rootScope.hoverSides = function(key,event,iconWhiteOver=false){
        if(event.type=='mouseover'){
          console.log(iconWhiteOver);
          if(iconWhiteOver == true){
            $rootScope.icons_style_hover[key] = {color:'#fff',background:header};
            console.log($rootScope.icons_style_hover[key]);
          }else{
            $rootScope.icons_style_hover[key] = {color:icons_color,background:header};
          }
        }else{
          $rootScope.icons_style_hover[key] = {color:icons_color,background:color_default_menu};
        }
      }
    });

    /////////////
    //
    //  BROADCAST  
    //
    /////////////
    $rootScope.updateNotification = function(){
      console.log("update-notifications");
      $rootScope.$broadcast('hrs:updateNotifications');
    }
	  /////////////
    //
    // END BROADCAST  
    //
    ////////////

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams){
          $rootScope.preload = true;
          $rootScope.ubicacion = toState.name;  
        });

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
          if( toState.name != "login.auth" ){
              //update number notifications
              $window.setTimeout(function() {
                $rootScope.updateNotification();
              }, 1000);
          }
          $rootScope.preload = false;
        });

    $rootScope.$on('$stateNotFound',
        function(event, unfoundState, fromState, fromParams){
            $rootScope.preload = false;
            event.preventDefault();
            $state.transitionTo('main.views.dashboard');
        });

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
            $rootScope.preload = false;
            event.preventDefault();
            if( error.reason === "unauthorized"){
                $state.transitionTo('login.auth');
            }else{
                $state.transitionTo('main.views.dashboard');
            }
        });



    $rootScope.$on('auth:login-success', function(ev, user) {
        $state.transitionTo('main.views.dashboard');
    });

    $rootScope.$on('auth:login-error', function(ev, reason) {
        $rootScope.showMessageErrorRails2(reason);
    });


    $rootScope.$on('auth:logout-success', function(ev) {
        $state.transitionTo('login.auth');
    });

    $rootScope.$on('auth:logout-error', function(ev, reason) {
        console.log(ev);
        console.log(reason);
        $state.transitionTo('login.auth');

    });

    $rootScope.$on('auth:session-expired', function(ev) {
        $state.transitionTo('login.auth');
    });


    // $rootScope.employee = {};
    // $rootScope.employee_info = {};
    
    $rootScope.logout = function(){
      $(document).foundation('tooltip','off');
      $auth.signOut();
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
    });
	  
    //toggle expand vacation box
    $rootScope.toggle = function(e){
      // console.log(e.currentTarget);
      $(e.currentTarget).toggleClass("active");
      $(".expandbanner").slideToggle();
    };
	  
    //toggle expand vacation box
    $rootScope.xtoggle = function(e){
      $(e.currentTarget).toggleClass("active");
      $(".dashboard-profile, .dashboard-profile-rcn").toggleClass("smallish");
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
        return fecha;
      }
    };

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
    };

    $rootScope.updateUrl = function( url ){
      if(url!=null){
        return HRAPI_CONF.baseUrl( url );
      }else{
        return url;
      }
    };
        
    $rootScope.checkingDate = function(date){
        var dateStr = new Date(date);
        if (!(dateStr == "Invalid Date") && !isNaN(dateStr)){
            var stringParse = $filter('date')(dateStr, "yyyy-MM-dd");
        }else{
            var stringParse = date;
        }
        return stringParse;
    };

    $rootScope.employeeFullName = function(employee){
      var name = '';
      if(angular.isObject(employee)){
        if(employee.name){
          name += ' '+employee.name;
        }
        if(employee.second_name){
          name += ' '+employee.second_name;
        }
        if(employee.lastname){
          name += ' '+employee.lastname;
        }
        if(employee.second_lastname){
          name += ' '+employee.second_lastname;
        }
      }
      return name;
    };

    $rootScope.showMasterData = function(employee){
      return employee.see_all_dm === 'true';
    }

    $rootScope.showMessageErrorRails = function(data){
      $anchorScroll("msg_alerts");
      var errores = ((typeof data.errors !== "undefined") ? data.errors : data.data.errors);
      angular.forEach(errores, function(value, index){
        angular.forEach( value, function( mensaje, id ){
          $rootScope.alerts.push({type: 'alert', msg: mensaje });
          $window.setTimeout(function() {
            $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
              $(this).remove();
              $rootScope.alerts = [];
            });
          }, 5000);
        });   
      });
    };

    $rootScope.showMessageErrorRails2 = function(data){
      if( data  ){
        $anchorScroll("msg_alerts");
        var errores = ((typeof data.errors !== "undefined") ? data.errors : data.data.errors);
        angular.forEach(errores, function(value, index){
         
            $rootScope.alerts.push({type: 'alert', msg: value });
            window.setTimeout(function() {
              $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                $(this).remove();
                $rootScope.alerts = [];
              });
            }, 5000);
      
        });
      }
    };

  });
  
}());
