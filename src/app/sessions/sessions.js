(function(){
	'use strict';
  
	angular.module('sessions', [ 'sap.service', 'user.service'])

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


	.controller('sessions.LoginController', function( $scope, $auth, $location ){

    var host = $location.host();
		$scope.subdomain = function(){
	     if (host.indexOf('.') < 0) {
	         return null;
	     }else{
	         return host.split('.')[0];
			 }
		 };
		 
		 $scope.subdomain = $scope.subdomain();
		 
		 if ($scope.subdomain == "rcn"){
			 $scope.logo = "images/rcn.png";
		 }else if ($scope.subdomain == "harinera"){
		 	 $scope.logo = "images/otrologo.png";
		 }else{
		 	$scope.logo = "images/hrs_logo.png";
		 }
		 
		 console.log($scope.subdomain);

		$scope.login = function() {       
      $auth.submitLogin($scope.credentials);
    };
		
		
	});
	// .controller('sessions.EditController', function($scope, $state, $stateParams, $http, currentUser){
    
	
	// 	$scope.user = currentUser;
	// 	console.log($scope.user);

		
	// 	// Hmm esto no tiene cara de ir aca ...
	// 	$scope.$on('s3upload:success', function (evt, xhr, fileUrl) {
	// 		$http({method: 'PUT', 
	// 		url: 'http://hdvbackend.hrinteractive.co/api/users/'+$scope.user.employee.user_id,
	// 		data: { user: { pic: fileUrl.path}}
	// 	})
	// 	.success( function( data, status ) {
	// 		console.log("imagen colocada", data);
	// 	})
	// 	.error( function( data, status ) {
	// 		// errorService.failure( data, status, $scope);
	// 		console.log("error", status, data.errors, $scope);
	// 	});
	// });

    
	// $scope.updateUser = function() { //editar		
	// 		console.log($scope.user);
      
	// 		$http({method: 'PUT', 
	// 		url: 'http://hdvbackend.hrinteractive.co/api/users.json',
	// 		data: {user: {
	// 			name: $scope.user.name,
	// 			email: $scope.user.email,
	// 			password: $scope.user.password,
	// 			password_confirmation: $scope.user.password_confirmation,
	// 			current_password: $scope.user.current_password}}})
	// 			.success( function( data, status ) {
	// 				// errorService.success( data, status, 'Your password has been changed', $scope);
	// 				console.log("success",data);
	// 				$state.go('main.views.dashboard'); //volver al home
	// 			})
	// 			.error( function( data, status ) {
	// 				// errorService.failure( data, status, $scope);
	// 				console.log("error", status, data.errors, $scope);
	// 				// $scope.alerts.push({type: 'alert', msg: "Revisa los campos"});
	// 			});
      
	// 		};
     
	// 	});
	}());
