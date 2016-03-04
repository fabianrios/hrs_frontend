(function(){
	'use strict';
  
	angular.module('vacation_records', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.enjoyed_vacation_records', {
			url 				: '/enjoyed_vacation_records',
			templateUrl	: 'app/vacation_records/vacation_records.tpl.html',
			controller  : 'VacationRecords.ListController',
			resolve     : {}
		})
	})
	.controller('VacationRecords.ListController', ['$rootScope', '$scope', '$filter', function($rootScope, $scope, $filter){
		$scope.date_filter  = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.existsEnjoyedVacations = function(){
			return $scope.user.vacation_records.length !== 0;			
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.user.vacation_records, {endda: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals = [];
    $.each($scope.user.vacation_records, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.user.vacation_records, function(i, value){
      if($.inArray(value.atext, uniqueVals) === -1) uniqueVals.push(value.atext);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

