(function(){
	'use strict';
  
	angular.module('payments_deductions_records', ['payments_deductions.service', 'sort_tables.service'])
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
	/*.filter('specialTable', function() {
        return function(array, val_filter) {
            var filter = [];

            angular.forEach(array, function(dad) {
                if (dad.text){
                	if (dad.text.indexOf(val_filter) >= 0){
                		filter.push(dad);
                		//angular.forEach(array, function(son) {
                		//	if (son.detail){
                		//		if (dad.id == son.idFather){
                		//			filter.push(son);
                		//		}
                		//	}
                		//});
                	}
                }
            });
            //console.log(filter);
            //return (filter.length > 0) ? filter:array;
        }
    })*/
	.controller('PaymentsDeductionsRecords.ListController', ['$rootScope', '$scope', '$filter', 'paymentsDeductions', '$state', 'sortTables', function($rootScope, $scope, $filter, paymentsDeductions, $state, sortTables){
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
			//console.log($scope.payments_deductions[0]);
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