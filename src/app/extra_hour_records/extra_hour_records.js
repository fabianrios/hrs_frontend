(function(){
	'use strict';
  
	angular.module('extra_hour_records', ['ui.date', 'extra_hour_record.service'])
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
	.controller('ExtraHourRecords.ListController', ['$rootScope', '$scope', '$filter', 'extraHourRecord', function($rootScope, $scope, $filter, extraHourRecord){
		$scope.extraHourRecords = extraHourRecord.extra_hours;
		$scope.date_filter      = ''
		$scope.titleReport      = 'no existen consultas';
		$scope.titleReport2     = "asociadas";

		$scope.existsExtraHours = function(){
			return $scope.extraHourRecords.length !== 0;
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.extraHourRecords, {fecha: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals = [];
    $.each($scope.extraHourRecords, function(i, value){
      if($.inArray(value.fecha, uniqueVals) === -1) uniqueVals.push(value.fecha);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.extraHourRecords, function(i, value){
      if($.inArray(value.lgtxt, uniqueVals) === -1) uniqueVals.push(value.lgtxt);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

