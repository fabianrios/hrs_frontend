(function(){
	'use strict';
  
	angular.module('licenses', ['ngFileUpload'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.licenses', {
			url: '/licenses',
			templateUrl: 'app/licenses/licenses.tpl.html',
			controller: 'Licenses.ListController',
			resolve: {
				licenses_req: function(License_requirement){
					return License_requirement.index().$promise;
				}
			}
		})
	})
	
	.controller('Licenses.ListController', function( $scope, $http, $state,  licenses_req, License_requirement, Upload, HRAPI_CONF ){

		if($scope.user.company.show_licenses ===  false){
			$state.transitionTo('main.views.dashboard');
		}		
				
		$scope.licenses = licenses_req;	
		$scope.tipos = $scope.user.company_type.tipos;
		$scope.options = [];
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
			return $scope.user.employee.perm_approver != '00000000' &&  $scope.user.employee.perm_approver != null 
		};
		
		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "PERM"){
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
			return description
		};
		
		$scope.requerimiento = new License_requirement();  

		$scope.loadImage = function( file ){
			archivo = file;
		}

		$scope.putRequest = function() { 	
			$scope.requerimiento.sending = true;	
			Upload.upload({ 
	            	method: 'POST', 
	                url: HRAPI_CONF.apiBaseUrl('/license_requirements.json'), 
	                fields: $scope.requerimiento, 
	                file: archivo
	            }).progress(function (evt) { 
	                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 		                
	            }).success(function (data, status, headers, config) { 
	            	$scope.licenses = License_requirement.index();
	            	$scope.requerimiento.sending = false; 
					$scope.alerts.push({type: 'success', msg: "El Permiso ha sido guardado"});
			          window.setTimeout(function() {
			            $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			              $(this).remove();
			              $scope.alerts = [];
			            });
			          }, 5000);
	            }).error(function (data, status, headers, config) { 
	            	$scope.requerimiento.sending = false; 
	            	$scope.licenses = License_requirement.index();	                          	            	
	            	$scope.showMessageErrorRails(data);
            });
		};
		
		//BORRAR
		$scope.deleteLicense = function(license,modal) { 
			license.$destroy(function() {
				$scope.licenses = License_requirement.index();
				$('#myModal-'+modal).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "El Permiso del "+ license.start_date  + " al "+ license.end_date +" ha sido borrado"});
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

