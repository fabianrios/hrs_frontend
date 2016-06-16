(function(){
	'use strict';
	angular.module('seizures', ['embargo.service', 'sort_tables.service'])
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
	.controller('Seizures.ListController', ['$scope', '$filter', 'embargo', 'sortTables', function($scope, $filter, embargo, sortTables){
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
			$rowSpan = 2;
			if ($scope.embargoes.length >= 1) {
				var filterValue = $filter('filter')($scope.embargoes, {edate: value});
				$rowSpan = filterValue.length >= 1 ? filterValue.length + 1 : 0;
			}
			return $rowSpan;
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