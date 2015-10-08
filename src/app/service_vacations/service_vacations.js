(function(){
	'use strict';
  
	angular.module('service_vacations', ['vacation.service','vacation_requirement.service'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.service_vacations', {
			url: '/service_vacations',
			templateUrl: 'app/service_vacations/service_vacations.tpl.html',
			controller: 'Vacations.ListController'
		})
	})
	
	.controller('Vacations.ListController', function($scope, $http, $state, currentUser, Upload, HRAPI_CONF){
		
		$scope.user = currentUser;
		$scope.only_not_user = [];
		$scope.tipos = $scope.user.type.tipos;
		$scope.vac_options = [];
		$scope.vac_requirements = [];
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

		
		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "VCCP"){
				$scope.vac_options.push(value);
			}
		});
		
			$scope.loadImage = function( file ){
			archivo = file;
		}

		//CREAR
		$scope.putRequest = function() {
			Upload.upload({ 
	           		method: 'POST', 
	                url: HRAPI_CONF.apiBaseUrl('/service_vacations.json'), 
	                fields: $scope.requerimiento, 
	                file: archivo 
	            }).progress(function (evt) { 
	                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            }).success(function (data, status, headers, config) { 
	            	var a = moment(data.end_date);
	            	var b = moment(data.start_date);
	            	data.dias = a.diff(b,'days');
	            	$scope.vac_requirements.push(data);
					$scope.requerimiento = new Service_Vacation_requirement();
					$scope.requerimiento.status = "Espera";
					$scope.requerimiento.employee_id = $scope.user.employee.id;
					$state.go('main.views.service_vacations');
					$scope.alerts.push({type: 'success', msg: "La vacación compensada a sido guardada"});
          window.setTimeout(function() {
            $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
              $(this).remove();
              $rootScope.alerts = [];
            });
          }, 5000);
	                // console.log('file ' + config.file.name + 'uploaded. Response: ' + data); 
	            }).error(function (data, status, headers, config) { 
	            	angular.forEach( data.errors, function(value, index){
	            		angular.forEach( value, function( mensaje, id ){
	            			$scope.alerts.push({type: 'alert', msg: index + ' ' + mensaje });
                    window.setTimeout(function() {
                      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                        $(this).remove();
                        $rootScope.alerts = [];
                      });
                    }, 5000);
	            		});		
	            	});
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
            $rootScope.alerts = [];
          });
        }, 5000);
			});
			
		} ///BORRAR
		
	
		
	})
	
}());
