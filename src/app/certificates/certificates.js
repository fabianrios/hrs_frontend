(function(){
	'use strict';
  
	angular.module('certificates', ['employee.service', 'pdf'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.certificates_labor', {
			url: '/labor_certificate/:id?c',
			templateUrl: 'app/certificates/labor.tpl.html',
			controller: 'Certificates.MainController',
			data: {
				breadcrumb: "Certificado laboral"
			} 
		})
		.state('main.views.certificates_vacations', {
			url: '/vacations_certificates/:id?c',
			templateUrl: 'app/certificates/vacations.tpl.html',
			controller: 'Certificates.Vacaciones.MainController',
			data: {
				breadcrumb: "Carta de vacaciones"
			}
		})
		.state('main.views.certificates_payroll', {
			url: '/payroll_certificates/:id?c',
			templateUrl: 'app/certificates/payroll.tpl.html',
			controller: 'Certificates.Nomina.MainController',
			data: {
				breadcrumb: "Recibos de nomina"
			} 
		})
		.state('main.views.certificates_income', {
			url: '/income_certificates/:id?c',
			templateUrl: 'app/certificates/income.tpl.html',
			data: {
				breadcrumb: "Certificado de Ingresos y retenciones"
			} 
		})
	})
	.controller('Certificates.MainController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF){
		
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;


		$scope.cargarPdf = function(){
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
		}

		$scope.cargarPdf();
		
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
	.controller('Certificates.Vacaciones.MainController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF){
		
		$scope.pdfUrl = '';
		$scope.vacations = [];

		$scope.cargarPdfs = function(){
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
		}

		$scope.cargarPdfs();
		
		$scope.cambiarPdf = function(vacacion) {
			$scope.pdfUrl = '';
			$scope.selectedVac = vacacion;			
			$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.selectedVac.file.url);
			$('#pdf-modal').foundation('reveal','open');
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
	.controller('Certificates.Nomina.MainController', function($rootScope, $scope, $http,  $state, $filter, HRAPI_CONF){
		
		$scope.pdfUrl = '';		
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;
		$scope.ubicacion = $state.current.name;

		$scope.cargarPdfs = function(){
			$scope.volpago = $filter('filter')($scope.user.files, {op:'volpg'})
			console.log($scope.volpago);
			if (typeof $scope.volpago[0] !== "undefined"){
				$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.volpago[0].file.url);
			}else{
				$rootScope.alerts.push({type: 'warning', msg: "no hay un pdf asociado al usuario"});
				window.setTimeout(function() {
				  $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
				    $(this).remove(); 
				    $rootScope.alerts = [];
				  });
				}, 5000);
			}
					
		}

		$scope.cargarPdfs();
		
		$scope.cambiarPdf = function(volante) {
			$scope.pdfUrl = '';
			$scope.selectedVol = volante;			
		      if (typeof $scope.selectedVol !== "undefined"){
		        $scope.pdfUrl = HRAPI_CONF.baseUrl($scope.selectedVol.file.url);
		  			$('#pdf-modal').foundation('reveal','open');
		  			console.log($scope.pdfUrl);
		      }else{
		        $rootScope.alerts.push({type: 'warning', msg: "no hay un pdf asociado al usuario"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove(); 
		            $rootScope.alerts = [];
		          });
		        }, 5000);
		      }
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
	.controller('Certificates.Income.MainController', function($rootScope, $scope, $http, $state, $filter, HRAPI_CONF){
		
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;

		$scope.cargarPdf = function(){
			var pdf = $filter('filter')($scope.user.files, {op:'inret'})
			console.log(pdf[0]);
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
		}

		$scope.cargarPdf();

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
