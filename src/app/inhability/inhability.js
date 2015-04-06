(function(){
	'use strict';
  
	angular.module('inhability', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.inhabilities', {
			url: '/inhabilities',
			templateUrl: 'app/inhability/inhability.tpl.html',
			controller: 'Inhabilities.ListController',
			resolve: {
				inhabilities_req: function(Inhability_requirement){
					return Inhability_requirement.index().$promise;
				}
			}
		})
	})
	
	.controller('Inhabilities.ListController', function($scope, $http, $state, currentUser, inhabilities_req, Inhability_requirement){
		
		$scope.user = currentUser;
		$scope.inhabilities = inhabilities_req;
		//console.log("$scope.user",$scope.user, "inhabilities: ", $scope.inhabilities);
		
		$scope.tipos = $scope.user.type.tipos;
		$scope.only_not_user = [];
		$scope.options = [];
		
		angular.forEach($scope.inhabilities,function(value,index){
			// console.log(value.employee.apply_reviewer,$scope.user.employee_id);
			if (value.employee.apply_reviewer == $scope.user.employee_id){
				$scope.only_not_user.push(value);
			}
		});
		
		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "INCA"){
				$scope.options.push(value);
			}
		});
		
		$scope.mot = function(tipo){
			var description = "";
			angular.forEach($scope.options,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};
		
		$scope.requerimiento = new Inhability_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.motivo = $scope.options[0].subty;
		$scope.requerimiento.employee_id = $scope.user.employee.id;

		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			$scope.requerimiento.$save(function(newData) {
				$scope.inhabilities.push(newData);
				$scope.requerimiento = new Inhability_requirement();
				$scope.requerimiento.status = "Espera";
				$scope.requerimiento.employee_id = $scope.user.employee.user_id;
				$state.go('main.views.inhabilities');
				$scope.alerts.push({type: 'success', msg: "La incapacidad a sido guardada"});
			}, function(data) {
				// console.log(data.status,data.data);
				$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
			});
		};
		
		//BORRAR
		$scope.deleteInhability = function(inhability,modal) { 
			inhability.$delete(function() {
				var index = $scope.inhabilities.indexOf(inhability);
				// console.log(inhability,index,modal);
				$scope.inhabilities.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhability.end_date +" a sido borrada"});
			});			
		} ///BORRAR
		
		//UPDATE APROBAR
		$scope.aproveInhabilities = function(req_info) {
			$scope.inhabilities_update = req_info;
			$scope.inhabilities_update.status = "Aprobado"
			$scope.inhabilities_update.$update(function(newData) {
				var index = $scope.inhabilities.indexOf(req_info);
				$scope.inhabilities[index] = newData;
				$scope.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhability.end_date +" a sido aprobada"});
			  	  window.setTimeout(function() {
			  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			  	          $(this).remove(); 
			  	      });
			  	  }, 5000);
			  },
			function(data) {
				$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
			});
		};
		
		//UPDATE DENIED
		$scope.deniedInhabilities = function(req_info) {
			$scope.inhabilities_update = req_info;
			$scope.inhabilities_update.status = "Negado"
			$scope.inhabilities_update.$update(function(newData) {
				var index = $scope.inhabilities.indexOf(req_info);
				$scope.inhabilities[index] = newData;
				$scope.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhability.end_date +" a sido negada"});
			});
		};
		
	})
	
}());

