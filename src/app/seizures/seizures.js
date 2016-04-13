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
		sortTables.filters 	 = ['payroll_date_filter', 'desga'];
		
		$scope.existsSeizures = function(){
			return $scope.embargoes.length !== 0;			
		}

		$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.embargoes, {fpper: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

  	var uniqueVals 		= [];
  	var payroll_dates = [];
    $.each($scope.embargoes, function(i, value){
      if ($.inArray(value.fpper.trim(), uniqueVals) === -1) {
      	uniqueVals.push(value.fpper.trim());
    		payroll_dates[i] = {
    			value: $filter('date')(value.fpper.trim(), 'dd/MM/yyyy'),
    			origin:value.fpper.trim()
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