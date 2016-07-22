(function(){
	'use strict';
  
	angular.module('sessions', [ 'sap.service', 'user.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('login', {
			abstract: true,
			templateUrl: 'app/layouts/login.tpl.html',
			controller: 'sessions.IndexLoginController'
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
		})
		.state('login.password_reset', {
			url 				: '/password_reset',
			templateUrl : 'app/sessions/password_reset.tpl.html',
			controller 	: 'sessions.PasswordResetController'
		})
		.state('login.password_edit', {
			url 				: '/password_edit/:token',
			templateUrl : 'app/sessions/password_edit.tpl.html',
			controller  : 'sessions.PasswordEditController'
		});
	})
	.controller('sessions.PasswordEditController', ['$scope', '$auth', 'HRAPI_CONF', '$http', '$stateParams', function ($scope, $auth, HRAPI_CONF, $http, $stateParams) {
		$scope.errors = [];

		$scope.submit = function(){
			$http.put(HRAPI_CONF.apiBaseUrl('/auth/password'), {
					'password' 							: $scope.password,
					'password_confirmation' : $scope.passwordConfirmation,
					'reset_password_token'  : $stateParams.token
			})
			.then(function(resp) {
					console.log(resp.data.data.message);
					$scope.successMessage = resp.data.data.message;
					$scope.password 						= '';
					$scope.passwordConfirmation = '';
					$("#msg_success").show('slide');
        }, function(error) {
        	$scope.errors = error.data.errors.full_messages;
      });
		}
	}])
	.controller('sessions.PasswordResetController', ['$scope', '$auth', function ($scope, $auth) {
		$scope.errors = [];
		$scope.credentials = '';
		$scope.submit = function(){
			$auth.requestPasswordReset({
			  email: $scope.credentials.login
			})
			.then(function(resp) {
				$scope.successMessage 	 = resp.data.message
        $scope.credentials.login = '';
				$("#msg_success").show('slide');
      })
      .catch(function(resp) {
    		$scope.errors = resp.data.errors;
      });
		}
	}])
	.controller('sessions.IndexLoginController', ['$scope' , '$mixpanel', function($scope, $mixpanel){
		$scope.classBackgroundImage = 'bglogin';
		$scope.subdomain = $scope.getAppSubdomain();
		$mixpanel.track("Index Page", {subdomain: $scope.subdomain});
	}])
	.controller('sessions.LoginController', ['$scope', '$auth', '$location', '$mixpanel', function($scope, $auth, $location, $mixpanel){
		$scope.credentials = {};
		$scope.login = function() {       
    	$auth.submitLogin($scope.credentials).then(function(resp) {
    		var data = {
    			"user_id": 		 resp.id,
        	"$pernr": 		 resp.employee.identification,
			    "$email": 	   resp.email,
			    "$created": 	 resp.employee.created_at,
			    "$last_login": new Date(),
			    "$first_name": resp.employee.name,
			    "$last_name":  resp.employee.lastname,
			    "company_id":  resp.company_id,
			    "app_version": 1
				};
				
        $mixpanel.identify(resp.id);
        $mixpanel.people.set(data);
				$mixpanel.track("Login", data);
      });
    };

    $scope.convertlowercase = function(){
    	if ($scope.credentials.login !== undefined) {
    		$scope.credentials.login = $scope.credentials.login.toLowerCase();	
    	}
    }
	}]);
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
