(function(){
	'use strict';
  
	angular.module('payments_deductions', ['payments_deductions.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.payments_deductions', {
			url 				: '/payments_deductions',
			templateUrl	: 'app/management_services/payments_deductions/payments_deductions.tpl.html',
			controller  : 'PaymentsDeductions.ListController',
			resolve     : {
				paymentsDeductions: function(PaymentsDeductions){
          return PaymentsDeductions.index().$promise;
        }
			}
		})
	})
	.controller('PaymentsDeductions.ListController', ['$rootScope', '$scope', '$filter', 'paymentsDeductions', '$state', function($rootScope, $scope, $filter, paymentsDeductions, $state){
		$scope.payments_deductions = paymentsDeductions.payments_and_deductions;
		$scope.warningMessage      = 'app/management_services/warning.tpl.html';
		$scope.permission_alert    = '';
		$scope.data								 = {};
		//Redireccion temporal de no ingreso
		$state.transitionTo('main.views.dashboard');
		if(angular.isObject(paymentsDeductions.message)){
			$scope.permission_alert = paymentsDeductions.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}else{
			$scope.data.position_filter = parseInt($scope.payments_deductions[0]);
			$scope.employeeData    = $scope.payments_deductions[0];
		}
		
		$scope.showMessagePermission = function(){
			return angular.isObject(paymentsDeductions.message);
		}

		$scope.existsPaymentsAndDeductions = function(){
  		return parseInt($scope.payments_deductions.length) !== 0;
    }

    $scope.employeeFilter = function(){
			$scope.employeeData = $scope.payments_deductions[$scope.data.position_filter];
		}		

		$scope.rowFilter = function(payment){
			return payment.reports.length >= 1 ? payment.reports.length + 1 : 0;
		}
	}]);
}());