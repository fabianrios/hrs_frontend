(function(){
	'use strict';
  
	angular.module('licenses', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.licenses', {
			url: '/licenses',
			templateUrl: 'app/licenses/licenses.tpl.html',
			controller: 'Licenses.ListController'
		})
	})
	
	.controller('Licenses.ListController', function($scope, $http, $state,  currentUser){
		
		$scope.user = currentUser;
		console.log("$scope.user",$scope.user);
		
	})
	
}());

