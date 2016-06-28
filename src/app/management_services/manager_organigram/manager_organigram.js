(function(){
	'use strict';
  
	angular.module('manager_organigram', ['manager_organigram.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.manager_organigram', {
			url 				: '/manager_organigram',
			templateUrl	: 'app/management_services/manager_organigram/manager_organigram.tpl.html',
			controller  : 'ManagerOrganigram.ListController',
			resolve     : {
				managerOrganigram: function(ManagerOrganigram){
          return ManagerOrganigram.index().$promise;
        }
			}
		})
	})
	.controller('ManagerOrganigram.ListController', ['$rootScope', '$scope', '$filter', 'managerOrganigram', '$state', '$mixpanel', function($rootScope, $scope, $filter, managerOrganigram, $state, $mixpanel){
		$mixpanel.track("Management Services - Manager Organigram", {
      "user_id": 		 $scope.user.id,
    	"$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id,
	    "app_version": 1
    });
		$scope.manager_organigram = managerOrganigram.manager_organigram;
		$scope.warningMessage     = 'app/management_services/warning.tpl.html';
		$scope.employees 					= [];
		$scope.permission_alert   = '';

		if(angular.isObject(managerOrganigram.message)){
			$scope.permission_alert = managerOrganigram.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}else{
			var uniqueVals   = [];
			$.each($scope.manager_organigram, function(i, boss){
				$scope.employees.push(boss);
				$.each(boss.subordinates, function(j, subordinate){
					$scope.employees.push(subordinate);
					if($.inArray(subordinate.position, uniqueVals) === -1) uniqueVals.push(subordinate.position);
					$.each(subordinate.subordinates, function(k, razo){
						$scope.employees.push(razo);
						if($.inArray(razo.position, uniqueVals) === -1) uniqueVals.push(razo.position);
					});		
				});
	    }); 
	    $scope.positions = uniqueVals;	
		}
		
		$scope.showMessagePermission = function(){
			return angular.isObject(managerOrganigram.message);
		}

		$scope.existsManagerOrganigram = function(){
  		return parseInt($scope.manager_organigram.length) !== 0;
    }

		$scope.fullName = function(employee){
			return $filter('uppercase')(employee.name +' '+employee.lastname);
		}

    $scope.isVacant = function(employee){
    	return employee.name == 'Vacante ';
    }
	}]);
}());

