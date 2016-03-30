(function(){
	'use strict';
  
	angular.module('indebtedness_levels', ['ui.date', 'indebtedness_level.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.indebtedness_levels', {
			url 				: '/payment_details',
			templateUrl	: 'app/indebtedness_levels/indebtedness_levels.tpl.html',
			controller  : 'IndebtednessLevels.ListController',
			resolve     : {
				indebtednessLevel: function(IndebtednessLevel){
          return IndebtednessLevel.index().$promise;
        }
			}
		})
	})
	.controller('IndebtednessLevels.ListController', ['$rootScope', '$scope', '$filter', 'indebtednessLevel', function($rootScope, $scope, $filter, indebtednessLevel){
	  $scope.indebtednessLevels  = indebtednessLevel.indebtedness_levels;
		$scope.payroll_date_filter = ''
		$scope.titleReport         = 'no existen consultas';
		$scope.titleReport2        = "asociadas";
		
		$scope.existsPaimentDetails = function(){
			return $scope.indebtednessLevels.length !== 0	;
		}

  	$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.indebtednessLevels, {payroll_date: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}
  	
    var uniqueVals = [];
    $.each($scope.indebtednessLevels, function(i, value){
      var filterDate = value.payroll_date;
      if($.inArray(filterDate, uniqueVals) === -1) uniqueVals.push(filterDate);
    });
    $scope.payroll_dates = uniqueVals;

		var uniqueVals = [];
		$.each($scope.indebtednessLevels, function(i, value){
      if($.inArray(value.payroll_concept_txt, uniqueVals) === -1) uniqueVals.push(value.payroll_concept_txt);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());

