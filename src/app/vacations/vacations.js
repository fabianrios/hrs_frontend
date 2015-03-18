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
		
		console.log("$scope.user",$scope.user);
		$scope.vacations = vacations;
		$scope.vac_requirements = vac_requirements;
		$scope.only_not_user = [];
		
		angular.forEach($scope.vac_requirements,function(value,index){
			if (value.employee_id != 1){
				$scope.only_not_user.push(value);
			}
		});
		
		
		// iniciar los inputs
		$( "#inicio" ).datepicker();
		$( "#final" ).datepicker();
		
		//console.log("$scope.vacations",$scope.vacations,"$scope.vac_requirements", $scope.vac_requirements,"$scope.only_not_user",$scope.only_not_user);
		
		$scope.requerimiento = new Vacation_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.employee_id = $scope.user.employee.user_id;
 	   
		//CREAR
		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			$scope.requerimiento.$save(function(newData) {
				$scope.vac_requirements.push(newData);
				$scope.requerimiento = new Vacation_requirement();
				$scope.requerimiento.status = "Espera";
				$scope.requerimiento.employee_id = $scope.user.employee.user_id;
				$state.go('main.views.vacations');
				$scope.alerts.push({type: 'success', msg: "La vacación a sido guardada"});
			});
		};
		
		//BORRAR
		$scope.deleteVacation = function(vacacion,modal) { 
			console.log(vacacion);
			vacacion.$delete(function() {
				var index = $scope.vac_requirements.indexOf(vacacion)
				$scope.vac_requirements.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "La vacación del "+ vacacion.start_date  + " al "+ vacacion.end_date +" a sido borrada"});
			});
			
		} ///BORRAR
		
		$scope.deleteVacationReq = function(vacacion,modal) { 
			vacacion.$delete(function() {
				var index = $scope.only_not_user.indexOf(vacacion)
				$scope.only_not_user.splice(index, 1);
				// console.log($scope.only_not_user);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "La vacación del "+ vacacion.start_date  + " al "+ req_info.end_date +" a sido borrada"});
			});
			
		} ///BORRAR
		 
		//UPDATE APROBAR
		$scope.aproveVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Aprobado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				$scope.vac_requirements[index] = newData;
				$scope.alerts.push({type: 'success', msg: "La vacación del "+ req_info.start_date + " al "+ req_info.end_date +" a sido aprobada"});
			  	  window.setTimeout(function() {
			  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			  	          $(this).remove(); 
			  	      });
			  	  }, 5000);
			});
		};
		//UPDATE DENIED
		$scope.deniedVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Negado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				$scope.vac_requirements[index] = newData;
				$scope.alerts.push({type: 'alert', msg: "La vacación del "+ req_info.end_date  + " al "+ req_info.end_date +" a sido negada"});
			});
		};
		
	})
	
}());
