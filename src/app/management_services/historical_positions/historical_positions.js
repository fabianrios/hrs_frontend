(function(){
	'use strict';
  
	angular.module('historical_positions', ['historical_positions.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.historical_positions', {
			url 				: '/historical_positions',
			templateUrl	: 'app/management_services/historical_positions/historical_positions.tpl.html',
			controller  : 'HistoricalPositions.ListController',
			resolve     : {
				historicalPositions: function(HistoricalPositions){
          return HistoricalPositions.index().$promise;
        }
			}
		})
	})
	.controller('HistoricalPositions.ListController', ['$rootScope', '$scope', '$filter', 'historicalPositions',function($rootScope, $scope, $filter, historicalPositions){
		$scope.historical_positions = historicalPositions.historical_positions;
		$scope.warningMessage       = 'app/management_services/warning.tpl.html';
		$scope.position_filter      = parseInt($scope.historical_positions[0]);
		$scope.employeeData         = $scope.historical_positions[0]
		
		$scope.existsHistoricalPositions = function(){
  		return parseInt($scope.historical_positions.length) !== 0;
    }
    
		$scope.employeeFilter = function(){
			$scope.employeeData = $scope.historical_positions[$scope.position_filter]
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

