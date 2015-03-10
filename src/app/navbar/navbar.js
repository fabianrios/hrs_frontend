(function(){
  'use strict';

  angular.module('navbar', [])

    .controller('Navbar.NavbarController', function($scope,currentUser){
		
		$scope.user = currentUser;
		
    });
}());

