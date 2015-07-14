(function(){
	'use strict';
  
	angular.module('approvals', ['extra_requirement.service'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.approvals', {
			url: '/approvals',
			templateUrl: 'app/approvals/approvals.tpl.html',
			controller: 'Approvals.ListController'
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
      controller: 'Approvals.Requirements.ListController'
    })
	})
	
	.controller('Approvals.ListController', function($scope, $http, $state,  currentUser){
		
		$scope.user = currentUser;
    // Esto lo puedo usar como centro de notificaciones
	})
  
  .controller('Approvals.Licenses.ListController', function($scope, $http, $state,  currentUser, extras_req, inhabilities_req){
    
    $scope.user = currentUser;
		$scope.extras = extras_req;
    $scope.inhabilities = inhabilities_req;
		
		$scope.only_not_user = [];
    $scope.no_este_usuario = [];
		
		angular.forEach($scope.extras,function(value,index){
			// console.log(value.employee.apply_reviewer,$scope.user.employee_id);
			if (value.employee.apply_reviewer == $scope.user.employee_id){
				$scope.only_not_user.push(value);
			}
		});
		
		angular.forEach($scope.inhabilities,function(value,index){
			// console.log(value.employee.apply_reviewer,$scope.user.employee_id);
			if (value.employee.apply_reviewer == $scope.user.employee_id){
				$scope.no_este_usuario.push(value);
			}
		});
    
    console.log("$scope.only_not_user",$scope.only_not_user, "$scope.no_este_usuario", $scope.no_este_usuario)
    
    
    // Licenses
		//UPDATE APROBAR
		$scope.aproveLicenses = function(req_info) {
			$scope.license_update = req_info;
			$scope.license_update.status = "Aprobado"
			$scope.license_update.$update(function(newData) {
				var index = $scope.extras.indexOf(req_info);
				$scope.extras[index] = newData;
				$scope.alerts.push({type: 'success', msg: "El registro de hora extra del "+ req_info.fecha + " con "+ req_info.hours +" horas a sido aprobada"});
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
		$scope.deniedLicenses = function(req_info) {
			$scope.license_update = req_info;
			$scope.license_update.status = "Negado"
			$scope.license_update.$update(function(newData) {
				var index = $scope.extras.indexOf(req_info);
				$scope.extras[index] = newData;
				$scope.alerts.push({type: 'alert', msg: "El registro de hora extra del "+ req_info.fecha  + " con "+ req_info.hours +" a sido negado"});
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
    
    ///extras
  
  })
  .controller('Approvals.Requirements.ListController', function($scope, $http, $state,  currentUser,  vac_requirements){
    
    $scope.user = currentUser;
		$scope.vac_requirements = vac_requirements;
		console.log("vac_requirements",vac_requirements);
		$scope.only_not_user = [];
		$scope.tipos = $scope.user.type.tipos;
		$scope.vac_options = [];
		
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
    
		$scope.deleteVacationReq = function(vacacion,modal) { 
			vacacion.$delete(function() {
				var index = $scope.only_not_user.indexOf(vacacion)
				$scope.only_not_user.splice(index, 1);
				// console.log($scope.only_not_user);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "La vacación del "+ vacacion.start_date  + " al "+ req_info.end_date +" a sido borrada"});
			});
			
		} ///BORRAR
		 
		//UPDATE APROBAR
		$scope.aproveVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Aprobado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				$scope.vac_requirements[index] = newData;
				$scope.alerts.push({type: 'success', msg: "La vacación del "+ req_info.start_date + " al "+ req_info.end_date +" a sido aprobada"});
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
		$scope.deniedVacation = function(req_info) {
			$scope.vacacion_update = req_info;
			$scope.vacacion_update.status = "Negado"
			$scope.vacacion_update.$update(function(newData) {
				var index = $scope.vac_requirements.indexOf(req_info);
				$scope.vac_requirements[index] = newData;
				$scope.alerts.push({type: 'alert', msg: "La vacación del "+ req_info.end_date  + " al "+ req_info.end_date +" a sido negada"});
			});
		};
  
  })
  
	
}());

