(function(){
  'use strict';
  
  angular.module('vacations', ['vacation.service','vacation_requirement.service'])

     // Add http interceptors that allows us to handle http request before it sends and http response parsing
    .config(function($stateProvider){
      $stateProvider
        .state('main.views.vacations', {
            url: '/vacations',
            templateUrl: 'app/vacations/vacations.tpl.html',
            controller: 'Vacations.ListController',
            resolve: {
              vacations: function(Vacation){
                return Vacation.index().$promise;
              },
              vac_requirements: function(Vacation_requirement){
                return Vacation_requirement.index().$promise;
              }
            }
        })
    })
	
	
    .controller('Vacations.ListController', function($scope, $http, $state, vacations, UserService, Auth, Vacation_requirement, vac_requirements){
		
   	   UserService.current_user.then(function(user) {
 		  $scope.user = user;
 		  $scope.autenticado = Auth.isAuthenticated(user)
       }, function(error) {
 		  console.log("error al optener el usuario autenticado");
 		  $location.path('/login');
       });
		
	   console.log($scope.user);
	   $scope.vacations = vacations;
	   $scope.vac_requirements = vac_requirements;
		// console.log($scope.vacations);
		
	    $scope.requerimiento = new Vacation_requirement();  
		
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.employee_id = $scope.user.id;
 
	     $scope.putRequest = function() { //create a new company. Issues a POST to /api/companies
	       $scope.requerimiento.$save(function() {
			   $state.go('main.views.vacations'); // on success go back to company_listing
	       });
	     };
		
    });
}());
