(function(){
	'use strict';
  
	angular.module('permissions', ['ui.date'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.permissions', {
			url 		: '/permissions',
			templateUrl	: 'app/permissions/permissions.tpl.html',
			controller  : 'Permissions.ListController',
			resolve     : {}
		})
	})
	.controller('Permissions.ListController', ['$rootScope', '$scope', '$filter', function($rootScope, $scope, $filter){
		$scope.begda_filter = '';
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.existsPermissions = function(){
			return $scope.user.permissions.length !== 0;
		}

		var uniqueBegdas = []
		$.each($scope.user.permissions, function(i,val){
			val.begda = $filter('date')(val.begda,'dd/MM/yyyy');
			val.endda = $filter('date')(val.endda,'dd/MM/yyyy');
			if($.inArray(val.begda, uniqueBegdas) === -1) uniqueBegdas.push($filter('date')(val.begda,'dd/MM/yyyy'));
		});
		$scope.begdas_permissions = uniqueBegdas
	}]);
}());

