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

	.controller('sessions.LoginController', function( $scope, Auth, $location, $log){
    
    var host = $location.host();
		$scope.subdomain = function(){
	    if (host.indexOf('.') < 0) {
	        return null;
			}else{
				if (host.split('.')[0] == "rcn"){
					var logo = "images/otrologo.png";
				}else{
					var logo = "images/rcn.png";
				}
		    return logo;
			}
		}
		
		$scope.logo = $scope.subdomain();
		
		$log.log(logo);
		
		
		$scope.login = function() {
            var config = {
                headers: {
                    'X-HTTP-Method-Override': 'POST'
                }
            };
            Auth.login($scope.credentials, config).then( function( user ){                
//              DEBO QUITAR ESTO 
                localStorage.setItem('user',user.email);    
                localStorage.setItem('psx',$scope.credentials.password);
//              HASTA AQUI
            });                
        };                
            
//      TAMBIEN ESTO DEBO QUITARLO
        var user_loc = localStorage.getItem('user');
        var user_psx = localStorage.getItem('psx');

        if (typeof user_loc !== 'undefined' && typeof user_psx !== 'undefined'){
            $scope.credentials = {
                email: user_loc,
                password: user_psx
            };                
            $scope.login();
        }
//      HASTA AQUI
            
	})
	.controller('sessions.EditController', function($scope, $state, $stateParams, $http, currentUser){
    
	  
		$scope.user = currentUser;
		// console.log($scope.user);
		
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
			// console.log($scope.user);
      
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
