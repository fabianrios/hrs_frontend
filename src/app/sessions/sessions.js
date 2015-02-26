(function(){
  'use strict';
  
  angular.module('sessions', ['sap.service', 'user.service'])

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

    .controller('sessions.LoginController', function($scope, Auth, $location, $window, $http, UserService){

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
			
	 // Catch unauthorized requests and recover.
	        $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
	            // Ask user for login credentials

	            Auth.login(credentials).then(function() {
	                // Successfully logged in.
	                // Redo the original request.
	                return $http(xhr.config);
	            }).then(function(response) {
	                // Successfully recovered from unauthorized error.
	                // Resolve the original request's promise.
	                deferred.resolve(response);
	            }, function(error) {
	                // There was an error logging in.
	                // Reject the original request's promise.
	                deferred.reject(error);
	            });
	        });

	        // Request requires authorization
	        // Will cause a `401 Unauthorized` response,
	        // that will be recovered by our listener above.
	        $http.delete('/users/1', {
	            interceptAuth: true
	        }).then(function(response) {
	            // Deleted user 1
	        }, function(error) {
	            // Something went wrong.
	        });

            $scope.$on('devise:login', function(event, currentUser) {
                // after a login, a hard refresh, a new tab
				// console.log(currentUser);
				$scope.user = currentUser;
				$scope.current = currentUser;
				$location.path('/home'); // on success go back to home
				 $window.location.reload();
				 // $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
            });

            $scope.$on('devise:new-session', function(event, currentUser) {
                // user logged in by Auth.login({...})
				// console.log(currentUser);
				$scope.user = currentUser;
				$location.path('/home'); // on success go back to home
				$window.location.reload();
				// $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
         });
		  
	     };
		 
    })
    .controller('sessions.EditController', function($scope, $state, $stateParams, $http, $location, Auth, User){
		
		
		$scope.$on('s3upload:success', function (evt, xhr, fileUrl) {
						
			$http({method: 'PUT', 
		           url: '/api/users/'+$scope.user.id,
		           data: {user: {
					   			 pic: fileUrl.path}}})
		      .success( function( data, status ) {
		        // errorService.success( data, status, 'Your password has been changed', $scope);
				console.log("imagen colocada", data);
		      })
		      .error( function( data, status ) {
		        // errorService.failure( data, status, $scope);
				console.log("error", status, data.errors, $scope);
		      });
			
		})

		
	    $scope.updateUser = function() { //editar
			//console.log("$scope.user", $scope.user);
 	        // $scope.user.$update(function() {
//  	        $location.path('/home'); // on success go back to home
// 			});
			console.log($scope.user);
			
			$http({method: 'PUT', 
		           url: '/api/users.json',
		           data: {user: {
					   			 name: $scope.user.name,
					   			 email: $scope.user.email,
		                         password: $scope.user.password,
		                         password_confirmation: $scope.user.password_confirmation,
					   			 current_password: $scope.user.current_password}}})
		      .success( function( data, status ) {
		        // errorService.success( data, status, 'Your password has been changed', $scope);
				$location.path('/home'); //volver al home
		      })
		      .error( function( data, status ) {
		        // errorService.failure( data, status, $scope);
				console.log("error", status, data.errors, $scope);
				$scope.alerts.push({type: 'alert', msg: "Revisa los campos"});
		      });
			
	     };
		 
 		//
 		// Auth.currentUser().then(function(user) {
 		// 		$scope.user_id = user.id;
 		// 				$scope.pass = user.current_password;
 		//  	            // console.log($scope.user_id); // => {id: 1, ect: '...'}
 		//
 		// 	   	     $scope.loadUser = function() { //Issues a GET request to /api/movies/:id to get a movie to update
 		// 	   		  $scope.user = User.get({ id: $scope.user.id });
 		// 	   		   // console.log($scope.user);
 		// 	   	     };
 		//
 		// 	   	     $scope.loadUser($scope.usuario); // Load a movie which can be edited on UI
 		//
 		//  	        }, function(error) {
 		//  	            // unauthenticated error
 		//  	     });
		 
		 
		 
    });
}());
