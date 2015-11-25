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
					return Info.index_approve().$promise;
				}
			}
		})
	    .state('main.views.approvals_licenses', {
	    	url: '/approvals_licenses',
	    	templateUrl: 'app/approvals/licenses.tpl.html',
	    	controller: 'Approvals.Licenses.ListController',
			resolve: {
				inhabilities_req: function(Inhability_requirement){
					return Inhability_requirement.index_approve().$promise;
				}//,
				// extras_req: function(Extra_requirement){
				// 	return Extra_requirement.index().$promise;
				// }
			}
	    })
	    .state('main.views.approvals_requirements', {
	      url: '/approvals_requirements',
	      templateUrl: 'app/approvals/requirements.tpl.html',
	      controller: 'Approvals.Requirements.ListController',
			resolve:{
				approve_severances: function(Severance){
					return Severance.index_approve().$promise;
				},
				approve_vacations: function(Vacation_requirement){
					return Vacation_requirement.index_approve().$promise;
				},
				approve_compensatory_vacations: function(Compensatory_vacation){
					return Compensatory_vacation.index_approve().$promise;
				}
			}
	    })
	})
	
	.controller('Approvals.ListController', function($scope, $http, $state,  infos, Info ){//,{

		/////////////
  		//	INFO
  		/////////////
		$scope.infos = infos;

		$scope.approveInfo = function( info ) {		
			 info.$approve(function(newData) {
			 	$scope.updateNotification();
				$scope.infos = Info.index_approve();				
				$scope.alerts.push({type: 'success', msg: "La información ha sido aprobada"});
			  	  window.setTimeout(function() {
			  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			  	        $(this).remove();
						$scope.alerts = []; 
			  	      });
			  	  }, 5000);
			    },
				function(data) {
					$scope.updateNotification();
					$scope.showMessageErrorRails(data);
				}
			);
		};
		

		$scope.deniedInfo = function( info ) {			
			info.$denied(function(newData) {
					$scope.updateNotification();
					$scope.infos = Info.index_approve();
					$scope.alerts.push({type: 'alert', msg: "La información ha sido negada"});
			        window.setTimeout(function() {
			          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			            $(this).remove();
			            $scope.alerts = [];
			          });
			        }, 5000);
				},
				function(data) {
					$scope.updateNotification();
					$scope.showMessageErrorRails(data);
				}

			);
		};


		//////////////
		//	INFO
		//////////////
		
    
	})
  
  .controller('Approvals.Licenses.ListController', function($scope, $state, inhabilities_req, Inhability_requirement){ //,  currentUser, extras_req, inhabilities_req, HRAPI_CONF

  		/////////////
  		//	INHABILITIES
  		/////////////
		$scope.inhabilities = inhabilities_req;

		$scope.options_inhability = [];
		angular.forEach($scope.user.company_type.tipos,function(value,index){
			if (value.idactv == "INCA"){
				$scope.options_inhability.push(value);
			}
		});

		$scope.mot_inhability = function(tipo){
			var description = "";
			angular.forEach($scope.options_inhability,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};

		$scope.approveInhabilities= function( inhability ) {		
			 inhability.$approve(function(newData) {
			 	$scope.updateNotification();
				$scope.inhabilities = Inhability_requirement.index_approve();				
				$scope.alerts.push({type: 'success', msg: "La incapacidad ha sido aprobada"});
			  	  window.setTimeout(function() {
			  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			  	        $(this).remove();
						$scope.alerts = []; 
			  	      });
			  	  }, 5000);
			    },
				function(data) {
					$scope.updateNotification();
					$scope.showMessageErrorRails(data);
				}
			);
		};
		

		$scope.deniedInhabilities = function( inhability ) {			
			inhability.$denied(function(newData) {
					$scope.updateNotification();
					$scope.inhabilities = Inhability_requirement.index_approve();				
					$scope.alerts.push({type: 'alert', msg: "La incapacidad ha sido negada"});
			        window.setTimeout(function() {
			          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			            $(this).remove();
			            $scope.alerts = [];
			          });
			        }, 5000);
				},
				function(data) {
					$scope.updateNotification();
					$scope.showMessageErrorRails(data);
				}

			);
		};


		//////////////
		//	INHABILITIES
		//////////////
	// // $scope.user = currentUser;
	// $scope.extras = extras_req;
    // $scope.inhabilities = inhabilities_req;
	// $scope.only_not_user = [];
 //    $scope.no_este_usuario = [];
 //    $scope.tipos = $scope.user.company_type.tipos;
 //    $scope.options_extras = [];
 //    $scope.options_inca = [];
 //    $scope.urlImage = '';

	// $scope.modalImage = function( image ){			
	// 	if(image){					
	// 		if(image.attachment){
	// 			image = image.attachment;
	// 		}			
	// 		if(image.url){
	// 			$scope.urlImage = HRAPI_CONF.baseUrl( image.url );
	// 			console.log($scope.urlImage);					
	// 		}
	// 		else{
	// 			$scope.urlImage = '';
	// 		}	
	// 		$('#image-modal').foundation('reveal','open');
	// 	}
	// }
		
	// angular.forEach($scope.extras,function(value,index){
	// 	if (value.employee.hoex_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
	// 		$scope.only_not_user.push(value);
	// 	}
	// });
		
	// angular.forEach($scope.inhabilities,function(value,index){
	// 	if (value.employee.inca_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
	// 		$scope.no_este_usuario.push(value);
	// 	}
	// });

	// angular.forEach($scope.tipos,function(value,index){
	// 	if (value.idactv == "HOEX"){
	// 		$scope.options_extras.push(value);
	// 	}
	// })
	// angular.forEach($scope.tipos,function(value,index){
	// 	if (value.idactv == "INCA"){
	// 		$scope.options_inca.push(value);
	// 	}
	// });
    
 //    $scope.motExtras = function(tipo){
	// 	var description = "";
	// 	angular.forEach($scope.options_extras,function(value,index){
	// 		if (value.subty == tipo){
	// 			description = value.descr;
	// 		}
	// 	});
	// 	// console.log(description);
	// 	return description
	// };

	// $scope.motInca = function(tipo){
	// 	var description = "";
	// 	angular.forEach($scope.options_inca,function(value,index){
	// 		if (value.subty == tipo){
	// 			description = value.descr;
	// 		}
	// 	});
	// 	// console.log(description);
	// 	return description
	// };

 //    // Licenses
	// //UPDATE APROBAR
	// $scope.aproveExtra = function(req_info) {
	// 	$scope.license_update = req_info;
	// 	$scope.license_update.status = "Aprobado";
	// 	$scope.license_update.$update(function(newData) {
	// 		var index = $scope.extras.indexOf(req_info);
	// 		$scope.extras[index] = newData;
	// 		$rootScope.alerts.push({type: 'success', msg: "El registro de hora extra del "+ req_info.fecha + " con "+ req_info.hours +" horas a sido aprobada"});
 //  	  window.setTimeout(function() {
 //  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
 //  	          $(this).remove();
	// 						$rootScope.alerts = [];
 //  	      });
 //  	  }, 5000);
	// 	},
	// 	function(data) {
	// 		$rootScope.showMessageErrorRails(data);
	// 		$scope.license_update.status = "Espera";
	// 	});
	// };
		
	// //UPDATE DENIED
	// $scope.deniedExtra = function(req_info) {
	// 	$scope.license_update = req_info;
	// 	$scope.license_update.status = "Negado"
	// 	$scope.license_update.$update(function(newData) {
	// 		var index = $scope.extras.indexOf(req_info);
	// 		$scope.extras[index] = newData;
	// 		$rootScope.alerts.alerts.push({type: 'alert', msg: "El registro de hora extra del "+ req_info.fecha  + " con "+ req_info.hours +" a sido negado"});
 //      window.setTimeout(function() {
 //        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
 //          $(this).remove();
 //          $rootScope.alerts = [];
 //        });
 //      }, 5000);
	// 	},
	// 	function(data) {
	// 		$rootScope.showMessageErrorRails(data);
	// 		$scope.license_update.status = "Espera";
	// 	});
	// };
		
		
	// $scope.$on('s3upload:success', function (evt, xhr, fileUrl) {
	// 	var id = evt.targetScope.$parent.req_info.id
	// 	console.log(evt.targetScope.$parent.req_info);
	// 	$http({method: 'PUT', 
	// 		url: HRAPI_CONF.apiBaseUrl('/extra_requirements/')+id,
	// 		data: { extra_requirement: { attachment: fileUrl.path}}
	// 	})
	// 	.success( function( data, status ) {
	// 		console.log("imagen colocada", data);
	// 	})
	// 	.error( function( data, status ) {
	// 		// errorService.failure( data, status, $scope);
	// 		console.log("error", status, data.errors, $scope);
	// 	});
	// });
    
 //    // /licenses
    
 //    //extras
	// //UPDATE APROBAR
	// $scope.aproveInhabilities = function(req_info) {
	// 	$scope.inhabilities_update = req_info;
	// 	$scope.inhabilities_update.status = "Aprobado"
	// 	$scope.inhabilities_update.$update(function(newData) {
	// 		var index = $scope.inhabilities.indexOf(req_info);
	// 		$scope.inhabilities[index] = newData;
	// 		$rootScope.alerts.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhability.end_date +" a sido aprobada"});
 //  	  window.setTimeout(function() {
 //  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
 //  	          $(this).remcove(); 
	// 						$rootScope.alerts = [];
 //  	      });
 //  	  }, 5000);
	// 	  },
	// 	function(data) {
	// 		$rootScope.showMessageErrorRails(data);
	// 	});
	// };
	
	// //UPDATE DENIED
	// $scope.deniedInhabilities = function(req_info) {
	// 	$scope.inhabilities_update = req_info;
	// 	$scope.inhabilities_update.status = "Negado"
	// 	$scope.inhabilities_update.$update(function(newData) {
	// 		var index = $scope.inhabilities.indexOf(req_info);
	// 		$scope.inhabilities[index] = newData;, 
	// 		$rootScope.alerts.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhabilit, y.end_date +" a sido negada"});
 //      window.setTimeout(function() {
 //        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
 //          $(this).remove();
 //          $rootScope.alerts = [];
 //        });
 //      }, 5000);
	// 	});
	// };
    
 //    ///extras
  
  })
  .controller('Approvals.Requirements.ListController', function( $scope, $http, $state, approve_severances, Severance, approve_vacations, Vacation_requirement, approve_compensatory_vacations, Compensatory_vacation, HRAPI_CONF){

  		/////////////
  		//	SEVERANCE
  		/////////////
		$scope.severances = approve_severances;

		$scope.options_severance = [];
		angular.forEach($scope.user.company_type.tipos,function(value,index){
			if (value.idactv == "CESA"){
				$scope.options_severance.push(value);
			}
		});

		$scope.mot_severance = function(tipo){
			var description = "";
			angular.forEach($scope.options_severance,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};

	
		$scope.approveSeverance = function( severance ) {		
			 severance.$approve(function(newData) {
			 	$scope.updateNotification();
				$scope.severances = Severance.index_approve();				
				$scope.alerts.push({type: 'success', msg: "El anticipo de cesantias a sido aprobada"});
			  	  window.setTimeout(function() {
			  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			  	        $(this).remove();
						$scope.alerts = []; 
			  	      });
			  	  }, 5000);
			    },
				function(data) {
					$scope.showMessageErrorRails(data);
				}
			);
		};
		

		$scope.deniedSeverance = function( severance ) {			
			severance.$denied(function(newData) {
				$scope.updateNotification();
				$scope.severances = Severance.index_approve();
				$scope.alerts.push({type: 'alert', msg: "El anticipo de cesantias a sido negada"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});
		};


		//////////////
		//	SEVERANCE
		//////////////



		/////////////
  		//	VACATION
  		/////////////
		$scope.vacations = approve_vacations;

		$scope.options_vacation = [];
		angular.forEach($scope.user.company_type.tipos,function(value,index){
			if (value.idactv == "VACA"){
				$scope.options_vacation.push(value);
			}
		});

		$scope.mot_vacation = function(tipo){
			var description = "";
			angular.forEach($scope.options_vacation,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};

	
		$scope.approveVacation = function( vacation ) {		
			 vacation.$approve(function(newData) {
			 	$scope.updateNotification();
				$scope.vacations = Vacation_requirement.index_approve();				
				$scope.alerts.push({type: 'success', msg: "Vacación a sido aprobada"});
			  	  window.setTimeout(function() {
			  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			  	        $(this).remove();
						$scope.alerts = []; 
			  	      });
			  	  }, 5000);
			    },
				function(data) {
					$scope.showMessageErrorRails(data);
				}
			);
		};
		

		$scope.deniedVacation = function( vacation ) {			
			vacation.$denied(function(newData) {
				$scope.updateNotification();
				$scope.vacations = Vacation_requirement.index_approve();
				$scope.alerts.push({type: 'alert', msg: "Vacación a sido negada"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});
		};
		//////////////
		//	VACATION
		//////////////



		/////////////
  		//	COMPENSATORY VACATION
  		/////////////
		$scope.compensatory_vacations = approve_compensatory_vacations;

		$scope.options_compensatory_vacation = [];
		angular.forEach($scope.user.company_type.tipos,function(value,index){
			if (value.idactv == "VCCP"){
				$scope.options_compensatory_vacation.push(value);
			}
		});

		$scope.mot_compensatory_vacation = function(tipo){
			var description = "";
			angular.forEach($scope.options_compensatory_vacation,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};

	
		$scope.approveCompensatoryVacation = function( compensatory_vacation ) {		
			 compensatory_vacation.$approve(function(newData) {
			 	$scope.updateNotification();
				$scope.compensatory_vacations = Compensatory_vacation.index_approve();				
				$scope.alerts.push({type: 'success', msg: "Vacación compensada a sido aprobada"});
				  
			  	  window.setTimeout(function() {
			  	      $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			  	        $(this).remove();
						$scope.alerts = []; 
			  	      });
			  	  }, 5000);
			    },
				function(data) {
					$scope.updateNotification();
					$scope.showMessageErrorRails(data);
				}
			);
		};
		

		$scope.deniedCompensatoryVacation = function( compensatory_vacation ) {			
			compensatory_vacation.$denied(function(newData) {
				$scope.updateNotification();
				$scope.compensatory_vacations = Compensatory_vacation.index_approve();
				$scope.alerts.push({type: 'alert', msg: "Vacación compensada a sido negada"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});
		};
		//////////////
		//	COMPENSATORY VACATION
		//////////////



		//////////////
		//	ALL
		//////////////
		$scope.modalImage = function( image ){			
			if(image){					
				if(image.attachment){
					image = image.attachment;
				}			
				if(image.url){
					$scope.urlImage = HRAPI_CONF.baseUrl( image.url );									
				}
				else{
					$scope.urlImage = '';
				}	
				$('#image-modal').foundation('reveal','open');
			}
		}
		//////////////
		//	ALL
		//////////////
  
  
  })
  
	
}());

