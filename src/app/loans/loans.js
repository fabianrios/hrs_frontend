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
			// resolve:{
			// 	loans: function( Loan ){
			// 		return Loan.index().$promise;
			// 	}
			// }		
		})
	})
	
	.controller('Loans.ListController', function($scope, $http, $state ){ //, Loan, loans
		// $scope.loans = loans;
		
		$scope.putRequest = function(){

		}
		
	});
	
}());

