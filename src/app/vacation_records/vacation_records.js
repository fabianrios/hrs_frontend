(function(){
	'use strict';
  
	angular.module('vacation_records', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.vacation_records', {
			url 				: '/vacation_records',
			templateUrl	: 'app/vacation_records/vacation_records.tpl.html',
			controller  : 'VacationRecords.ListController',
			resolve     : {}
		})
	})
	.controller('VacationRecords.ListController', ['$rootScope', '$scope', function($rootScope, $scope){

		$scope.date_filter = ''

		if($scope.user.vacation_records.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}
		/*
  	$scope.getPorcentage = function(value){
  		return '% '+parseInt(value).toLocaleString();
  	}

  	$scope.getMoneyValue = function(value){
			return '$ '+parseInt(value).toLocaleString();
  	}
	*/

    var uniqueVals = [];
    $.each($scope.user.vacation_records, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.user.vacation_records, function(i, value){
      if($.inArray(value.atext, uniqueVals) === -1) uniqueVals.push(value.atext);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

