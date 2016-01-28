(function(){
	'use strict';
	angular.module('seizures', [])
	.config(['$stateProvider',function($stateProvider) {
		$stateProvider
		.state('main.views.seizures', {
			url 		: '/seizures',
			templateUrl	: 'app/seizures/seizures.tpl.html',
			controller  : 'Seizures.ListController',
			resolve     : {}
		})
	}])
	.controller('Seizures.ListController', ['$scope', function($scope){
		$scope.payroll_date_filter = ''

		if($scope.user.embargoes.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}

  	var uniqueVals = [];
    $.each($scope.user.embargoes, function(i, value){
      if($.inArray(value.fpper.trim(), uniqueVals) === -1) uniqueVals.push(value.fpper.trim());
    });
    $scope.payroll_dates = uniqueVals;

		var uniqueVals = [];
		$.each($scope.user.embargoes, function(i, value){
      if($.inArray(value.desga, uniqueVals) === -1) uniqueVals.push(value.desga);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());