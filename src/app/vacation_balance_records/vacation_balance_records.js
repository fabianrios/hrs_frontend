(function(){
	'use strict';
  
	angular.module('vacation_balance_records', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.vacation_balance_records', {
			url 				: '/vacation_balance_records',
			templateUrl	: 'app/vacation_balance_records/vacation_balance_records.tpl.html',
			controller  : 'VacationBalanceRecords.ListController',
			resolve     : {}
		})
	})
	.controller('VacationBalanceRecords.ListController', ['$rootScope', '$scope', '$filter',  function($rootScope, $scope, $filter){

		$scope.date_filter = ''

		if($scope.user.vacation_balance_records.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.user.vacation_balance_records, {endda: value});
			return filterValue.length != 1 ? filterValue.length + 1 : 0;
  	}

  	$scope.remainingDays = function(vacation){
  		return vacation.anzhl - vacation.kverb;
  	}

    var uniqueVals = [];
    $.each($scope.user.vacation_balance_records, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.user.vacation_balance_records, function(i, value){
      if($.inArray(value.ktext, uniqueVals) === -1) uniqueVals.push(value.ktext);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

