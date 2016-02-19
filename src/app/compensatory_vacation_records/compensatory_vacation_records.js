(function(){
	'use strict';
  
	angular.module('compensatory_vacation_records', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.compensatory_vacation_records', {
			url 				: '/compensatory_vacation_records',
			templateUrl	: 'app/compensatory_vacation_records/compensatory_vacation_records.tpl.html',
			controller  : 'CompensatoryVacationRecords.ListController',
			resolve     : {}
		})
	})
	.controller('CompensatoryVacationRecords.ListController', ['$rootScope', '$scope', '$filter', function($rootScope, $scope, $filter){

		$scope.date_filter = ''

		if($scope.user.compensatory_vacation_records.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.user.compensatory_vacation_records, {endda: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals = [];
    $.each($scope.user.compensatory_vacation_records, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.user.compensatory_vacation_records, function(i, value){
      if($.inArray(value.qctxt, uniqueVals) === -1) uniqueVals.push(value.qctxt);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

