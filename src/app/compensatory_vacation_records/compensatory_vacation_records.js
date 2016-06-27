(function(){
	'use strict';
  
	angular.module('compensatory_vacation_records', ['ui.date', 'compensatory_vacation_record.service', 'sort_tables.service', 'analytics.mixpanel'])
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
	.controller('CompensatoryVacationRecords.ListController', ['$rootScope', '$scope', '$filter', 'compensatoryVacationRecord', 'sortTables', '$mixpanel', function($rootScope, $scope, $filter, compensatoryVacationRecord, sortTables, $mixpanel){
		$mixpanel.track("Consultations - Compensatory Vacations", {
      "user_id": 		 $scope.user.id,
    	"$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id
    });
		$scope.compensatoryVacationRecords = []
		$.each(compensatoryVacationRecord.compensatory_vacation_records, function(i, value){
    	var filterDate = value.begda;
  		value.begda_format = $filter('date')(filterDate, 'dd/MM/yyyy');
  		$scope.compensatoryVacationRecords[i] = value;
    });
    
		$scope.date_filter  = ''
		$scope.titleReport  = 'No se registra información de vacaciones';
		$scope.titleReport2 = "en el último año.";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['origin', 'qctxt']);

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

