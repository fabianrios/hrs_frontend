(function(){
	'use strict';
  
	angular.module('payments_deductions_records', ['payments_deductions.service', 'sort_tables.service', 'analytics.mixpanel'])
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
	.controller('PaymentsDeductionsRecords.ListController', ['$rootScope', '$scope', '$filter', 'paymentsDeductions', '$state', 'sortTables', '$mixpanel', 'HRAPI_CONF', function($rootScope, $scope, $filter, paymentsDeductions, $state, sortTables, $mixpanel, HRAPI_CONF){
		if (!HRAPI_CONF.isDevelopment){
			$mixpanel.track("Consultations - Income and Withholdings", {
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
		$scope.payments_deductions = paymentsDeductions.payments_and_deductions[0].payments_deductions;
		$scope.warningMessage      = 'app/management_services/warning.tpl.html';
		$scope.permission_alert    = '';
		$scope.data								 = {};

		$scope.sortTables 	 = sortTables;
		sortTables.setRegisters($scope.payments_deductions);
		sortTables.setFilters(['year_report', 'text']);

		if(angular.isObject(paymentsDeductions.message)){
			$scope.permission_alert = paymentsDeductions.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}else{
			console.log($scope.payments_deductions);
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

		$scope.rowSize = function(array){
			return array.length >= 1 ? array.length + 1:0;
		}

		$scope.totalRecords = function(payment){
			//console.log(payment[key].reports.length);
			var totalreports = 1;
			angular.forEach(payment['reports'],function(value,key){
				totalreports += value.detail_payments_deductions.length+1;
			});
			//var reports = payment.reports.length >= 1 ? payment.reports.length + 1 : 0;
			//var detail_reports = payment.reports.length >= 1 ? payment.reports.length + 1:0;
			return totalreports;
		}
			var arrayPayments = [];

			angular.forEach($scope.payments_deductions,function(array,key1){
				arrayPayments[array.year_report] = [];
				var idGroup = 1; //Id para relacionar al padre con su grupo de hijos (tabla multiple)
				angular.forEach(array.reports,function(son1,key2){
					arrayPayments[array.year_report].push({ text:son1.text,length:son1.detail_payments_deductions.length + 1,id:idGroup});
					angular.forEach(son1.detail_payments_deductions,function(value3,key3){
						arrayPayments[array.year_report].push({ detail:value3.description_payroll,length:1,value:value3.amount,idFather:idGroup });
					});
					idGroup += 1;
				});
			});
			$scope.details_payments_deductions = arrayPayments;		

	}]);
}());