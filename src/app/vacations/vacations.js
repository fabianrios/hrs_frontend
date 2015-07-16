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
	
	.controller('Vacations.ListController', function($scope, $http, $state, vacations, Vacation_requirement, vac_requirements, currentUser, Upload, HRAPI_CONF){
		
		$scope.user = currentUser;
		
		console.log("$scope.user",$scope.user);
		$scope.vacations = vacations;
		$scope.vac_requirements = vac_requirements;
		console.log("vac_requirements",vac_requirements);
		$scope.only_not_user = [];
		$scope.tipos = $scope.user.type.tipos;
		$scope.vac_options = [];

		$scope.exiteAprobador = function(){
			return user.employee.hoex_approver != '00000000' &&  user.employee.hoex_approver != null 
		};
		
		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "VACA"){
				$scope.vac_options.push(value);
			}
		});
		
		angular.forEach($scope.vac_requirements,function(value,index){
			// console.log(value.employee.apply_reviewer,$scope.user.employee_id);
			if (value.employee.apply_reviewer == $scope.user.employee_id){
				$scope.only_not_user.push(value);
			}
		});
		
		$scope.seleccion = $scope.vac_options[0].subty;
		// console.log($scope.vac_options,$scope.seleccion);
		
		
		// iniciar los inputs
		// $( "#inicio" ).datepicker();
		// $( "#final" ).datepicker();
		
		//console.log("$scope.vacations",$scope.vacations,"$scope.vac_requirements", $scope.vac_requirements,"$scope.only_not_user",$scope.only_not_user);
		
		$scope.requerimiento = new Vacation_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.tipo = $scope.seleccion;
		$scope.requerimiento.employee_id = $scope.user.employee.id;
		
 	   
		//CREAR
		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			// $scope.requerimiento.$save(function(newData) {
			// 	$scope.vac_requirements.push(newData);
			// 	console.log(newData,$scope.vac_requirements);
			// 	$scope.requerimiento = new Vacation_requirement();
			// 	$scope.requerimiento.status = "Espera";
			// 	$scope.requerimiento.employee_id = $scope.user.employee.id;
			// 	$state.go('main.views.vacations');
			// 	$scope.alerts.push({type: 'success', msg: "La vacación a sido guardada"});
			// }, function(data) {
			// 	console.log("error:",data);
			// 	console.log(data.status,data.data);
			// 	$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
			// });
			var file = $scope.files[0];

			Upload.upload({ 
	           		method: 'POST', 
	                url: HRAPI_CONF.apiBaseUrl('/vacation_requirements.json'), 
	                fields: $scope.requerimiento, 
	                file: file 
	            }).progress(function (evt) { 
	                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 
	                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name); 
	            }).success(function (data, status, headers, config) { 
	            	$scope.vac_requirements.push(data);
					console.log(data,$scope.vac_requirements);
					$scope.requerimiento = new Vacation_requirement();
					$scope.requerimiento.status = "Espera";
					$scope.requerimiento.employee_id = $scope.user.employee.id;
					$state.go('main.views.vacations');
					$scope.alerts.push({type: 'success', msg: "La vacación a sido guardada"});
	                // console.log('file ' + config.file.name + 'uploaded. Response: ' + data); 
	            }).error(function (data, status, headers, config) { 
	            	console.log("error:",data);
					console.log(status,data);
					$scope.alerts.push({type: 'alert', msg: data.errors.status[0]});
	                // console.log('error status: ' + status); 
            });
		};
		
		//BORRAR
		$scope.deleteVacation = function(vacacion,modal) { 
			// console.log(vacacion);
			vacacion.$delete(function() {
				var index = $scope.vac_requirements.indexOf(vacacion)
				$scope.vac_requirements.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'secondary', msg: "La vacación del "+ vacacion.start_date  + " al "+ vacacion.end_date +" a sido borrada"});
			});
			
		} ///BORRAR
		
	
		
	})
	
}());
