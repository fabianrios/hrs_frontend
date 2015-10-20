(function(){
	'use strict';
  
	angular.module('approvals', ['extra_requirement.service'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.approvals', {
			url: '/approvals',
			templateUrl: 'app/approvals/approvals.tpl.html',
			controller: 'Approvals.ListController',
			resolve:{
				infos:function(Info){
					return Info.index().$promise;
				}
			}
		})
	    .state('main.views.approvals_licenses', {
	      url: '/approvals_licenses',
	      templateUrl: 'app/approvals/licenses.tpl.html',
	      controller: 'Approvals.Licenses.ListController',
				resolve: {
					inhabilities_req: function(Inhability_requirement){
						return Inhability_requirement.index().$promise;
					},
					extras_req: function(Extra_requirement){
						return Extra_requirement.index().$promise;
					}
				}
	    })
	    .state('main.views.approvals_requirements', {
	      url: '/approvals_requirements',
	      templateUrl: 'app/approvals/requirements.tpl.html',
	      controller: 'Approvals.Requirements.ListController',
				resolve:{
					licenses_req: function(License_requirement){
						return License_requirement.index().$promise;
					},
					vac_requirements: function(Vacation_requirement){
						return Vacation_requirement.index().$promise;
					}
				}
	    })
	})
	
	.controller('Approvals.ListController', function($rootScope, $scope, $http, $state, currentUser, infos){
		
		$scope.user = currentUser;
        $scope.toapproved = [];
    
		//  solicitudes a aprobar
		angular.forEach(infos, function(value, key) {		
			var value_1 = '';
			if(value.boss != null){
				value_1 = value.boss.toString();
			}			
			var value_2 = '';
			if($scope.user.employee.id_posicion != null){
				value_2 = $scope.user.employee.id_posicion.toString();
			}
			if (value_1 ===  value_2 && (value.approved === false || value.approved === 'false' )){
				$scope.toapproved.push(value);
			}
		});
    
		$scope.approvedSolicitud = function(solicitud) {
			$scope.solicitud_update = solicitud;
			$scope.solicitud_update.approved = true;
			$scope.solicitud_update.$update(
				function(newData) {
		        	var index = $scope.toapproved.indexOf(solicitud);
		        	$scope.toapproved[index] = newData;
		        	$rootScope.alerts.push({type: 'success', msg: "la información ha sido aprobada"});
    					window.setTimeout(function() {
    		                $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
    		                    $(this).remove();
								$rootScope.alerts = [];
    		                });
    		            }, 5000);
		        },
		      	function(data) {
		        	$rootScope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
                      window.setTimeout(function() {
                        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                          $(this).remove();
                          $rootScope.alerts = [];
                        });
                      }, 5000);
		      	}
			);
		}
		$scope.deniedSolicitud = function(solicitud) {
			$scope.solicitud_update = solicitud;
			$scope.solicitud_update.approved = false;
			$scope.solicitud_update.$update(
				function(newData) {
		        	var index = $scope.toapproved.indexOf(solicitud);
		        	$scope.toapproved[index] = newData;
		        	$rootScope.alerts.push({type: 'success', msg: "la información ha sido rechazada"});
    					window.setTimeout(function() {
    		                $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
    		                    $(this).remove();
														$rootScope.alerts = [];
    		                });
    		            }, 5000);
		        },
		      	function(data) {
		        	$rootScope.showMessageErrorRails(data);
		      	}
			);
		}	

		$scope.deleteSolicitud = function(solicitud, modal) {
			solicitud.$destroy(function() {
				var index = $scope.toapproved.indexOf(solicitud)
				$scope.toapproved.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "La información a sido borrada"});
                window.setTimeout(function() {
                  $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove();
                    $rootScope.alerts = [];
                  });
                }, 5000);
			});
		}
    
	})
  
  .controller('Approvals.Licenses.ListController', function($rootScope, $scope, $http, $state,  currentUser, extras_req, inhabilities_req, HRAPI_CONF){
	$scope.user = currentUser;
	$scope.extras = extras_req;
    $scope.inhabilities = inhabilities_req;
	$scope.only_not_user = [];
    $scope.no_este_usuario = [];
    $scope.tipos = $scope.user.type.tipos;
    $scope.options_extras = [];
    $scope.options_inca = [];

    $scope.urlImage = '';

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
		
	angular.forEach($scope.extras,function(value,index){
		if (value.employee.hoex_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
			$scope.only_not_user.push(value);
		}
	});
		
	angular.forEach($scope.inhabilities,function(value,index){
		if (value.employee.inca_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
			$scope.no_este_usuario.push(value);
		}
	});

	angular.forEach($scope.tipos,function(value,index){
		if (value.idactv == "HOEX"){
			$scope.options_extras.push(value);
		}
	})
	angular.forEach($scope.tipos,function(value,index){
		if (value.idactv == "INCA"){
			$scope.options_inca.push(value);
		}
	});
    
    $scope.motExtras = function(tipo){
		var description = "";
		angular.forEach($scope.options_extras,function(value,index){
			if (value.subty == tipo){
				description = value.descr;
			}
		});
		// console.log(description);
		return description
	};

	$scope.motInca = function(tipo){
		var description = "";
		angular.forEach($scope.options_inca,function(value,index){
			if (value.subty == tipo){
				description = value.descr;
			}
		});
		// console.log(description);
		return description
	};

    // Licenses
	//UPDATE APROBAR
	$scope.aproveExtra = function(req_info) {
		$scope.license_update = req_info;
		$scope.license_update.status = "Aprobado";
		$scope.license_update.$update(function(newData) {
			var index = $scope.extras.indexOf(req_info);
			$scope.extras[index] = newData;
			$rootScope.alerts.push({type: 'success', msg: "El registro de hora extra del "+ req_info.fecha + " con "+ req_info.hours +" horas a sido aprobada"});
  	  window.setTimeout(function() {
  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
  	          $(this).remove();
							$rootScope.alerts = [];
  	      });
  	  }, 5000);
		},
		function(data) {
			$rootScope.showMessageErrorRails(data);
			$scope.license_update.status = "Espera";
		});
	};
		
	//UPDATE DENIED
	$scope.deniedExtra = function(req_info) {
		$scope.license_update = req_info;
		$scope.license_update.status = "Negado"
		$scope.license_update.$update(function(newData) {
			var index = $scope.extras.indexOf(req_info);
			$scope.extras[index] = newData;
			$rootScope.alerts.alerts.push({type: 'alert', msg: "El registro de hora extra del "+ req_info.fecha  + " con "+ req_info.hours +" a sido negado"});
      window.setTimeout(function() {
        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove();
          $rootScope.alerts = [];
        });
      }, 5000);
		},
		function(data) {
			$rootScope.showMessageErrorRails(data);
			$scope.license_update.status = "Espera";
		});
	};
		
		
	$scope.$on('s3upload:success', function (evt, xhr, fileUrl) {
		var id = evt.targetScope.$parent.req_info.id
		console.log(evt.targetScope.$parent.req_info);
		$http({method: 'PUT', 
			url: HRAPI_CONF.apiBaseUrl('/extra_requirements/')+id,
			data: { extra_requirement: { attachment: fileUrl.path}}
		})
		.success( function( data, status ) {
			console.log("imagen colocada", data);
		})
		.error( function( data, status ) {
			// errorService.failure( data, status, $scope);
			console.log("error", status, data.errors, $scope);
		});
	});
    
    // /licenses
    
    //extras
	//UPDATE APROBAR
	$scope.aproveInhabilities = function(req_info) {
		$scope.inhabilities_update = req_info;
		$scope.inhabilities_update.status = "Aprobado"
		$scope.inhabilities_update.$update(function(newData) {
			var index = $scope.inhabilities.indexOf(req_info);
			$scope.inhabilities[index] = newData;
			$rootScope.alerts.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhability.end_date +" a sido aprobada"});
  	  window.setTimeout(function() {
  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
  	          $(this).remove(); 
							$rootScope.alerts = [];
  	      });
  	  }, 5000);
		  },
		function(data) {
			$rootScope.showMessageErrorRails(data);
		});
	};
	
	//UPDATE DENIED
	$scope.deniedInhabilities = function(req_info) {
		$scope.inhabilities_update = req_info;
		$scope.inhabilities_update.status = "Negado"
		$scope.inhabilities_update.$update(function(newData) {
			var index = $scope.inhabilities.indexOf(req_info);
			$scope.inhabilities[index] = newData;
			$rootScope.alerts.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhability.end_date +" a sido negada"});
      window.setTimeout(function() {
        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove();
          $rootScope.alerts = [];
        });
      }, 5000);
		});
	};
    
    ///extras
  
  })
  .controller('Approvals.Requirements.ListController', function($rootScope, $scope, $http, $state,  currentUser,  vac_requirements, licenses_req, HRAPI_CONF){
    
    	$scope.user = currentUser;
		$scope.vac_requirements = vac_requirements;
    	$scope.licenses = licenses_req;
    	$scope.only_not_user_vac = [];
		$scope.only_not_user = [];
		$scope.tipos = $scope.user.type.tipos;
		$scope.vac_options = [];
		$scope.perm_options = [];
		$scope.urlImage = '';

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
			if (value.idactv == "VACA"){
				$scope.vac_options.push(value);
			}
		});

		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "PERM"){
				$scope.perm_options.push(value);
			}
		});
		
		$scope.motPerm = function(tipo){
			var description = "";
			angular.forEach($scope.perm_options,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};
		
		angular.forEach($scope.vac_requirements,function(value,index){
			if (value.employee.vaca_approver == $scope.user.employee.id_posicion){
				$scope.only_not_user_vac.push(value);
			}
		});
    
		angular.forEach($scope.licenses,function(value,index){		
			if (value.employee.perm_approver == $scope.user.employee.id_posicion){
				$scope.only_not_user.push(value);
			}
		});
		
		$scope.seleccion = $scope.vac_options[0].subty;
    
		$scope.deleteVacationReq = function(vacacion,modal) { 
			vacacion.$delete(function() {
				var index = $scope.only_not_user_vac.indexOf(vacacion)
				$scope.only_not_user_vac.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$rootScope.alerts.push({type: 'alert', msg: "La vacación del "+ vacacion.start_date  + " al "+ req_info.end_date +" a sido borrada"});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			});
			
		} ///BORRAR
		 
		//UPDATE APROBAR
		$scope.aproveVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Aprobado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				$scope.vac_requirements[index] = newData;
				$rootScope.alerts.push({type: 'success', msg: "La vacación del "+ req_info.start_date + " al "+ req_info.end_date +" a sido aprobada"});
	  	  window.setTimeout(function() {
	  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
	  	          $(this).remove();
								$rootScope.alerts = []; 
	  	      });
	  	  }, 5000);
			  },
			function(data) {
				$rootScope.showMessageErrorRails(data);
			});
		};
		//UPDATE DENIED
		$scope.deniedVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Negado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				$scope.vac_requirements[index] = newData;
				$rootScope.alerts.push({type: 'alert', msg: "La vacación del "+ req_info.end_date  + " al "+ req_info.end_date +" a sido negada"});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			});
		};

		// PERMISOS - LICENSES
		// UPDATE APROBAR
		$scope.aproveLicense = function(req_info) {
			$scope.permiso_update = req_info;
			$scope.permiso_update.status = "Aprobado"
			$scope.permiso_update.$update(function(newData) {
				var index = $scope.licenses.indexOf(req_info);
				$scope.licenses[index] = newData;
				$scope.alerts.push({type: 'success', msg: "La permiso del "+ req_info.start_date + " al "+ req_info.end_date +" a sido aprobada"});
	  	  window.setTimeout(function() {
	  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
	  	          $(this).remove(); 
								$rootScope.alerts = [];
	  	      });
	  	  }, 5000);
			  },
			function(data) {
				$rootScope.showMessageErrorRails(data);
			});
		};
		//UPDATE DENIED
		$scope.deniedLicense = function(req_info) {
			$scope.permiso_update = req_info;
			$scope.permiso_update.status = "Negado"
			$scope.permiso_update.$update(function(newData) {
				var index = $scope.licenses.indexOf(req_info);
				$scope.licenses[index] = newData;
				$scope.alerts.push({type: 'alert', msg: "La permiso del "+ req_info.end_date  + " al "+ req_info.end_date +" a sido negada"});
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

