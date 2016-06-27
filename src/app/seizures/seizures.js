(function(){
	'use strict';
	angular.module('seizures', ['embargo.service', 'sort_tables.service', 'analytics.mixpanel'])
	.config(['$stateProvider',function($stateProvider) {
		$stateProvider
		.state('main.views.seizures', {
			url 		: '/seizures',
			templateUrl	: 'app/seizures/seizures.tpl.html',
			controller  : 'Seizures.ListController',
			resolve     : {
				embargo: function(Embargoes){
          return Embargoes.index().$promise;
        }
			}
		})
	}])
	.controller('Seizures.ListController', ['$scope', '$filter', 'embargo', 'sortTables', '$mixpanel', function($scope, $filter, embargo, sortTables, $mixpanel){
		$mixpanel.track("Consultations - Seizures", {
      "user_id": 		 $scope.user.id,
    	"$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id
    });
		$scope.embargoes 						= embargo.embargoes;
		$scope.payroll_date_filter 	= ''
		$scope.titleReport  				= 'no existen consultas';
		$scope.titleReport2 				= "asociadas";
		
		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['payroll_date_filter', 'desga']);
		
		$scope.existsSeizures = function(){
			return $scope.embargoes.length !== 0;			
		}

		$scope.dateFilter = function(value){
			var rowSpan = 2;
			if ($scope.embargoes.length >= 1) {
				var filterValue = $filter('date')($scope.embargoes, {edate: value});
				console.log(filterValue);
				rowSpan = filterValue.length >= 1 ? filterValue.length + 1 : 0;
			}
			return rowSpan;
  		}

  	var uniqueVals 		= [];
  	var payroll_dates = [];
    $.each($scope.embargoes, function(i, value){
      if ($.inArray(value.edate.trim(), uniqueVals) === -1) {
      	uniqueVals.push(value.edate.trim());
    		payroll_dates[i] = {
    			value: $filter('date')(value.edate.trim(), 'dd/MM/yyyy'),
    			origin:value.edate.trim()
    		}
      }
    });
    $scope.payroll_dates = payroll_dates;

		var uniqueVals = [];
		$.each($scope.embargoes, function(i, value){
      if($.inArray(value.desga, uniqueVals) === -1) uniqueVals.push(value.desga);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());