(function(){
	'use strict';
  
	angular.module('permissions', ['ui.date', 'permission.service', 'sort_tables.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.permissions', {
			url 		: '/permissions',
			templateUrl	: 'app/permissions/permissions.tpl.html',
			controller  : 'Permissions.ListController',
			resolve     : {
				permission: function(Permission){
          return Permission.index().$promise;
        }
			}
		})
	})
	.controller('Permissions.ListController', ['$rootScope', '$scope', '$filter', 'permission', 'sortTables', function($rootScope, $scope, $filter, permission, sortTables){
		$scope.permissions = permission.permissions;
		$scope.begda_filter = '';
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		$scope.sortTables 	 = sortTables;
		sortTables.registers = $scope.embargoes;
		sortTables.setFilters(['text_permission_filter', 'begda_filter']);

		$scope.existsPermissions = function(){
			return $scope.permissions.length !== 0;
		}

		var uniqueBegdas = []
		$.each($scope.permissions, function(i,val){
			val.begda = $filter('date')(val.begda,'dd/MM/yyyy');
			val.endda = $filter('date')(val.endda,'dd/MM/yyyy');
			if($.inArray(val.begda, uniqueBegdas) === -1) uniqueBegdas.push($filter('date')(val.begda,'dd/MM/yyyy'));
		});
		$scope.begdas_permissions = uniqueBegdas
	}]);
}());

