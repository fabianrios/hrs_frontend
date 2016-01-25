(function(){
	'use strict';
  
	angular.module('certificates', ['employee.service', 'pdf'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.certificates_error', {
			url: '/error_certificate/:type',
			templateUrl: 'app/certificates/error.tpl.html',
			controller: 'Certificates.ErrorController'
		})
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
	.controller('Certificates.ErrorController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams){

	})
	.controller('Certificates.MainController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams){
		if($scope.user.company.show_certificates_labor ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		$scope.scroll              = 0;
		$scope.loading             = true;
		$scope.progress            = {};
		$scope.progreso            = 0;
		$scope.keyCertificateLabor = 0;
		$scope.keyVolante 		     = $stateParams.id.toString();
  	$scope.cartas 						 = $filter('filter')($scope.user.files, {op:'clabr'});
  	$scope.carta  						 = $filter('filter')($scope.user.files, {op:'clabr', pdf_type_ident:$scope.keyVolante});
    if (typeof $scope.carta[$scope.keyCertificateLabor] !== "undefined"){
    	$scope.no_pdf = false;
      	$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.carta[$scope.keyCertificateLabor].file.url);
    }else if(typeof $scope.cartas[$scope.keyCertificateLabor] !== "undefined"){
    	$scope.no_pdf = false;
      	$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.cartas[$scope.keyCertificateLabor].file.url);
    }else{
		$state.transitionTo('main.views.certificates_error');
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
		if (typeof $scope.vacations[$scope.keyVacation] !== "undefined"){
			$scope.no_pdf = false;
			$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.vacations[$scope.keyVacation].file.url);
		}else{
			$scope.no_pdf = true;
			$state.transitionTo('main.views.certificates_error');
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
		
		$scope.flagLabel = '';
		$scope.flag 		 = [];

		$scope.isLabel = function(key, pdfType){
			if($scope.flagLabel !== pdfType){
				$scope.flag[key] = true;
				$scope.flagLabel = pdfType;

				console.log(key+' ) '+$scope.flag[key]+' - '+pdfType);
				return true;
			}
			$scope.flag[key] = false;
			return false;
		}

		$scope.pdfUrl 	  = '';		
		$scope.scroll 	  = 0;
		$scope.loading    = true;
		$scope.progress   = {};
		$scope.progreso   = 0;
		$scope.ubicacion  = $state.current.name;
		$scope.keyVolante = parseInt($stateParams.id);

		$scope.volpago = $filter('filter')($scope.user.files_last_months, {op:'volpg'});
		
		if (typeof $scope.volpago[$scope.keyVolante] !== "undefined"){
			$scope.no_pdf = false;
			$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.volpago[$scope.keyVolante].file.url);
		}else{
			$scope.no_pdf = true;
			$state.transitionTo('main.views.certificates_error');
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

		

		$scope.pdf = $filter('filter')($scope.user.files, {op:'inret'})		
    if (typeof $scope.pdf[$scope.keyIncome] !== "undefined"){
    	$scope.no_pdf = false;
      $scope.pdfUrl = HRAPI_CONF.baseUrl($scope.pdf[$scope.keyIncome].file.url);
    }else{
    	$scope.no_pdf = true;
      $state.transitionTo('main.views.certificates_error');
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
