(function(){
	'use strict';
  
	angular.module('certificates', ['employee.service', 'pdf'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.certificates_labor', {
			url: '/labor_certificate/:id',
			templateUrl: 'app/certificates/labor.tpl.html',
			controller: 'Certificates.MainController',
			data: {
				breadcrumb: function($rootScope){
					$rootScope.locationData = {
						breadcrumb : "Certificado laboral"
					};
				} 
			} 
		})
		.state('main.views.certificates_vacations', {
			url: '/vacations_certificates/:id',
			templateUrl: 'app/certificates/vacations.tpl.html',
			controller: 'Certificates.Vacaciones.MainController',
			data: {
				breadcrumb: "Carta de vacaciones"
			}
		})
		.state('main.views.certificates_payroll', {
			url: '/payroll_certificates/:id',
			templateUrl: 'app/certificates/payroll.tpl.html',
			controller: 'Certificates.Nomina.MainController',
			data: {
				breadcrumb: "Recibos de nomina"
			} 
		})
		.state('main.views.certificates_income', {
			url: '/income_certificates/:id',
			templateUrl: 'app/certificates/income.tpl.html',
			controller: 'Certificates.Income.MainController',
			data: {
				breadcrumb: "Certificado de Ingresos y retenciones"
			} 
		})
	})
	.controller('Certificates.MainController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams){

		if($scope.user.company.show_certificates_labor ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;
		$scope.keyCertificateLabor = parseInt($stateParams.id);

		
	  var carta = $filter('filter')($scope.user.files, {op:'clabr'})
	  console.log(carta[0]);
    if (typeof carta[0] !== "undefined"){
      $scope.pdfUrl = HRAPI_CONF.baseUrl(carta[0].file.url);
    }else{
      $rootScope.alerts.push({type: 'warning', msg: "no hay un pdf asociado al usuario"});
      window.setTimeout(function() {
        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove(); 
          $rootScope.alerts = [];
        });
      }, 5000);
    }


		$scope.cambiarPdf = function(keyCertificateLabor) {
			$state.transitionTo('main.views.certificates_labor', {
				id: keyCertificateLabor
			});
		}		
		
		$scope.getNavStyle = function(scroll) {
			if(scroll > 400) return 'pdf-controls fixed';
			else return 'pdf-controls';
		}

		$scope.onError = function(error) {
			console.log(error);
		}

		$scope.onLoad = function() {
			$scope.loading = false;
		}

		$scope.onProgress = function(progress) {
			// console.log(progress);
			$scope.progress = progress;
			$scope.progreso = (100 / $scope.progress.total) * $scope.progress.loaded;
		}
		

	})
	.controller('Certificates.Vacaciones.MainController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams){

		if($scope.user.company.show_certificates_vacations ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		$scope.pdfUrl = '';
		$scope.vacations = [];
		$scope.keyVacation = parseInt($stateParams.id);

		
		$scope.vacations = $filter('filter')($scope.user.files, {op:'vctns'})
		console.log($scope.vacations);
		if (typeof $scope.vacations[0] !== "undefined"){
			$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.vacations[0].file.url);
		}else{
			$rootScope.alerts.push({type: 'warning', msg: "no hay un pdf asociado al usuario"});
			window.setTimeout(function() {
			  $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			    $(this).remove(); 
			    $rootScope.alerts = [];
			  });
			}, 5000);
		}
		
		$scope.cambiarPdf = function(keyVacacion) {
			$state.transitionTo('main.views.certificates_vacations', {
				id: keyVacacion
			});
		}
				
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;

		$scope.getNavStyle = function(scroll) {
			if(scroll > 400) return 'pdf-controls fixed';
			else return 'pdf-controls';
		}

		$scope.onError = function(error) {
			console.log(error);
		}

		$scope.onLoad = function() {
			$scope.loading = false
		}

		$scope.onProgress = function(progress) {
			$scope.progress = progress;
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
		
		

	})
	.controller('Certificates.Nomina.MainController', function($rootScope, $scope, $http,  $state, $filter, HRAPI_CONF, $stateParams){
		if($scope.user.company.show_certificates_payroll ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		$scope.pdfUrl 	  = '';		
		$scope.scroll 	  = 0;
		$scope.loading    = true;
		$scope.progress   = {};
		$scope.progreso   = 0;
		$scope.ubicacion  = $state.current.name;
		$scope.keyVolante = parseInt($stateParams.id);


		$scope.volpago = $filter('filter')($scope.user.files, {op:'volpg'});
		if (typeof $scope.volpago[$scope.keyVolante] !== "undefined"){
			$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.volpago[$scope.keyVolante].file.url);
		}else{
			$rootScope.alerts.push({type: 'warning', msg: "no hay un pdf asociado al usuario"});
			window.setTimeout(function() {
			  $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			    $(this).remove(); 
			    $rootScope.alerts = [];
			  });
			}, 5000);
		}
				
		$scope.cambiarPdf = function(keyVolante) {
			$state.transitionTo('main.views.certificates_payroll', {
				id: keyVolante
			});
		}

		$scope.getNavStyle = function(scroll) {
			if(scroll > 400) return 'pdf-controls fixed';
			else return 'pdf-controls';
		}

		$scope.onError = function(error) {
			console.log(error);
		}

		$scope.onLoad = function() {
			$scope.loading = false;
		}

		$scope.onProgress = function(progress) {			
			$scope.progress = progress;
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
	

	})
	.controller('Certificates.Income.MainController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams){

		if($scope.user.company.show_certificates_income ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		$scope.scroll    = 0;
		$scope.loading   = true;
		$scope.progress  = {};
		$scope.progreso  = 0;
		$scope.keyIncome = parseInt($stateParams.id);
		

		var pdf = $filter('filter')($scope.user.files, {op:'inret'})		
    if (typeof pdf[0] !== "undefined"){
      $scope.pdfUrl = HRAPI_CONF.baseUrl(pdf[0].file.url);
    }else{
      $rootScope.alerts.push({type: 'warning', msg: "no hay un pdf asociado al usuario"});
      window.setTimeout(function() {
        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove(); 
          $rootScope.alerts = [];
        });
      }, 5000);
    }

		$scope.cambiarPdf = function(keyIncome) {
			$state.transitionTo('main.views.certificates_income', {
				id: keyIncome
			});
		}

		$scope.getNavStyle = function(scroll) {
			if(scroll > 400) return 'pdf-controls fixed';
			else return 'pdf-controls';
		}

		$scope.onError = function(error) {
			console.log(error);
		}

		$scope.onLoad = function() {
			$scope.loading = false;
		}

		$scope.onProgress = function(progress) {
			$scope.progress = progress;
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}		

	});
}());
