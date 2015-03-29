(function(){
	'use strict';
  
	angular.module('extras', ['vacation_requirement.service'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.extras', {
			url: '/extras',
			templateUrl: 'app/extras/extras.tpl.html',
			controller: 'Extras.ListController',
			resolve: {
				extras_req: function(Extra_requirement){
					return Extra_requirement.index().$promise;
				}
			}
		})
	})
	
	.controller('Extras.ListController', function($scope, $http, $state, extras_req, currentUser, Extra_requirement){
		
		$scope.user = currentUser;
		$scope.extras = extras_req;
		
		$scope.tipos = $scope.user.type.tipos;
		$scope.options = [];
		
		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "HOEX"){
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
			console.log(description);
			return description
		};
		
		console.log("$scope.extras",$scope.extras);
		
		$scope.requerimiento = new Extra_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.motivo = $scope.options[0].subty;
		$scope.requerimiento.employee_id = $scope.user.employee.user_id;

		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			$scope.requerimiento.$save(function(newData) {
				$scope.extras.push(newData);
				$scope.requerimiento = new Extra_requirement();
				$scope.requerimiento.status = "Espera";
				$scope.requerimiento.employee_id = $scope.user.employee.user_id;
				$state.go('main.views.extras');
				$scope.alerts.push({type: 'success', msg: "La hora extra a sido guardada"});
			}, function(data) {
				// console.log(data.status,data.data);
				$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
			});
		};
		
		//BORRAR
		$scope.deleteExtra = function(extra,modal) { 
			extra.$delete(function() {
				var index = $scope.extras.indexOf(extra);
				console.log(extra,index,modal);
				$scope.extras.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "El registro de "+ extra.fecha  + " con "+ extra.hours +" horas a sido borrado"});
			});			
		} ///BORRAR
	
		//CREAR
		
		
	})
	
}());

