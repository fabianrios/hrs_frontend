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
	
    .controller('Employee_info.ListController', function($scope, $state, $modal, UserService, Auth){
		
	   // Check user
   	   UserService.current_user.then(function(user) {
 		  $scope.user = user;
 		  $scope.autenticado = Auth.isAuthenticated(user)
       }, function(error) {
 		  console.log("error al optener el usuario autenticado");
 		  $location.path('/login');
       });
	   // /Check user
	   
		$scope.sortableOptions = {
			'placeholder': 'placeholder'
		};
	

    })
	
	.controller('Employee_info.LookupController', function ($scope, info) {
		$scope.employee_info = info;
		console.log("employee_info",$scope.employee_info);
	});
}());
