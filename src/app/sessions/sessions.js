(function(){
  'use strict';
  
  angular.module('sessions', ['sap.service'])

    .config(function($stateProvider){
      $stateProvider
        .state('main.views.login', {
          url: '/login',
          templateUrl: 'app/sessions/login.tpl.html',
          controller: 'sessions.LoginController'
        })
        .state('main.views.edit', {
          url: '/edit',
          templateUrl: 'app/sessions/edit.tpl.html',
          controller: 'sessions.EditController'
        });
    })

    .controller('sessions.LoginController', function($scope, $modal, Auth, $location, $window, UserService){

		$scope.credentials;
		
	    $scope.login = function() { //login
            Auth.login($scope.credentials).then(function(user) {
				UserService.theuser = user;
				$scope.user = UserService.theuser;
				console.log($scope.user); // => {id: 1, ect: '...'}
				console.log("Auth.isAuthenticated:" + UserService.autenticado); 
				
            }, function(error) {
                console.log("error en la autenticacion")
            });

            $scope.$on('devise:login', function(event, currentUser) {
                // after a login, a hard refresh, a new tab
				// console.log(currentUser);
				$scope.user = currentUser;
				$location.path('/home'); // on success go back to home
				 $window.location.reload();
            });

            $scope.$on('devise:new-session', function(event, currentUser) {
                // user logged in by Auth.login({...})
				// console.log(currentUser);
				$scope.user = currentUser;
				$location.path('/home'); // on success go back to home
				$window.location.reload();
         });
		  
	     };
		 
	  	// var credentials = {
	  	//              email: 'hola@fabianrios.co',
	  	//              password: 'f6e02785c'
	  	//          };
		 
    })
    .controller('sessions.EditController', function($scope, $modal, Auth){

		$scope.info;
		
	    $scope.edit = function() { //login
			// TO-DO: tengo que escribirlo
	     };
		 
		 
    });
}());
