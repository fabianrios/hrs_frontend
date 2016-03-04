(function(){
	'use strict';
	angular.module('seizures', [])
	.config(['$stateProvider',function($stateProvider) {
		$stateProvider
		.state('main.views.seizures', {
			url 		: '/seizures',
			templateUrl	: 'app/seizures/seizures.tpl.html',
			controller  : 'Seizures.ListController',
			resolve     : {}
		})
	}])
	.controller('Seizures.ListController', ['$scope', '$filter', function($scope, $filter){
		$scope.payroll_date_filter = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";
		
		$scope.existsSeizures = function(){
			return $scope.user.embargoes.length !== 0;			
		}

		$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.user.embargoes, {fpper: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

  	var uniqueVals = [];
    $.each($scope.user.embargoes, function(i, value){
      if($.inArray(value.fpper.trim(), uniqueVals) === -1) uniqueVals.push(value.fpper.trim());
    });
    $scope.payroll_dates = uniqueVals;

		var uniqueVals = [];
		$.each($scope.user.embargoes, function(i, value){
      if($.inArray(value.desga, uniqueVals) === -1) uniqueVals.push(value.desga);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());