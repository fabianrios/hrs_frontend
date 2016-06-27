(function(){
	'use strict';
  
	angular.module('loan_records', ['ui.date', 'loan_record.service', 'sort_tables.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.loan_records', {
			url 				: '/loan_records',
			templateUrl	: 'app/loan_records/loan_records.tpl.html',
			controller  : 'LoanRecords.ListController',
			resolve     : {
				loanRecord: function(LoanRecord){
          return LoanRecord.index().$promise;
        }
			}
		})
	})
	.controller('LoanRecords.ListController', ['$rootScope', '$scope', '$filter', 'loanRecord', 'sortTables', '$mixpanel', function($rootScope, $scope, $filter, loanRecord, sortTables, $mixpanel){
		$mixpanel.track("Consultations - Loans", {
      "user_id": 		 $scope.user.id,
    	"$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id
    });
		$scope.loanRecords  = loanRecord.loan_records;
		$scope.date_filter  = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['origin', 'stext']);

		$scope.existsLoanRecords = function(){
			return $scope.loanRecords.length !== 0;
		}

  	$scope.getPorcentage = function(value){
  		return '% '+parseInt(value).toLocaleString();
  	}

  	$scope.getMoneyValue = function(value){
			return '$ '+parseInt(value).toLocaleString();
  	}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.loanRecords, {fpper: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}
  	
    var uniqueVals 		= [];
  	var payroll_dates = [];
  	var count 				= 0;
    $.each($scope.loanRecords, function(i, value){
    	var filterDate = value.fpend;
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
		$.each($scope.loanRecords, function(i, value){
      if($.inArray(value.stext, uniqueVals) === -1) uniqueVals.push(value.stext);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());

