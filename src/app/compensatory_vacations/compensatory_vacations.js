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
	
	.controller('Compensatory_vacations.ListController', function($rootScope, $scope, $http, $state, Upload, HRAPI_CONF, compensatory_vac, Compensatory_vacation){

		if($scope.user.company.show_vacations_c ===  false){
			$state.transitionTo('main.views.dashboard');
		}

		$scope.vac_options = [];

		angular.forEach($scope.user.company_type.tipos,function(value,index){
			if (value.idactv == "VCCP"){
				$scope.vac_options.push(value);
			}
		});

		$scope.mot = function(tipo){
			var description = "";
			angular.forEach($scope.vac_options,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};
    
		$scope.vacations = compensatory_vac;
		$scope.requerimiento =  new Compensatory_vacation();
		var archivo = null;

		$scope.loadImage = function( file ){
			archivo = file;
		}

		$scope.putRequest = function( requerimiento ){

			$scope.requerimiento.sending = true;

			Upload.upload({ 
	           		method: 'POST', 
	                url: HRAPI_CONF.apiBaseUrl('/compensatory_vacations.json'), 
	                fields: requerimiento, 
	                file: archivo 
	            }).progress(function (evt) { 
	                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 	                
	            }).success(function (data, status, headers, config) { 
	            	$scope.vacations = Compensatory_vacation.index();
					$scope.requerimiento =  new Compensatory_vacation();
					$scope.requerimiento.sending = false;  	
					$scope.alerts.push({type: 'success', msg: "La vacación compensada a sido guardada"});
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
				var index = $scope.vacations.indexOf(vacacion)
				$scope.vacations.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'secondary', msg: "La vacación compensada a sido borrada"});
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
