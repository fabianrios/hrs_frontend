(function(){
	'use strict';
  
	angular.module('extras', ['extra_requirement.service'])

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
	
	.controller('Extras.ListController', function($rootScope, $scope, $http, $state, extras_req, currentUser, Extra_requirement, HRAPI_CONF){
		
		// $scope.user = currentUser;
		$scope.extras = extras_req;
		
		$scope.tipos = $scope.user.company_type.tipos;
		$scope.only_not_user = [];
		$scope.options = [];

		$scope.exiteAprobador = function(){
			return $scope.user.employee.hoex_approver != '00000000' &&  $scope.user.employee.hoex_approver != null 
		};

		// currentUser.emplo
		
		angular.forEach($scope.extras,function(value,index){
			// console.log(value.employee.apply_reviewer,$scope.user.employee_id);
			if (value.employee.apply_reviewer == $scope.user.employee_id){
				$scope.only_not_user.push(value);
			}
		});
		
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
			// console.log(description);
			return description
		};
		
		// console.log("$scope.extras",$scope.extras);
		
		$scope.requerimiento = new Extra_requirement();  
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.motivo = $scope.options[0].subty;
		$scope.requerimiento.employee_id = $scope.user.employee.id;

		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			$scope.requerimiento.$save(function(newData) {
				$scope.extras.push(newData);
				$scope.requerimiento = new Extra_requirement();
				$scope.requerimiento.status = "Espera";
				$scope.requerimiento.employee_id = $scope.user.employee.id;
				$state.go('main.views.extras');
				$rootScope.alerts.push({type: 'success', msg: "La hora extra a sido guardada"});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			}, function(data) {
				console.log(data);
				$rootScope.alerts.push({type: 'alert', msg: data.data.errors.status[0]});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			});
		};
		
		//BORRAR
		$scope.deleteExtra = function(extra,modal) { 
			extra.$delete(function() {
				var index = $scope.extras.indexOf(extra);
				console.log(extra,index,modal);
				$scope.extras.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');
				$rootScope.alerts.push({type: 'secondary', msg: "El registro de "+ extra.fecha  + " con "+ extra.hours +" horas a sido borrado"});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			});			
		} ///BORRAR
		
		
		
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
		
	})
	
}());

