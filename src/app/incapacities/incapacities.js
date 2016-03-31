(function(){
	'use strict';
  
	angular.module('incapacities', ['ui.date', 'incapacity.service'])
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
	.controller('Incapacities.ListController', ['$rootScope', '$scope', '$filter', 'incapacity', function($rootScope, $scope, $filter, incapacity){
		$scope.incapacities = incapacity.incapacities;
		$scope.begda_filter = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.existsIncapacities = function(){
			return $scope.incapacities.length !== 0;
		}

		var uniqueBegdas = []
		$.each($scope.incapacities, function(i,val){
			val.begda = $filter('date')(val.begda,'dd/MM/yyyy');
			val.endda = $filter('date')(val.endda,'dd/MM/yyyy');
			if($.inArray(val.begda, uniqueBegdas) === -1) uniqueBegdas.push($filter('date')(val.begda,'dd/MM/yyyy'));
		});
		$scope.begdas_incapacities = uniqueBegdas
	}]);
}());