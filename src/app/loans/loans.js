(function(){
	'use strict';
  
	angular.module('loans', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.loans', {
			url: '/loans',
			templateUrl: 'app/loans/loans.tpl.html',
			controller: 'Loans.ListController'
		})
	})
	
	.controller('Loans.ListController', function($scope, $http, $state, currentUser ){


		// $scope.user = currentUser;
		$scope.fondo = "loans";
		//$scope.user = currentUser;
		//console.log("$scope.user",$scope.user);
		
	})
	
}());

