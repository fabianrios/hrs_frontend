(function(){
	'use strict';
  
	angular.module('severance', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.severance', {
			url: '/severance',
			templateUrl: 'app/severance/severance.tpl.html',
			controller: 'Severance.ListController'
		})
	})
	
	.controller('Severance.ListController', function($scope, $http, $state,  currentUser){
		
		$scope.user = currentUser;
		console.log("$scope.user",$scope.user);
		
	})
	
}());

