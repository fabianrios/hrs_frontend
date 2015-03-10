(function(){
	'use strict';
  
	angular.module('employee_info', ['employee_info.service'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.employee_info', {
			url: '/employee_info',
			templateUrl: 'app/employee_info/employee_info.tpl.html',
			controller: 'Employee_info.ListController'
		})
		.state('main.views.employee_info_lookup', {
			url: '/employee_info/:id?c/view',
			templateUrl: 'app/employee_info/employee_info_lookup.tpl.html',
			controller: 'Employee_info.LookupController',
			resolve: {
				info: function(Employee_info, $stateParams){
					return Employee_info.show({id: $stateParams.id, pernr: $stateParams.id, company_id: $stateParams.c}).$promise;
				},
				employee: function(Employee, $stateParams){
					return Employee.show({id: $stateParams.id, identification: $stateParams.id, c: $stateParams.c}).$promise;
				}
			}
		})
	})
	
	.controller('Employee_info.ListController', function($scope, $state, $rootScope,currentUser){
		
		$scope.user = currentUser;
		$scope.vacation = $scope.user.vacation;
		$rootScope.employee_info = $scope.user.employee_info;
		
		
		$scope.sortableOptions = {
			'placeholder': 'placeholder'
		};
	

	})
	
	.controller('Employee_info.LookupController', function ($scope, info, $rootScope, employee) {
		
		$rootScope.employee = employee;
		$rootScope.employee_info = info;
		console.log("employee",$scope.employee);
		
	});
}());
