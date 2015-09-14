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
			resolve: {
				employee: function(Employee, $stateParams){
					return Employee.show({id: $stateParams.id, identification: $stateParams.id, c: $stateParams.c}).$promise;
				}
			},
			data: {
				breadcrumb: "Certificado laboral"
			} 
		})
		.state('main.views.certificates_vacations', {
			url: '/vacations_certificates/:id?c',
			templateUrl: 'app/certificates/vacations.tpl.html',
			controller: 'Certificates.Vacaciones.MainController',
			resolve: {
				employee: function(Employee, $stateParams){
					return Employee.show({id: $stateParams.id, identification: $stateParams.id, c: $stateParams.c}).$promise;
				}
			},
			data: {
				breadcrumb: "Carta de vacaciones"
			}
		})
		.state('main.views.certificates_payroll', {
			url: '/payroll_certificates/:id?c',
			templateUrl: 'app/certificates/payroll.tpl.html',
			controller: 'Certificates.Nomina.MainController',
			resolve: {
				employee: function(Employee, $stateParams){
					return Employee.show({id: $stateParams.id, identification: $stateParams.id, c: $stateParams.c}).$promise;
				}
			},
			data: {
				breadcrumb: "Recibos de nomina"
			} 
		})
		.state('main.views.certificates_income', {
			url: '/income_certificates/:id?c',
			templateUrl: 'app/certificates/income.tpl.html',
			controller: 'Certificates.Income.MainController',
			resolve: {
				employee: function(Employee, $stateParams){
					return Employee.show({id: $stateParams.id, identification: $stateParams.id, c: $stateParams.c}).$promise;
				}
			},
			data: {
				breadcrumb: "Certificado de Ingresos y retenciones"
			} 
		})
	})
	.controller('Certificates.MainController', function($scope, $http, employee, currentUser, $state, $filter, HRAPI_CONF){
		

		// $scope.pdfUrl = "http://hdvbackend.hrinteractive.co/carta_laboral-"+currentUser.company_id+"/cartas_lab_"+currentUser.employee_id+"_"+currentUser.company_id+".pdf";
		$scope.user = currentUser;
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;


		$scope.cargarPdf = function(){
			var carta = $filter('filter')($scope.user.files, {op:'clabr'})
			console.log(carta[0]);
			$scope.pdfUrl = HRAPI_CONF.baseUrl(carta[0].file.url);
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
		
		// $scope.user = currentUser;
		$scope.employee = employee;

	})
	.controller('Certificates.Vacaciones.MainController', function($scope, $http, employee, currentUser, $state, $filter, HRAPI_CONF){
		
		$scope.pdfUrl = '';
		$scope.user = currentUser;
		$scope.employee = employee;
		$scope.vacations = [];

		$scope.cargarPdfs = function(){
			$scope.vacations = $filter('filter')($scope.user.files, {op:'vctns'})
			console.log($scope.vacations);
			$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.vacations[0].file.url);
		}

		$scope.cargarPdfs();
		
		$scope.cambiarPdf = function(vacacion) {
			$scope.pdfUrl = '';
			$scope.selectedVac = vacacion;
			// $scope.pdfUrl = "http://hdvbackend.hrinteractive.co/vacations-"+currentUser.company_id+"/"+currentUser.employee_id+"/Vac_"+$scope.selectedVac.begda+"_"+$scope.selectedVac.endda+"_"+currentUser.employee_id+"_"+currentUser.company_id+".pdf";
			$scope.pdfUrl = HRAPI_CONF.baseUrl(vacacion.file.url);
			$('#pdf-modal').foundation('reveal','open');
		}
		
		// $scope.pdfUrl = "http://hdvbackend.hrinteractive.co/vacations-"+currentUser.company_id+"/"+currentUser.employee_id+"/Vac_"+employee.vacations[0].begda+"_"+employee.vacations[0].endda+"_"+currentUser.employee_id+"_"+currentUser.company_id+".pdf";
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
			// console.log(progress);
			$scope.progress = progress;
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
		
		

	})
	.controller('Certificates.Nomina.MainController', function($scope, $http, employee, currentUser, $state, $filter, HRAPI_CONF){
		
		$scope.pdfUrl = '';
		$scope.user = currentUser;
		$scope.employee = employee;
		
		// $scope.pdfUrl = "http://hdvbackend.hrinteractive.co/volantes_p-"+currentUser.company_id+"/"+currentUser.employee_id+"/Nomina_"+employee.volpago[0].begda+"_"+employee.volpago[0].endda+"_"+currentUser.employee_id+"_"+currentUser.company_id+".pdf";
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;

		$scope.cargarPdfs = function(){
			$scope.volpago = $filter('filter')($scope.user.files, {op:'volpg'})
			console.log($scope.volpago);
			$scope.pdfUrl = HRAPI_CONF.baseUrl($scope.volpago[0].file.url);
		}

		$scope.cargarPdfs();
		
		$scope.cambiarPdf = function(volante) {
			$scope.pdfUrl = '';
			$scope.selectedVol = volante;
			// $scope.pdfUrl = "http://hdvbackend.hrinteractive.co/volantes_p-"+currentUser.company_id+"/"+currentUser.employee_id+"/Nomina_"+$scope.selectedVol.begda+"_"+$scope.selectedVol.endda+"_"+currentUser.employee_id+"_"+currentUser.company_id+".pdf";
			$scope.pdfUrl = HRAPI_CONF.baseUrl(volante.file.url);
			$('#pdf-modal').foundation('reveal','open');
			console.log($scope.pdfUrl);
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
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
	

	})
	.controller('Certificates.Income.MainController', function($scope, $http, employee, currentUser, $state, $filter, HRAPI_CONF){
		
		// $scope.pdfUrl = "http://hdvbackend.hrinteractive.co/ingyret-"+currentUser.company_id+"/ingyret_"+currentUser.employee_id+"_"+currentUser.company_id+".pdf";
		$scope.user = currentUser;
		$scope.scroll = 0;
		$scope.loading = true;
		$scope.progress = {};
		$scope.progreso = 0;

		$scope.cargarPdf = function(){
			var pdf = $filter('filter')($scope.user.files, {op:'inret'})
			console.log(pdf[0]);
			$scope.pdfUrl = HRAPI_CONF.baseUrl(pdf[0].file.url);
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
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
		
		$scope.employee = employee;

	});
}());
