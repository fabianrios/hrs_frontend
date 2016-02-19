(function(){
	'use strict';
  
	angular.module('historical_salaries', ['historical_salaries.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.historical_salaries', {
			url 				: '/historical_salaries',
			templateUrl	: 'app/management_services/historical_salaries/historical_salaries.tpl.html',
			controller  : 'HistoricalSalaries.ListController',
			resolve     : {
				historicalSalaries: function(HistoricalSalaries){
          return HistoricalSalaries.index().$promise;
        }
			}
		})
	})
	.controller('HistoricalSalaries.ListController', ['$rootScope', '$scope', '$filter', 'historicalSalaries',function($rootScope, $scope, $filter, historicalSalaries){
		$scope.historical_salaries = historicalSalaries.historical_salaries;
		$scope.warningMessage      = 'app/management_services/warning.tpl.html';
		$scope.position_filter     = parseInt($scope.historical_salaries[0]);
		$scope.employeeData        = $scope.historical_salaries[0]

		$scope.existsHistoricalSalaries = function(){
  		return parseInt($scope.historical_salaries.length) != 0
    }

		$scope.employeeFilter = function(){
			$scope.employeeData = $scope.historical_salaries[$scope.position_filter]
		}

		$scope.rowFilter = function(value){
			console.log(value.salaries.length);
			return value.salaries.length >= 1 ? value.salaries.length + 1 : 0;
  	}

  	$scope.validateDateNow = function(date){
			var dates = date.split('-');
			if(dates[0] == 9999){
				return 'Actualidad';
			}
			return $filter('date')(date, "dd/MM/yyyy");
		}

		$scope.showDate = function(key, key2){
			return key === 0 && key2 === 0;
		}
	}]);
}());

