(function(){
	'use strict';
  
	angular.module('variance_analysis', ['variance_analysis.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.variance_analysis', {
			url 		: '/variance_analysis',
			templateUrl	: 'app/management_services/variance_analysis/variance_analysis.tpl.html',
			controller  : 'VarianceAnalysis.ListController',
			resolve     : {
				varianceAnalysis: function(VarianceAnalysis){
          return VarianceAnalysis.index().$promise;
        }
			}
		})
	})
	.controller('VarianceAnalysis.ListController', ['$rootScope', '$scope', '$filter', 'varianceAnalysis', '$state', '$mixpanel', function($rootScope, $scope, $filter, varianceAnalysis, $state, $mixpanel){
		$mixpanel.track("Management Services - Variance Analysis", {
      "user_id": 		 $scope.user.id,
    	"$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id,
	    "app_version": 1
    });
		$scope.variance_analysis = varianceAnalysis.variace_analysis;
		$scope.employeeData      = '';
		$scope.warningMessage    = 'app/management_services/warning.tpl.html';
		$scope.permission_alert  = '';
		$scope.data 						 = {};

		if(angular.isObject(varianceAnalysis.message)){
			$scope.permission_alert = varianceAnalysis.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}
		
		$scope.showMessagePermission = function(){
			return angular.isObject(varianceAnalysis.message);
		}

		$scope.existsVarianceAnalysis = function(){
			return parseInt($scope.variance_analysis.length) !== 0;
		}

		$scope.showModal = function(variance){
			$scope.employeeData = variance;
			$('#variance_modal').foundation('reveal', 'open');
		}

		$scope.getValueFormat = function(value, format, currency){
			if(format == 'porcentage'){
				return value + ' %';
			}else if(format == 'currency'){
				return $filter('currency')(value, currency+" $", 0);
			}
		}
	}]);
}());

