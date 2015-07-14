(function(){
	'use strict';
  
	angular.module('sessions', ['sap.service', 'user.service'])

	.config(function($stateProvider){
		$stateProvider
		.state('login', {
			abstract: true,
			templateUrl: 'app/layouts/login.tpl.html'
		})
		.state('login.auth', {
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

	.controller('sessions.LoginController', function($scope, Auth){

		$scope.login = function() { //login
			Auth.login($scope.credentials).then(function(user) {
				// inicializacion de algun tipo 
				// vamos a poner las credenciales en localstorage
			   // console.log(user, $scope.credentials)
			   localStorage.setItem('user',user.email);
   			   localStorage.setItem('psx',$scope.credentials.password);
			}, function(error) {
				console.log("sessions.LoginController: error en la autenticacion")
			});
		};
	  
		//$scope.login();
		var user_loc = localStorage.getItem('user');
		var user_psx = localStorage.getItem('psx');
		
		if (typeof user_loc !== 'undefined' && typeof user_psx !== 'undefined'){
			$scope.credentials = {
				email: user_loc,
				password: user_psx
			};
			// console.log("existe el user y la contraseña",$scope.credentials);
			$scope.login();
		}
     
	})

	.controller('sessions.EditController', function($scope, $state, $stateParams, $http, currentUser){
    
	
		$scope.user = currentUser;
		console.log($scope.user);
		
		// Hmm esto no tiene cara de ir aca ...
		$scope.$on('s3upload:success', function (evt, xhr, fileUrl) {
			$http({method: 'PUT', 
			url: 'http://hdvbackend.hrinteractive.co/api/users/'+$scope.user.employee.user_id,
			data: { user: { pic: fileUrl.path}}
		})
		.success( function( data, status ) {
			console.log("imagen colocada", data);
		})
		.error( function( data, status ) {
			// errorService.failure( data, status, $scope);
			console.log("error", status, data.errors, $scope);
		});
	});

    
	$scope.updateUser = function() { //editar
		//console.log("$scope.user", $scope.user);
		// $scope.user.$update(function() {
			//            $location.path('/home'); // on success go back to home
			//      });
			console.log($scope.user);
      
			$http({method: 'PUT', 
			url: 'http://hdvbackend.hrinteractive.co/api/users.json',
			data: {user: {
				name: $scope.user.name,
				email: $scope.user.email,
				password: $scope.user.password,
				password_confirmation: $scope.user.password_confirmation,
				current_password: $scope.user.current_password}}})
				.success( function( data, status ) {
					// errorService.success( data, status, 'Your password has been changed', $scope);
					console.log("success",data);
					$state.go('main.views.dashboard'); //volver al home
				})
				.error( function( data, status ) {
					// errorService.failure( data, status, $scope);
					console.log("error", status, data.errors, $scope);
					// $scope.alerts.push({type: 'alert', msg: "Revisa los campos"});
				});
      
			};
     
     
     
     
		});
	}());
