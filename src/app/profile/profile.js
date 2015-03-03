(function(){
  'use strict';

  angular.module('profile', [])

    .controller('Profile.ProfileController', function($scope, currentUser){

		$scope.user = currentUser;
		 
    });
}());

