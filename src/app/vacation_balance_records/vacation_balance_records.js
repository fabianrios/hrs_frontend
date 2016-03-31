(function(){
	'use strict';
  
	angular.module('vacation_balance_records', ['ui.date', 'vacation_balance_record.service'])
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
	.controller('VacationBalanceRecords.ListController', ['$rootScope', '$scope', '$filter', 'vacationBalanceRecord', function($rootScope, $scope, $filter, vacationBalanceRecord){
		$scope.vacationBalanceRecords = vacationBalanceRecord.vacation_balance_records;
		$scope.date_filter  = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

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

    var uniqueVals = [];
    $.each($scope.vacationBalanceRecords, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.vacationBalanceRecords, function(i, value){
      if($.inArray(value.ktext, uniqueVals) === -1) uniqueVals.push(value.ktext);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

