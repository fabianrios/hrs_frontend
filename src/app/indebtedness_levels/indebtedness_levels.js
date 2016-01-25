(function(){
	'use strict';
  
	angular.module('indebtedness_levels', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.indebtedness_levels', {
			url 				: '/indebtedness_levels',
			templateUrl	: 'app/indebtedness_levels/indebtedness_levels.tpl.html',
			controller  : 'IndebtednessLevels.ListController',
			resolve     : {}
		})
	})
	.controller('IndebtednessLevels.ListController', ['$rootScope', '$scope', function($rootScope, $scope){
		$scope.payroll_date_filter = ''

		if($scope.user.indebtedness_levels.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}
  	
    var uniqueVals = [];
    $.each($scope.user.indebtedness_levels, function(i, value){
      if($.inArray(value.payroll_date, uniqueVals) === -1) uniqueVals.push(value.payroll_date);
    });
    $scope.payroll_dates = uniqueVals;

		var uniqueVals = [];
		$.each($scope.user.indebtedness_levels, function(i, value){
      if($.inArray(value.payroll_concept_txt, uniqueVals) === -1) uniqueVals.push(value.payroll_concept_txt);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());

