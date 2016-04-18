(function(){
	'use strict';
  
	angular.module('extra_hour_records', ['ui.date', 'extra_hour_record.service', 'sort_tables.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.extra_hour_records', {
			url 				: '/extra_hour_records',
			templateUrl	: 'app/extra_hour_records/extra_hour_records.tpl.html',
			controller  : 'ExtraHourRecords.ListController',
			resolve     : {
				extraHourRecord: function(ExtraHourRecords){
          return ExtraHourRecords.index().$promise;
        }
			}
		})
	})
	.controller('ExtraHourRecords.ListController', ['$rootScope', '$scope', '$filter', 'extraHourRecord', 'sortTables', '$state', function($rootScope, $scope, $filter, extraHourRecord, sortTables, $state){
		$scope.extraHourRecords = extraHourRecord.extra_hours;
		$scope.date_filter      = ''
		$scope.titleReport      = 'no existen consultas';
		$scope.titleReport2     = "asociadas";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.extraHourRecords;
		sortTables.filters 	 = ['date_filter', 'lgtxt'];

		$state.transitionTo('main.views.dashboard');
		
		$scope.existsExtraHours = function(){
			return $scope.extraHourRecords.length !== 0;
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.extraHourRecords, {fecha: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals 		= [];
  	var payroll_dates = [];
    $.each($scope.extraHourRecords, function(i, value){
      if ($.inArray(value.fecha.trim(), uniqueVals) === -1) {
      	uniqueVals.push(value.fecha.trim());
    		payroll_dates[i] = {
    			value: $filter('date')(value.fecha.trim(), 'dd/MM/yyyy'),
    			origin: value.fecha.trim()
    		}
      }
    });
    $scope.payroll_dates = payroll_dates;
		
		var uniqueVals = [];
		$.each($scope.extraHourRecords, function(i, value){
      if($.inArray(value.lgtxt, uniqueVals) === -1) uniqueVals.push(value.lgtxt);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

