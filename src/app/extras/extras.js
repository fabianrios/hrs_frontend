(function(){
	'use strict';
  
	angular.module('extras', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.extras', {
			url: '/extras',
			templateUrl: 'app/extras/extras.tpl.html',
			controller: 'Extras.ListController'
		})
	})
	
	.controller('Extras.ListController', function($scope, $http, $state,  currentUser){
		
		$scope.user = currentUser;
		console.log("$scope.user",$scope.user);
		
	})
	
}());

