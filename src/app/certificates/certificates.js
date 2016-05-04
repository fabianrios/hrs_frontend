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
	.controller('Certificates.ErrorController', ['$rootScope', '$scope', '$http', '$state', '$filter', 'HRAPI_CONF', '$stateParams', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams){
		if ($stateParams.type == 'vacations'){
			$scope.msgError = "No se registra información de carta de vacaciones en el último año.";
		}else{
			$scope.msgError = "Estimado colaborador, no existen PDFs asociados";
		}
	}])
	.controller('Certificates.MainController', ['$rootScope', '$scope', '$http', '$state', '$filter', 'HRAPI_CONF', '$stateParams', 'CONSTANT', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams, CONSTANT){
		$scope.permission_alert = '';
		
		function messagePermission() {
			$scope.permission_alert = CONSTANT.MESSAGE_PERMISSION;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return !$scope.user.company.show_certificates_labor;
		}

		if(!$scope.user.company.show_certificates_labor){
			messagePermission();
		}else{
			$scope.scroll              = 0;
			$scope.loading             = true;
			$scope.progress            = {};
			$scope.progreso            = 0;
			$scope.keyCertificateLabor = 0;
			$scope.keyVolante 		     = $stateParams.id.toString();
	  	$scope.cartas 						 = $filter('filter')($scope.user.files, {op:'CLAB'});
	  	$scope.carta  						 = $filter('filter')($scope.user.files, {op:'CLAB', pdf_type_ident:$scope.keyVolante});

			if(typeof $scope.carta[$scope.keyCertificateLabor] !== "undefined"){
	    	$scope.no_pdf = false;
      	$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.carta[$scope.keyCertificateLabor].file.url);
	    }else if(typeof $scope.cartas[$scope.keyCertificateLabor] !== "undefined"){
	    	$scope.no_pdf = false;
      	$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.cartas[$scope.keyCertificateLabor].file.url);
	    }else{
				$state.transitionTo('main.views.certificates_error');
	    }
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
			$scope.progress = progress;
			$scope.progreso = Math.round((100 / $scope.progress.total) * $scope.progress.loaded);
			if($scope.progreso === 100){
				$("#progress_file").hide('highlight');
			}
		}
		/*
		var opts = {
		  lines: 13 // The number of lines to draw
		, length: 56 // The length of each line
		, width: 13 // The line thickness
		, radius: 84 // The radius of the inner circle
		, scale: 1 // Scales overall size of the spinner
		, corners: 1 // Corner roundness (0..1)
		, color: '#000' // #rgb or #rrggbb or array of colors
		, opacity: 0.25 // Opacity of the lines
		, rotate: 0 // The rotation offset
		, direction: 1 // 1: clockwise, -1: counterclockwise
		, speed: 0.8 // Rounds per second
		, trail: 60 // Afterglow percentage
		, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex: 2e9 // The z-index (defaults to 2000000000)
		, className: 'spinner' // The CSS class to assign to the spinner
		, top: '50%' // Top position relative to parent
		, left: '50%' // Left position relative to parent
		, shadow: false // Whether to render a shadow
		, hwaccel: true // Whether to use hardware acceleration
		, position: 'absolute' // Element positioning
		};
		//var target = document.getElementById('progress_file');
		var target = $("#progress_file");
		var spinner = new Spinner(opts).spin();
		target.append(spinner.el);
		*/
	}])
	.controller('Certificates.Vacaciones.MainController', ['$rootScope', '$scope', '$http', '$state', '$filter', 'HRAPI_CONF', '$stateParams', 'CONSTANT', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams, CONSTANT){
		$scope.permission_alert = '';
		
		function messagePermission() {
			$scope.permission_alert = CONSTANT.MESSAGE_PERMISSION;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return !$scope.user.company.show_certificates_vacations;
		}

		if(!$scope.user.company.show_certificates_vacations){
			messagePermission();
		}else{
			$scope.pdfUrl 			= '';
			$scope.vacations 		= [];
			$scope.keyVacation 	= parseInt($stateParams.id);
			$scope.vacations 		= $filter('filter')($scope.user.files, {op:'VCTN'});

			if (typeof $scope.vacations[$scope.keyVacation] !== "undefined"){
				$scope.no_pdf = false;
				$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.vacations[$scope.keyVacation].file.url);
			}else{
				$scope.no_pdf = true;
				$state.transitionTo('main.views.certificates_error',{
					type: "vacations"
				});
			}
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
	}])
	.controller('Certificates.Nomina.MainController', ['$rootScope', '$scope', '$http', '$state', '$filter', 'HRAPI_CONF', '$stateParams', 'CONSTANT', function($rootScope, $scope, $http,  $state, $filter, HRAPI_CONF, $stateParams, CONSTANT){
		$scope.pdfUrl 	  = '';		
		$scope.scroll 	  = 0;
		$scope.loading    = true;
		$scope.progress   = {};
		$scope.progreso   = 0;
		$scope.ubicacion  = $state.current.name;
		$scope.keyVolante = parseInt($stateParams.id);
		$scope.permission_alert = '';
		
		function messagePermission() {
			$scope.permission_alert = CONSTANT.MESSAGE_PERMISSION;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return !$scope.user.company.show_certificates_payroll;
		}

		if(!$scope.user.company.show_certificates_payroll){
			messagePermission();
		}else{
			$scope.volpago = $filter('filter')($scope.user.files_last_months, {op:'VPAG'});
			
			if (typeof $scope.volpago[$scope.keyVolante] !== "undefined"){
				$scope.no_pdf = false;
				$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.volpago[$scope.keyVolante].file.url);
			}else{
				$scope.no_pdf = true;
				$state.transitionTo('main.views.certificates_error');
			}
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
	

	}])
	.controller('Certificates.Income.MainController', ['$rootScope', '$scope', '$http', '$state', '$filter', 'HRAPI_CONF', '$stateParams', 'CONSTANT', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF, $stateParams, CONSTANT){
		$scope.scroll    = 0;
		$scope.loading   = true;
		$scope.progress  = {};
		$scope.progreso  = 0;
		$scope.keyIncome = parseInt($stateParams.id);
		$scope.permission_alert = '';
		
		function messagePermission() {
			$scope.permission_alert = CONSTANT.MESSAGE_PERMISSION;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return !$scope.user.company.show_certificates_income;
		}

		if(!$scope.user.company.show_certificates_income){
			messagePermission();
		}else{
			$scope.pdf 			 = $filter('filter')($scope.user.files, {op:'CIYR'})		

	    if (typeof $scope.pdf[$scope.keyIncome] !== "undefined"){
	    	$scope.no_pdf = false;
	      $scope.pdfUrl = HRAPI_CONF.baseUrl($scope.pdf[$scope.keyIncome].file.url);
	    }else{
	    	$scope.no_pdf = true;
	      $state.transitionTo('main.views.certificates_error');
	    }
		}

    $scope.filterVolante = function(op_type, pdf_type){
    	var types = $filter('filter')($scope.user.file_types, {ident:pdf_type, activ:op_type});
    	var name = '';
    	if(types.length >= 1){
				name = types[0].nomid;
    	}
    	return name;
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
	}]);
}());
