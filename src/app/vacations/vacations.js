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
	
	.controller('Vacations.ListController', function($scope, $http, $state, vacations, Vacation_requirement, vac_requirements, currentUser){
		
		$scope.user = currentUser;
		
		console.log($scope.user.employee.user_id,$scope.user);
		$scope.vacations = vacations;
		$scope.vac_requirements = vac_requirements;
		$scope.only_not_user = [];
		
		angular.forEach($scope.vac_requirements,function(value,index){
			if (value.employee_id != 1){
				$scope.only_not_user.push(value);
			}
		});
		
		$scope.openModal = function(modal) {
			$('#myModal-'+modal).foundation('reveal', 'open');
		};
		
		// iniciar los inputs
		$( "#inicio" ).datepicker();
		$( "#final" ).datepicker();
		
		console.log("$scope.vacations",$scope.vacations,"$scope.vac_requirements", $scope.vac_requirements,"$scope.only_not_user",$scope.only_not_user);
		
		$scope.requerimiento = new Vacation_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.employee_id = $scope.user.employee.user_id;
 	   
		//CREAR
		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			$scope.requerimiento.$save(function(newData) {
				$scope.vac_requirements.push(newData);
				$scope.requerimiento = new Vacation_requirement();
				$state.go('main.views.vacations');
			});
		};
		
		//BORRAR
		$scope.deleteVacation = function(vacacion,modal) { 
			
			vacacion.$delete(function() {
				var index = $scope.vac_requirements.indexOf(vacacion)
				$scope.vac_requirements.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
			});
			
		} ///BORRAR
		
		$scope.deleteVacationReq = function(vacacion,modal) { 
			
			vacacion.$delete(function() {
				var index = $scope.only_not_user.indexOf(vacacion)
				$scope.only_not_user.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
			});
			
		} ///BORRAR
		 
		//UPDATE APROBAR
		$scope.aproveVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Aprobado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				// console.log(index);
				$scope.vac_requirements[index] = newData;
			});
		};
		//UPDATE DENIED
		$scope.deniedVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Negado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				// console.log(index);
				$scope.vac_requirements[index] = newData;
			});
		};
		
	})
	
}());
