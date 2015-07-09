(function(){
	'use strict';
  
	angular.module('reports', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.reports', {
			url: '/reports',
			templateUrl: 'app/reports/reports.tpl.html',
			controller: 'Reports.ListController'
		})
	})
	
	.controller('Reports.ListController', function($scope, $http, $state,  currentUser){
		
		$scope.user = currentUser;
	
	})
	
}());

