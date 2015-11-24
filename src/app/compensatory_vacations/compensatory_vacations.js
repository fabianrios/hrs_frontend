(function(){
	'use strict';
  
	angular.module('compensatory_vacations', ['compensatory_vacation.service'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.compensatory_vacations', {
			url: '/compensatory_vacations',
			templateUrl: 'app/compensatory_vacations/compensatory_vacations.tpl.html',
			controller: 'Compensatory_vacations.ListController',
			resolve: {
				compensatory_vac: function(Compensatory_vacation){
					return Compensatory_vacation.index().$promise;
				}
			}
		})
	})
	
	.controller('Compensatory_vacations.ListController', function($rootScope, $scope, $http, $state, Upload, HRAPI_CONF, compensatory_vac){

		if($scope.user.company.show_vacations_c ===  false){
			$state.transitionTo('main.views.dashboard');
		}
    
		$scope.vacations = compensatory_vac;		
		
		
	})
	
}());
