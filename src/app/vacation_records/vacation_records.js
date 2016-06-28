(function(){
	'use strict';
  
	angular.module('vacation_records', ['ui.date', 'enjoyed_vacation.service', 'sort_tables.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.enjoyed_vacation_records', {
			url 				: '/enjoyed_vacation_records',
			templateUrl	: 'app/vacation_records/vacation_records.tpl.html',
			controller  : 'VacationRecords.ListController',
			resolve     : {
				enjoyedVacation: function(EnjoyedVacation){
          return EnjoyedVacation.index().$promise;
        }
			}
		})
	})
	.controller('VacationRecords.ListController', ['$rootScope', '$scope', '$filter', 'enjoyedVacation', 'sortTables', '$mixpanel', function($rootScope, $scope, $filter, enjoyedVacation, sortTables, $mixpanel){
		$mixpanel.track("Consultations - Enjoyed Vacations", {
      "user_id": 		 $scope.user.id,
    	"$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id,
	    "app_version": 1
    });
		$scope.enjoyedVacation = [];
		$.each(enjoyedVacation.enjoyed_vacations, function(i, value){
    	var filterDate = value.begda;
  		value.begda_format = $filter('date')(filterDate, 'dd/MM/yyyy');
  		$scope.enjoyedVacation[i] = value;
    });

		$scope.date_filter  = ''
		$scope.titleReport  = 'No se registra información de vacaciones';
		$scope.titleReport2 = "en el último año.";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['atext', 'begda_format']);

		$scope.existsEnjoyedVacations = function(){
			return $scope.enjoyedVacation.length !== 0;
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.enjoyedVacation, {endda: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

    var uniqueVals = [];
    $.each($scope.enjoyedVacation, function(i, value){
      if($.inArray(value.endda, uniqueVals) === -1) uniqueVals.push(value.endda);
    });
    $scope.payroll_dates = uniqueVals;
		
		var uniqueVals = [];
		$.each($scope.enjoyedVacation, function(i, value){
      if($.inArray(value.atext, uniqueVals) === -1) uniqueVals.push(value.atext);
    });
    $scope.payroll_concepts = uniqueVals;
  
	}]);
}());

