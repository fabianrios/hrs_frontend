(function(){
	'use strict';
	angular.module('dashboard', [])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.dashboard', {
			url: '/home',
			templateUrl: 'app/dashboard/dashboard.tpl.html'
			// controller: 'Dashboard.MainController'	
		})
	})   
	.controller('Dashboard.MainController', function($scope){///, widgets, ingresos, workers, publicaciones, employees, currentUser, articles){
    	

	});
}());
