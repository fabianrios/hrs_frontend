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
		sortTables.registers = $scope.incapacities;
		sortTables.filters 	 = ['begda_filter'];

		$scope.existsIncapacities = function(){
			return $scope.incapacities.length !== 0;
		}
		/*
		var uniqueBegdas = []
		$.each($scope.incapacities, function(i,val){
			val.begda = $filter('date')(val.begda,'dd/MM/yyyy');
			val.endda = $filter('date')(val.endda,'dd/MM/yyyy');
			if($.inArray(val.begda, uniqueBegdas) === -1) uniqueBegdas.push($filter('date')(val.begda,'dd/MM/yyyy'));
		});
		$scope.begdas_incapacities = uniqueBegdas
		*/
		var uniqueVals 		= [];
  	var begdas_incapacities = [];
    $.each($scope.incapacities, function(i, value){
    	/*
    	value.begda = $filter('date')(value.begda.trim(),'dd/MM/yyyy');
			value.endda = $filter('date')(value.endda.trim(),'dd/MM/yyyy');
			*/
      if ($.inArray(value.begda, uniqueVals) === -1) {
      	//uniqueVals.push($filter('date')(val.begda,'dd/MM/yyyy'))
      	uniqueVals.push(value.begdas_incapacities);
    		begdas_incapacities[i] = {
    			value:  $filter('date')(value.begda.trim(), 'dd/MM/yyyy'),
    			origin: value.begda.trim()
    		}
      }
    });
    $scope.begdas_incapacities = begdas_incapacities;

	}]);
}());