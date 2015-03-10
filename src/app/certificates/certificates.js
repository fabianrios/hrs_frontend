(function(){
	'use strict';
  
	angular.module('certificates', ['employee.service'])

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
				breadcrumb: "Certificado de vacaciones"
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
				breadcrumb: "Certificado de nomina"
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
	.controller('Certificates.MainController', function($scope, $http, employee, currentUser, $state){
		

		$scope.pdfUrl = 'http://backend.hrinteractive.co/carta_laboral-4/carta_laboral_2133_4.pdf';
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
			$scope.loading = false;
		}

		$scope.onProgress = function(progress) {
			console.log(progress);
			$scope.progress = progress;
			$scope.progreso = (100 / $scope.progress.total) * $scope.progress.loaded;
		}
		
		$scope.user = currentUser;
		$scope.employee = employee;

	})
	.controller('Certificates.Vacaciones.MainController', function($scope, $http, employee, currentUser, $state){
		

		$scope.pdfUrl = 'http://backend.hrinteractive.co/vacaciones-4/vacaciones-2133/vacaciones_2133_1.pdf';
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
			console.log(progress);
			$scope.progress = progress;
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
		
		$scope.user = currentUser;
		$scope.employee = employee;
		

	})
	.controller('Certificates.Nomina.MainController', function($scope, $http, employee, currentUser, $state){
		
		$scope.pdfUrl = 'http://backend.hrinteractive.co/nomina-4/nomina-2133/nomina_2133_0.pdf';
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
			$scope.loading = false;
		}

		$scope.onProgress = function(progress) {
			console.log(progress);
			$scope.progress = progress;
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
		
		$scope.user = currentUser;
		$scope.employee = employee;

	})
	.controller('Certificates.Income.MainController', function($scope, $http, employee, currentUser, $state){
		
		$scope.pdfUrl = 'http://backend.hrinteractive.co/vacaciones-4/vacaciones-2133/vacaciones_2133_1.pdf';
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
			$scope.loading = false;
		}

		$scope.onProgress = function(progress) {
			console.log(progress);
			$scope.progress = progress;
			$scope.progreso = (100 / progress.total) * progress.loaded;
		}
		
		$scope.user = currentUser;
		$scope.employee = employee;

	});
}());
