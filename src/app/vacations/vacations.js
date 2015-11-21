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
	
	.controller('Vacations.ListController', function($rootScope, $scope, $http, $state, vacations, Vacation_requirement, vac_requirements, Upload, HRAPI_CONF){

		if($scope.user.company.show_vacations ===  false){
			$state.transitionTo('main.views.dashboard');
		}
		
		$scope.vacations = vacations;
		$scope.vac_requirements = vac_requirements;
		$scope.only_not_user = [];
		$scope.tipos = $scope.user.company_type.tipos;
		$scope.vac_options = [];
		$scope.urlImage = '';
		var archivo = null;

		$scope.modalImage = function( image ){			
			if(image){					
				if(image.attachment){
					image = image.attachment;
				}			
				if(image.url){
					$scope.urlImage = HRAPI_CONF.baseUrl( image.url );
					console.log($scope.urlImage);					
				}
				else{
					$scope.urlImage = '';
				}	
				$('#image-modal').foundation('reveal','open');
			}
		}

		$scope.exiteAprobador = function(){
			return $scope.user.employee.vaca_approver != '00000000' && $scope.user.employee.vaca_approver != null 
		};
		
		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "VACA"){
				$scope.vac_options.push(value);
			}
		});
		
		angular.forEach($scope.vac_requirements,function(value,index){			
			if (value.employee.apply_reviewer == $scope.user.employee_id){
				$scope.only_not_user.push(value);
			}
		});

		$scope.seleccion = $scope.vac_options[0].subty;
		
		// iniciar los inputs
		// $( "#inicio" ).datepicker();
		// $( "#final" ).datepicker();
			
		
		$scope.requerimiento = new Vacation_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.tipo = $scope.seleccion;
		$scope.requerimiento.employee_id = $scope.user.employee.id;
		
 	   	$scope.loadImage = function( file ){
			archivo = file;
		}

		//CREAR
		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			$scope.requerimiento.sending = true;
	
			Upload.upload({ 
	           		method: 'POST', 
	                url: HRAPI_CONF.apiBaseUrl('/vacation_requirements.json'), 
	                fields: $scope.requerimiento, 
	                file: archivo 
	            }).progress(function (evt) { 
	                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 	                
	            }).success(function (data, status, headers, config) { 
	            	var a = moment(data.end_date);
	            	var b = moment(data.start_date);
	            	data.dias = a.diff(b,'days');
	            	$scope.vac_requirements.push(data);
					console.log(data,$scope.vac_requirements);
					$scope.requerimiento = new Vacation_requirement();
					$scope.requerimiento.status = "Espera";
					$scope.requerimiento.employee_id = $scope.user.employee.id;
					$state.go('main.views.vacations');
					$scope.alerts.push({type: 'success', msg: "La vacación a sido guardada"});
			        window.setTimeout(function() {
			            $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			              $(this).remove();
			              $scope.alerts = [];
			            });
			        }, 5000);	                
	            }).error(function (data, status, headers, config) { 
	            	$scope.requerimiento.sending = false;              
		           	$scope.showMessageErrorRails(data);	      
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
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});
			
		} ///BORRAR
		
	
		
	})
	
}());
