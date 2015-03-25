(function(){
	'use strict';
  
	angular.module('inhability', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.inhabilities', {
			url: '/inhabilities',
			templateUrl: 'app/inhability/inhability.tpl.html',
			controller: 'Inhabilities.ListController'
		})
	})
	
	.controller('Inhabilities.ListController', function($scope, $http, $state,  currentUser){
		
		$scope.user = currentUser;
		console.log("$scope.user",$scope.user);
		
	})
	
}());

