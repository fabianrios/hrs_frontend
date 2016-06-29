(function(){
	'use strict';
  
	angular.module('permissions', ['ui.date', 'permission.service', 'sort_tables.service', 'analytics.mixpanel'])
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
	.controller('Permissions.ListController', ['$rootScope', '$scope', '$filter', 'permission', 'sortTables', '$mixpanel', 'HRAPI_CONF', function($rootScope, $scope, $filter, permission, sortTables, $mixpanel, HRAPI_CONF){
		if (!HRAPI_CONF.isDevelopment){
			$mixpanel.track("Consultations - Permissions", {
	      "user_id": 		 $scope.user.id,
	    	"$pernr": 		 $scope.user.employee.identification,
		    "$email": 	   $scope.user.email,
		    "$date_time":  new Date(),
		    "$first_name": $scope.user.employee.name,
		    "$last_name":  $scope.user.employee.lastname,
		    "company_id":  $scope.user.company_id,
		    "app_version": 1
	    });
		}
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

