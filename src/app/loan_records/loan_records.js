(function(){
	'use strict';
  
	angular.module('loan_records', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.loan_records', {
			url 				: '/loan_records',
			templateUrl	: 'app/loan_records/loan_records.tpl.html',
			controller  : 'LoanRecords.ListController',
			resolve     : {}
		})
	})
	.controller('LoanRecords.ListController', ['$rootScope', '$scope', function($rootScope, $scope){

		$scope.date_filter = ''

		if($scope.user.loan_records.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}

  	$scope.getPorcentage = function(value){
  		return '% '+parseInt(value).toLocaleString();
  	}

  	$scope.getMoneyValue = function(value){
			return '$ '+parseInt(value).toLocaleString();
  	}

    var uniqueVals = [];
    $.each($scope.user.loan_records, function(i, value){
      if($.inArray(value.fpend, uniqueVals) === -1) uniqueVals.push(value.fpend);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.user.loan_records, function(i, value){
      if($.inArray(value.stext, uniqueVals) === -1) uniqueVals.push(value.stext);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());

