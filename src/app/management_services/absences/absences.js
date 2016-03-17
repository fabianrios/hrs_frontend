(function(){
	'use strict';
  
	angular.module('absences', ['absences.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.absences', {
			url 				: '/absences',
			templateUrl	: 'app/management_services/absences/absences.tpl.html',
			controller  : 'Absences.ListController',
			resolve     : {
				absences: function(Absences){
          return Absences.index().$promise;
        }
			}
		})
	})
	.controller('Absences.ListController', ['$rootScope', '$scope', '$filter', 'absences', '$state', function($rootScope, $scope, $filter, absences, $state){
		$scope.absences        = absences.absences;
		$scope.warningMessage  = 'app/management_services/warning.tpl.html';
		$scope.permission_alert  = '';

		if(angular.isObject(absences.message)){
			$scope.permission_alert = absences.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}else{
			$scope.employee_filter = parseInt($scope.absences[0]);
			$scope.employeeData    = $scope.absences[0];
		}
		
		$scope.showMessagePermission = function(){
			return angular.isObject(absences.message);
		}

		$scope.employeeFilter = function(){
			$scope.employeeData = $scope.absences[$scope.employee_filter];
		}

		$scope.existsAbsences = function(){
			return parseInt($scope.absences.length) !== 0;
		}
	}]);
}());

