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

		$scope.diffDates = function(date_1, date_2){
			var dates       = date_2.split('-');
			var date1 		  = new Date(date_1);
			var date2 		  = dates[0] == 9999 ? new Date() : new Date(date_2);
			var months      = (date2.getFullYear() * 12 + date2.getMonth()) - (date1.getFullYear() * 12 + date1.getMonth());
			var years       = parseInt(months / 12);
			var restMonths  = parseInt(months - (years * 12));
			var time_string = '';

			if(years != 0){
				time_string += years;
				time_string += years > 1 ? ' años' : ' año';
			}
			if(restMonths != 0){
				time_string += time_string != '' ? ' y '+restMonths : restMonths;
				time_string += restMonths > 1 ? ' meses' : ' mes';
			}
			return time_string;
		}

		$scope.validateDateNow = function(date){
			var dates = date.split('-');
			if(dates[0] == 9999){
				return 'Actualidad';
			}
			return $filter('date')(date, "dd/MM/yyyy");
		}
		
	}]);
}());

