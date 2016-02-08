(function(){
	'use strict';
  
	angular.module('extra_hour_records', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.extra_hour_records', {
			url 				: '/extra_hour_records',
			templateUrl	: 'app/extra_hour_records/extra_hour_records.tpl.html',
			controller  : 'ExtraHourRecords.ListController',
			resolve     : {}
		})
	})
	.controller('ExtraHourRecords.ListController', ['$rootScope', '$scope', '$filter', function($rootScope, $scope, $filter){

		$scope.date_filter = ''

		if($scope.user.extra_hour_records.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.user.extra_hour_records, {fecha: value});
			return filterValue.length != 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals = [];
    $.each($scope.user.extra_hour_records, function(i, value){
      if($.inArray(value.fecha, uniqueVals) === -1) uniqueVals.push(value.fecha);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.user.extra_hour_records, function(i, value){
      if($.inArray(value.lgtxt, uniqueVals) === -1) uniqueVals.push(value.lgtxt);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

