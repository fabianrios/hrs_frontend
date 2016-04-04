(function(){
	'use strict';
  
	angular.module('payments_deductions_records', ['payments_deductions.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.payments_deductions_records', {
			url 				: '/payments_deductions_records',
			templateUrl	: 'app/payments_deductions_records/payments_deductions_records.tpl.html',
			controller  : 'PaymentsDeductionsRecords.ListController',
			resolve     : {
				paymentsDeductions: function(PaymentsDeductionsRecords){
          return PaymentsDeductionsRecords.index().$promise;
        }
			}
		})
	})
	.controller('PaymentsDeductionsRecords.ListController', ['$rootScope', '$scope', '$filter', 'paymentsDeductions', '$state', function($rootScope, $scope, $filter, paymentsDeductions, $state){
		$scope.payments_deductions = paymentsDeductions.payments_and_deductions_records;
		$scope.warningMessage      = 'app/management_services/warning.tpl.html';
		$scope.permission_alert    = '';
		$scope.data								 = {};

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

		$scope.rowFilter = function(payment){
			return payment.reports.length >= 1 ? payment.reports.length + 1 : 0;
		}
	}]);
}());