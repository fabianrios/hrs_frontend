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
	.controller('Absences.ListController', ['$rootScope', '$scope', '$filter', 'absences', function($rootScope, $scope, $filter, absences){
		$scope.absences        = absences.absences;
		$scope.warningMessage  = 'app/management_services/warning.tpl.html';
		$scope.employee_filter = parseInt($scope.absences[0]);
		$scope.employeeData    = $scope.absences[0];

		$scope.employeeFilter = function(){
			$scope.employeeData = $scope.absences[$scope.employee_filter];
		}

		$scope.existsAbsences = function(){
			return parseInt($scope.absences.length) !== 0;
		}
	}]);
}());

