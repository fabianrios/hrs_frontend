(function(){
	'use strict';
  
	angular.module('compensatory_vacation_records', ['ui.date', 'compensatory_vacation_record.service', 'sort_tables.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.compensatory_vacation_records', {
			url 				: '/compensatory_vacation_records',
			templateUrl	: 'app/compensatory_vacation_records/compensatory_vacation_records.tpl.html',
			controller  : 'CompensatoryVacationRecords.ListController',
			resolve     : {
				compensatoryVacationRecord: function(CompensatoryVacationRecord){
          return CompensatoryVacationRecord.index().$promise;
        }
			}
		})
	})
	.controller('CompensatoryVacationRecords.ListController', ['$rootScope', '$scope', '$filter', 'compensatoryVacationRecord', 'sortTables', function($rootScope, $scope, $filter, compensatoryVacationRecord, sortTables){
		$scope.compensatoryVacationRecords = compensatoryVacationRecord.compensatory_vacation_records;
		$scope.date_filter  = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['begda', 'qctxt']);

		$scope.existsCompesatoryVacations = function(){
			return $scope.compensatoryVacationRecords.length !== 0;
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.compensatoryVacationRecords, {endda: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals = [];
    $.each($scope.compensatoryVacationRecords, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.compensatoryVacationRecords, function(i, value){
      if($.inArray(value.qctxt, uniqueVals) === -1) uniqueVals.push(value.qctxt);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

