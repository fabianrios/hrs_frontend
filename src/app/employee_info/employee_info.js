(function(){
  'use strict';
  
  angular.module('employee_info', ['employee_info.service'])

     // Add http interceptors that allows us to handle http request before it sends and http response parsing
    .config(function($stateProvider){
      $stateProvider
        .state('main.views.employee_info', {
            url: '/employee_info',
            templateUrl: 'app/employee_info/employee_info.tpl.html',
            controller: 'Employee_info.ListController'
        })
        .state('main.views.employee_info_lookup', {
            url: '/employee_info/:id/view',
            templateUrl: 'app/employee_info/employee_info_lookup.tpl.html',
            controller: 'Employee_info.LookupController',
            resolve: {
              info: function(Employee_info, $stateParams){
                return Employee_info.show({id: $stateParams.id, pernr: $stateParams.id, company_id: 4}).$promise;
              }
            }
        })
    })
	
    .controller('Employee_info.ListController', function($scope, $state, currentUser){
		
		$scope.user = currentUser;
		$scope.vacation = $scope.user.vacation;
		$scope.employee_info = $scope.user.employee_info;
		
		
		$scope.sortableOptions = {
			'placeholder': 'placeholder'
		};
	

    })
	
	.controller('Employee_info.LookupController', function ($scope, info) {
		
		$scope.employee_info = info;
		console.log("employee_info",$scope.employee_info);
		
	});
}());
