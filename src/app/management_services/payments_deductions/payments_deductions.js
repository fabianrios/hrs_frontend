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
	.controller('PaymentsDeductions.ListController', ['$rootScope', '$scope', '$filter', 'paymentsDeductions',function($rootScope, $scope, $filter, paymentsDeductions){
		$scope.payments_deductions = paymentsDeductions.payments_and_deductions;
		$scope.warningMessage      = 'app/management_services/warning.tpl.html';
		$scope.position_filter     = parseInt($scope.payments_deductions[0]);
		$scope.employeeData        = $scope.payments_deductions[0]

		$scope.existsPaymentsAndDeductions = function(){
  		return parseInt($scope.payments_deductions.length) !== 0;
    }

    $scope.employeeFilter = function(){
			$scope.employeeData = $scope.payments_deductions[$scope.position_filter];
		}		

		$scope.rowFilter = function(payment){
			return payment.reports.length >= 1 ? payment.reports.length + 1 : 0;
		}
	}]);
}());