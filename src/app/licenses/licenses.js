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
	
	.controller('Licenses.ListController', function($scope, $http, $state,  currentUser, licenses_req, License_requirement, Upload, HRAPI_CONF ){
		
		$scope.user = currentUser;
		$scope.licenses = licenses_req;	
		$scope.tipos = $scope.user.type.tipos;
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
			// console.log(description);
			return description
		};
		
		$scope.requerimiento = new License_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.motivo = $scope.options[0].subty;
		$scope.requerimiento.employee_id = $scope.user.employee.id;

		$scope.loadImage = function( file ){
			archivo = file;
		}

		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations			
			// $scope.requerimiento.$save(function(newData) {
			// 	$scope.licenses.push(newData);
			// 	$scope.requerimiento = new License_requirement();
			// 	$scope.requerimiento.status = "Espera";
			// 	$scope.requerimiento.employee_id = $scope.user.employee.id;
			// 	$state.go('main.views.licenses');
			// 	$scope.alerts.push({type: 'success', msg: "El permiso a sido guardado"});
			// }, function(data) {
			// 	// console.log(data.status,data.data);
			// 	$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
			// });			
			Upload.upload({ 
	            	method: 'POST', 
	                url: HRAPI_CONF.apiBaseUrl('/license_requirements.json'), 
	                fields: $scope.requerimiento, 
	                file: archivo
	            }).progress(function (evt) { 
	                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 		                
	            }).success(function (data, status, headers, config) { 
	            	$scope.licenses.push(data);
					$scope.requerimiento = new License_requirement();
					$scope.requerimiento.status = "Espera";
					$scope.requerimiento.employee_id = $scope.user.employee.id;
					$state.go('main.views.licenses');
					$scope.alerts.push({type: 'success', msg: "El permiso a sido guardado"});
          window.setTimeout(function() {
            $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
              $(this).remove();
              $rootScope.alerts = [];
            });
          }, 5000);
	            }).error(function (data, status, headers, config) { 
	            	// $scope.alerts.push({type: 'alert', msg: data.errors.status[0]});	               	            	
	            	$scope.showMessageErrorRails(data);
            });
		};
		
		//BORRAR
		$scope.deleteLicense = function(license,modal) { 
			license.$delete(function() {
				var index = $scope.licenses.indexOf(license);
        console.log(license,index,modal);
				$scope.licenses.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "El permiso del "+ license.start_date  + " al "+ license.end_date +" a sido borrado"});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			});			
		} ///BORRAR
		
		//UPDATE APROBAR
		$scope.aproveLicense = function(req_info) {
			$scope.licenses_update = req_info;
			$scope.licenses_update.status = "Aprobado"
			$scope.licenses_update.$update(function(newData) {
				var index = $scope.licenses.indexOf(req_info);
				$scope.licenses[index] = newData;
				$scope.alerts.push({type: 'secondary', msg: "El permiso del "+ license.start_date  + " al "+ license.end_date +" a sido aprobado"});
	  	  window.setTimeout(function() {
	  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
	  	          $(this).remove(); 
	  	      });
	  	  }, 5000);
			  },
			function(data) {
				$scope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			});
		};
		
		//UPDATE DENIED
		$scope.deniedLicense = function(req_info) {
			$scope.licenses_update = req_info;
			$scope.licenses_update.status = "Negado"
			$scope.licenses_update.$update(function(newData) {
				var index = $scope.licenses.indexOf(req_info);
				$scope.licenses[index] = newData;
				$scope.alerts.push({type: 'secondary', msg: "El permiso del "+ license.start_date  + " al "+ license.end_date +" a sido negado"});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			});
		};
		
	})
	
}());

