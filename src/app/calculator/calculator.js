(function(){
	'use strict';
  
	angular.module('calculator', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.calculator', {
			url: '/calculator',
			templateUrl: 'app/calculator/calculator.tpl.html',
			controller: 'Calculator'
		})
	})
	.controller('Calculator',  ['$scope','$rootScope', function($scope,$rootScope){
		$scope.change = function(ubi){
			$rootScope.ubication = ubi;
		}
	}]);
}());