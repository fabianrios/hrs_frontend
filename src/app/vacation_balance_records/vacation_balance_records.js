(function(){
	'use strict';
  
	angular.module('vacation_balance_records', ['ui.date', 'vacation_balance_record.service', 'sort_tables.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.vacation_balance_records', {
			url 				: '/vacation_balance_records',
			templateUrl	: 'app/vacation_balance_records/vacation_balance_records.tpl.html',
			controller  : 'VacationBalanceRecords.ListController',
			resolve     : {
				vacationBalanceRecord: function(VacationBalanceRecord){
          return VacationBalanceRecord.index().$promise;
        }
			}
		})
	})
	.controller('VacationBalanceRecords.ListController', ['$rootScope', '$scope', '$filter', 'vacationBalanceRecord', 'sortTables', '$mixpanel', function($rootScope, $scope, $filter, vacationBalanceRecord, sortTables, $mixpanel){
		$mixpanel.track("Consultations - Balance Vacations", {
      "user_id": 		 $scope.user.id,
    	"$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id
    });
		$scope.vacationBalanceRecords = vacationBalanceRecord.vacation_balance_records;
		$scope.date_filter  = ''
		$scope.titleReport  = 'No se registra información de vacaciones';
		$scope.titleReport2 = "en el último año.";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['ktext', 'origin']);

		$scope.existsBalanceVacations = function(){
			return $scope.vacationBalanceRecords.length !== 0;			
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.vacationBalanceRecords, {endda: value});
			return filterValue.length !== 1 ? filterValue.length + 1 : 0;
  	}

  	$scope.remainingDays = function(vacation){
  		return vacation.anzhl - vacation.kverb;
  	}
  	
    var uniqueVals 		= [];
  	var payroll_dates = [];
  	var count 				= 0;
    $.each($scope.vacationBalanceRecords, function(i, value){
    	var filterDate = value.begda;
      if ($.inArray(filterDate, uniqueVals) === -1) {
      	uniqueVals.push(filterDate);

    		payroll_dates[count] = {
    			value: $filter('date')(filterDate, 'dd/MM/yyyy'),
    			origin:filterDate
    		}
    		count += 1;
      }
    });
    $scope.payroll_dates = payroll_dates;
		
		var uniqueVals = [];
		$.each($scope.vacationBalanceRecords, function(i, value){
      if($.inArray(value.ktext, uniqueVals) === -1) uniqueVals.push(value.ktext);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

