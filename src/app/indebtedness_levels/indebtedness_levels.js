(function(){
	'use strict';
  
	angular.module('indebtedness_levels', ['ui.date', 'indebtedness_level.service', 'sort_tables.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.indebtedness_levels', {
			url 				: '/payment_details',
			templateUrl	: 'app/indebtedness_levels/indebtedness_levels.tpl.html',
			controller  : 'IndebtednessLevels.ListController',
			resolve     : {
				indebtednessLevel: function(IndebtednessLevel){
          return IndebtednessLevel.index().$promise;
        }
			}
		})
	})
	.controller('IndebtednessLevels.ListController', ['$rootScope', '$scope', '$filter', 'indebtednessLevel', 'sortTables', '$mixpanel', 'HRAPI_CONF', function($rootScope, $scope, $filter, indebtednessLevel, sortTables, $mixpanel, HRAPI_CONF){
		if (!HRAPI_CONF.isDevelopment){
			$mixpanel.track("Consultations - Payments and Details", {
	      "user_id": 		 $scope.user.id,
	    	"$pernr": 		 $scope.user.employee.identification,
		    "$email": 	   $scope.user.email,
		    "$date_time":  new Date(),
		    "$first_name": $scope.user.employee.name,
		    "$last_name":  $scope.user.employee.lastname,
		    "company_id":  $scope.user.company_id,
		    "app_version": 1
	    });	
		}
	  $scope.indebtednessLevels  = indebtednessLevel.indebtedness_levels;
		$scope.payroll_date_filter = ''
		$scope.titleReport         = 'no existen consultas';
		$scope.titleReport2        = "asociadas";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['origin', 'payroll_concept_txt']);
		
		$scope.existsPaimentDetails = function(){
			return $scope.indebtednessLevels.length !== 0	;
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.indebtednessLevels, {payroll_date: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals 		= [];
  	var payroll_dates = [];
  	var count 				= 0;
    $.each($scope.indebtednessLevels, function(i, value){
    	var filterDate = value.payroll_date;
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
		$.each($scope.indebtednessLevels, function(i, value){
      if($.inArray(value.payroll_concept_txt, uniqueVals) === -1) uniqueVals.push(value.payroll_concept_txt);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());

