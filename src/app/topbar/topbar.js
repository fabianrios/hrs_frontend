(function(){
  'use strict';

  angular.module('topbar', [])

    .controller('Topbar.TopbarController', function($scope, currentUser){
		
		$scope.user = currentUser;
		
		
    });
}());

