(function(){
	'use strict';
	angular.module('embargoes', [])
	.config(['$stateProvider',function($stateProvider) {
		$stateProvider
		.state('main.views.embargoes', {
			url 				: '/embargoes',
			templateUrl	: 'app/embargoes/embargoes.tpl.html',
			controller  : 'Embargoes.ListController',
			resolve     : {}
		})
	}])
	.controller('Embargoes.ListController', ['$scope', function($scope){
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