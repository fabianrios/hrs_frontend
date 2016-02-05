(function(){
	'use strict';
  
	angular.module('secondcalculator', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.calculator2', {
			url: '/calculator',
			templateUrl: 'app/sodexo/calculator2/calculator2.tpl.html',
			controller: 'Calculator2'
		})
	})
	.controller('Calculator2',  ['$scope', function($scope ){
		
	}]);
}());