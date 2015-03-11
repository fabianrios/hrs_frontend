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
		
		$scope.estados = [{"spras": "S", "land1": "CO", "bland": "05", "bezei": "ANTIOQUIA"}, {"spras": "S", "land1": "CO", "bland": "08", "bezei": "ATLANTICO"}, {"spras": "S", "land1": "CO", "bland": "11", "bezei": "BOGOTA"}, {"spras": "S", "land1": "CO", "bland": "13", "bezei": "BOLIVAR"}, {"spras": "S", "land1": "CO", "bland": "15", "bezei": "BOYACA"}, {"spras": "S", "land1": "CO", "bland": "17", "bezei": "CALDAS"}, {"spras": "S", "land1": "CO", "bland": "18", "bezei": "CAQUETA"}, {"spras": "S", "land1": "CO", "bland": "19", "bezei": "CAUCA"}, {"spras": "S", "land1": "CO", "bland": "20", "bezei": "CESAR"}, {"spras": "S", "land1": "CO", "bland": "23", "bezei": "CORDOBA"}, {"spras": "S", "land1": "CO", "bland": "25", "bezei": "CUNDINAMARCA"}, {"spras": "S", "land1": "CO", "bland": "27", "bezei": "CHOCO"}, {"spras": "S", "land1": "CO", "bland": "41", "bezei": "HUILA"}, {"spras": "S", "land1": "CO", "bland": "44", "bezei": "LA GUAJIRA"}, {"spras": "S", "land1": "CO", "bland": "47", "bezei": "MAGDALENA"}, {"spras": "S", "land1": "CO", "bland": "50", "bezei": "META"}, {"spras": "S", "land1": "CO", "bland": "52", "bezei": "NARINO"}, {"spras": "S", "land1": "CO", "bland": "54", "bezei": "NORTE SANTANDER"}, {"spras": "S", "land1": "CO", "bland": "63", "bezei": "QUINDIO"}, {"spras": "S", "land1": "CO", "bland": "66", "bezei": "RISARALDA"}, {"spras": "S", "land1": "CO", "bland": "68", "bezei": "SANTANDER"}, {"spras": "S", "land1": "CO", "bland": "70", "bezei": "SUCRE"}, {"spras": "S", "land1": "CO", "bland": "73", "bezei": "TOLIMA"}, {"spras": "S", "land1": "CO", "bland": "76", "bezei": "VALLE"}, {"spras": "S", "land1": "CO", "bland": "81", "bezei": "ARAUCA"}, {"spras": "S", "land1": "CO", "bland": "85", "bezei": "CASANARE"}, {"spras": "S", "land1": "CO", "bland": "86", "bezei": "PUTUMAYO"}, {"spras": "S", "land1": "CO", "bland": "88", "bezei": "SAN ANDRES"}, {"spras": "S", "land1": "CO", "bland": "91", "bezei": "AMAZONAS"}, {"spras": "S", "land1": "CO", "bland": "94", "bezei": "GUAINIA"}, {"spras": "S", "land1": "CO", "bland": "95", "bezei": "GUAVIARE"}, {"spras": "S", "land1": "CO", "bland": "97", "bezei": "VAUPES"}, {"spras": "S", "land1": "CO", "bland": "99", "bezei": "VICHADA"}];
		
		$scope.find = function (obj, param){
			var len = param.length;
			for (i=0; i<len; i++) {
				console.log(param[i].obj);
				if (param[i].obj == obj) {
					return param[i];
				}
			}
			return null;
		}
		
		console.log($scope.estados);
		
		console.log("employee",$scope.employee);
		
	});
}());
