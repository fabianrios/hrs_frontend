(function(){
	'use strict';
  
	angular.module('historical_salaries', ['historical_salaries.service', 'analytics.mixpanel'])
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
	.controller('HistoricalSalaries.ListController', ['$rootScope', '$scope', '$filter', 'historicalSalaries', '$state', '$mixpanel', 'HRAPI_CONF', function($rootScope, $scope, $filter, historicalSalaries, $state, $mixpanel, HRAPI_CONF){
		if (!HRAPI_CONF.isDevelopment){
			$mixpanel.track("Management Services - Historical Salaries", {
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
		$scope.historical_salaries = historicalSalaries.historical_salaries;
		$scope.warningMessage      = 'app/management_services/warning.tpl.html';
		$scope.permission_alert 	 = '';
		$scope.data 							 = {};

		if(angular.isObject(historicalSalaries.message)){
			$scope.permission_alert = historicalSalaries.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}else{
			$scope.data.position_filter = parseInt($scope.historical_salaries[0]);
			$scope.employeeData        	= $scope.historical_salaries[0]
		}
		
		$scope.showMessagePermission = function(){
			return angular.isObject(historicalSalaries.message);
		}

		$scope.existsHistoricalSalaries = function(){
  		return parseInt($scope.historical_salaries.length) !== 0;
    }

		$scope.employeeFilter = function(){
			$scope.employeeData = $scope.historical_salaries[$scope.data.position_filter]
		}

		$scope.rowFilter = function(value){
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

