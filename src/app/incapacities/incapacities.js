(function(){
	'use strict';
  
	angular.module('incapacities', ['ui.date', 'incapacity.service', 'sort_tables.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.incapacities', {
			url 		: '/incapacities',
			templateUrl	: 'app/incapacities/incapacities.tpl.html',
			controller  : 'Incapacities.ListController',
			resolve     : {
				incapacity: function(Incapacity){
          return Incapacity.index().$promise;
        }
			}
		})
	})
	.controller('Incapacities.ListController', ['$rootScope', '$scope', '$filter', 'incapacity', 'sortTables', function($rootScope, $scope, $filter, incapacity, sortTables){
		$scope.incapacities = incapacity.incapacities;
		$scope.begda_filter = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.sortTables 	 = sortTables;
		sortTables.setRegisters($scope.incapacities);
		sortTables.setFilters(['begda', 'text_incapacity']);

		$scope.existsIncapacities = function(){
			return $scope.incapacities.length !== 0;
		}
		
		var uniqueVals 		= [];
  	var begdas_incapacities = [];
    $.each($scope.incapacities, function(i, value){
    	value.begda_format = $filter('date')(value.begda.trim(),'dd/MM/yyyy');
  		value.endda_format = $filter('date')(value.endda.trim(),'dd/MM/yyyy');
    });
    $scope.begdas_incapacities = begdas_incapacities;
	}]);
}());