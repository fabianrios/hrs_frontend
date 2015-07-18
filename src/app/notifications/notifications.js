(function(){
	'use strict';
  
	angular.module('notifications', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.notifications', {
			url: '/notifications',
			templateUrl: 'app/notifications/notifications.tpl.html',
			controller: 'Notifications.ListController'			
		})
	})	
	.controller('Notifications.ListController', function($scope, $http, $state, $filter, currentUser, Notification, articles,vac_requirements, extras_requirements, inhabilities_requirements, licenses_requirements ){
		
		var update = new Notification();
		update.id = currentUser.employee.identification;																
		update.$update();

		$scope.user = currentUser;
		$scope.articles = articles.articles;
		$scope.articles_not_mine = [];
		$scope.vac_requirements = vac_requirements;
		$scope.extras_requirements = extras_requirements;
		$scope.inhabilities_requirements = inhabilities_requirements;
		$scope.licenses_requirements = licenses_requirements;
		$scope.only_not_user = [];
		$scope.extras_not_user = [];
		$scope.inhabilities_not_user = [];
		$scope.licenses_not_user = [];
		
		// sacar todos los articulos publicados que NO son mios
		angular.forEach($scope.articles, function(value, key) {
			var i = $scope.articles.indexOf(value);
			if (value.employee_id != 1){
				$scope.articles_not_mine.push(value);
			}
		});

		//vacaciones pendientes
		angular.forEach($scope.vac_requirements,function(value,index){
			if (value.employee.apply_reviewer == $scope.user.employee_id && value.status == "Espera"){
				$scope.only_not_user.push(value);
			}
		});
		
		//extras pendientes
		angular.forEach($scope.extras_requirements,function(value,index){
			if (value.employee.apply_reviewer == $scope.user.employee_id && value.status == "Espera"){
				$scope.extras_not_user.push(value);
			}
		});
		
		//inhabilidades pendientes
		angular.forEach($scope.inhabilities_requirements,function(value,index){
			if (value.employee.apply_reviewer == $scope.user.employee_id && value.status == "Espera"){
				$scope.inhabilities_not_user.push(value);
			}
		});
		
		//licencias pendientes
		angular.forEach($scope.licenses_requirements,function(value,index){
			if (value.employee.apply_reviewer == $scope.user.employee_id && value.status == "Espera"){
				$scope.licenses_not_user.push(value);
			}
		});
		

	})
}());