(function(){
	'use strict';
  
	angular.module('employees', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.employees', {
			url: '/employees',
			templateUrl: 'app/employees/employees.tpl.html',
			controller: 'Employees.ListController',
			resolve: {
				Employees: function(Employee){
					return Employee.index().$promise;
				}
			}
		})
	})
	
	.controller('Employees.ListController', function($scope, $http, $state, $filter, currentUser, Employees){
		
		$scope.user = currentUser;
		$scope.employees = Employees;
		console.log($scope.employees);
			
		// $scope.employee = {
			// 	nachn: "Saavedra",
			// 	nach2: "Medina",
			// 	vorna: "Carlos",
			// 	name2: "Andres",
			// 	stras: "Calle 167D # 8 - 58 apto 1213 torre 4",
			// 	telnr: "+57 1 798 12 31",
			// 	usrid: "carlos.rios@hrsolutions-co.com",
			// 	betrg: 5000000,
			// 	icnum: "1'022.331.339",
			// 	gesch: 1
			// }
			
			$scope.disabled = false;
			
			$scope.nomina = function(id){
				if ($scope.disabled){
					$scope.disabled = false;
				}else{
					$scope.disabled = true;
				}
				console.log(id,$scope.disabled);
				$http.post('http://backend.hrinteractive.co/api/employees/nomina', {id:id}).
				success(function(data, status, headers, config) {
					console.log("success", status, data, headers);
					if (data.code != null){
						$("#"+id).show();
						$scope.alerts.push({type: 'success', msg: data.data});
					}else {
						console.log("error", status, data, headers);
						$scope.alerts.push({type: 'alert', msg: data.error});
						window.setTimeout(function() {
							$(".alert-box").fadeTo(500, 0).slideUp(500, function(){
								$(this).remove(); 
							});
						}, 5000);
					}
				}).
				error(function(data, status, headers, config) {
					$scope.alerts.push({type: 'alert', msg: data.error});
					console.log("error", status, data, headers);
				});
				
			};
			
			$scope.putRequest = function() { //create a new employee. Issues a POST to /api/employee
				
				$scope.employee.begda = $filter('date')($scope.employee.begda, "yyyy-MM-dd");
				$scope.employee.gbdat = $filter('date')($scope.employee.gbdat, "yyyy-MM-dd");
				console.log($scope.employee);
				
				$http.post('http://backend.hrinteractive.co/api/employees/employee_create', {employee:$scope.employee}).
				success(function(data, status, headers, config) {
					if (data.data != null){
						console.log("Empleado creado", data, status, headers, config);
						$scope.alerts.push({type: 'success', msg: data.data});
					}else {
						console.log("error", status, data, headers);
						$scope.alerts.push({type: 'alert', msg: data.error});
						window.setTimeout(function() {
							$(".alert-box").fadeTo(500, 0).slideUp(500, function(){
								$(this).remove(); 
							});
						}, 5000);
					}
				}).
				error(function(data, status, headers, config) {
					// $scope.alerts.push({type: 'alert', msg: data});
					console.log("error", status, data, headers);
				});
				
				
				// $http({method: 'PUT',
				// 					url: 'http://backend.hrinteractive.co/api/employees/create_employee',
				// 					data: $scope.employee
				// 				})
				// 				.success( function( data, status ) {
					// 					console.log("Empleado creado", data);
					// 				})
					// 				.error( function( data, status ) {
						// 					// errorService.failure( data, status, $scope);
						// 					$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
						// 					console.log("error", status, data.errors, $scope);
						// 				});
				
						// $scope.requerimiento.$save(function(newData) {
							// 	$scope.vac_requirements.push(newData);
							// 	$scope.requerimiento = new Vacation_requirement();
							// 	$scope.requerimiento.status = "Espera";
							// 	$scope.requerimiento.employee_id = $scope.user.employee.id;
							// 	$state.go('main.views.vacations');
							// 	$scope.alerts.push({type: 'success', msg: "La vacación a sido guardada"});
							// }, function(data) {
								// 	// console.log(data.status,data.data);
								// 	$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
								// });
							};
						})
	
					}());

