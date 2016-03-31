(function(){
	'use strict';
  
	angular.module('loan_records', ['ui.date', 'loan_record.service'])
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
	.controller('LoanRecords.ListController', ['$rootScope', '$scope', '$filter', 'loanRecord', function($rootScope, $scope, $filter, loanRecord){
		$scope.loanRecords  = loanRecord.loan_records;
		$scope.date_filter  = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

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

    var uniqueVals = [];
    $.each($scope.loanRecords, function(i, value){
      if($.inArray(value.fpend, uniqueVals) === -1) uniqueVals.push(value.fpend);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.loanRecords, function(i, value){
      if($.inArray(value.stext, uniqueVals) === -1) uniqueVals.push(value.stext);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());

