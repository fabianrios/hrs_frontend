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
	
	.controller('Employees.ListController', function($scope, $http, $state,  currentUser, Employees){
		
			$scope.user = currentUser;
			$scope.employees = Employees;
			console.log($scope.employees);
			
			$scope.putRequest = function() { //create a new employee. Issues a POST to /api/employee
				console.log($scope.employee);
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

