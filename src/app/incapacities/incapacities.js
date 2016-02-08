(function(){
	'use strict';
  
	angular.module('incapacities', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.incapacities', {
			url 		: '/incapacities',
			templateUrl	: 'app/incapacities/incapacities.tpl.html',
			controller  : 'Incapacities.ListController',
			resolve     : {}
		})
	})
	.controller('Incapacities.ListController', ['$rootScope', '$scope', '$filter', function($rootScope, $scope, $filter){
		$scope.begda_filter = ''

		if($scope.user.incapacities.length == 0){
			$state.transitionTo('main.views.dashboard');
  		}
  		var uniqueBegdas = []
  		$.each($scope.user.incapacities, function(i,val){
  			val.begda = $filter('date')(val.begda,'dd/MM/yyyy');
  			val.endda = $filter('date')(val.endda,'dd/MM/yyyy');
  			if($.inArray(val.begda, uniqueBegdas) === -1) uniqueBegdas.push($filter('date')(val.begda,'dd/MM/yyyy'));
  		});
  		$scope.begdas_incapacities = uniqueBegdas
	}]);
}());
