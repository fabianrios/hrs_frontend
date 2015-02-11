(function(){
  'use strict';

	angular.module('sidebar', ['employee.service'])
	.controller('Sidebar.SidebarController', function($scope, $modal, $state, employees){
		$scope.common = {};
		$scope.employees = employees;
	});
}());
