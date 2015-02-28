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

    .controller('sessions.LoginController', function($scope, Auth, $location, $window, $http, $state, UserService){

		$scope.credentials = {
		            email: 'hola@fabianrios.co',
		            password: 'f6e02785c'
		        };
		
	    $scope.login = function() { //login
            Auth.login($scope.credentials).then(function(user) {
				$scope.user = user;
				// console.log($scope.user); // => {id: 1, ect: '...'}
				console.log("Auth.isAuthenticated:" + Auth.isAuthenticated());
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

            $scope.$on('devise:login', function(event, currentUser) {
                // after a login, a hard refresh, a new tab
				// console.log(currentUser);
				$scope.user = currentUser;
				$scope.current = currentUser;
				$location.path('/home'); // on success go back to home
				console.log('devise:login',$state);
				 $window.location.reload();
				 // $state.go("main.views.dashboard", {}, {reload: true}); //second parameter is for $stateParams
            });

            $scope.$on('devise:new-session', function(event, currentUser) {
                // user logged in by Auth.login({...})
				// console.log(currentUser);
				$scope.user = currentUser;
				$location.path('/home'); // on success go back to home
				$window.location.reload();
				$scope.autenticado = Auth.isAuthenticated(user);
				// $state.go("main.views.dashboard", {}, {reload: true}); //second parameter is for $stateParams
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
		 
		 
    });
}());
