(function(){
	'use strict';
  
	angular.module('variance_analysis', ['variance_analysis.service'])
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
	.controller('VarianceAnalysis.ListController', ['$rootScope', '$scope', '$filter', 'varianceAnalysis', '$state', function($rootScope, $scope, $filter, varianceAnalysis, $state){
		$scope.variance_analysis = varianceAnalysis.variace_analysis;
		$scope.employeeData      = '';
		$scope.employee_filter   = '';
		$scope.warningMessage    = 'app/management_services/warning.tpl.html';
		$scope.permission_alert  = '';

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

