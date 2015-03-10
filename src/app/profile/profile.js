(function(){
  'use strict';

  angular.module('profile', [])

    .controller('Profile.ProfileController', function($scope, $stateParams, currentUser, employees){

		$scope.user = currentUser;
		$scope.employees = employees;
		//console.log($scope.employees);
		
  
		
    });
}());

