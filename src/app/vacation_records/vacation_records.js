(function(){
	'use strict';
  
	angular.module('vacation_records', ['ui.date', 'enjoyed_vacation.service', 'sort_tables.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.enjoyed_vacation_records', {
			url 				: '/enjoyed_vacation_records',
			templateUrl	: 'app/vacation_records/vacation_records.tpl.html',
			controller  : 'VacationRecords.ListController',
			resolve     : {
				enjoyedVacation: function(EnjoyedVacation){
          return EnjoyedVacation.index().$promise;
        }
			}
		})
	})
	.controller('VacationRecords.ListController', ['$rootScope', '$scope', '$filter', 'enjoyedVacation', 'sortTables', function($rootScope, $scope, $filter, enjoyedVacation, sortTables){
		$scope.enjoyedVacation = enjoyedVacation.enjoyed_vacations;
		$scope.date_filter  = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['', '']);

		$scope.existsEnjoyedVacations = function(){
			return $scope.enjoyedVacation.length !== 0;
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.enjoyedVacation, {endda: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals = [];
    $.each($scope.enjoyedVacation, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.enjoyedVacation, function(i, value){
      if($.inArray(value.atext, uniqueVals) === -1) uniqueVals.push(value.atext);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

