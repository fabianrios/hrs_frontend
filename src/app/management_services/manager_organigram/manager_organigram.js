(function(){
	'use strict';
  
	angular.module('manager_organigram', ['manager_organigram.service'])
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
	.controller('ManagerOrganigram.ListController', ['$rootScope', '$scope', '$filter', 'managerOrganigram', function($rootScope, $scope, $filter, managerOrganigram){
		$scope.manager_organigram = managerOrganigram.manager_organigram;

		$scope.fullName = function(employee){
			return $filter('uppercase')(employee.name +' '+employee.lastname);
		}

		$scope.employees = [];
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
    console.log(uniqueVals);
    $scope.positions = uniqueVals;

    $scope.isVacant = function(employee){
    	return employee.name == 'Vacante ';
    }
	}]);
}());

