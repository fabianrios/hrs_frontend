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
	
    .controller('Vacations.ListController', function($scope, $http, $state, $modal, vacations, UserService, Auth, Vacation_requirement, vac_requirements){
		
		
		
   	   UserService.current_user.then(function(user) {
 		  $scope.user = user;
 		  $scope.autenticado = Auth.isAuthenticated(user)
       }, function(error) {
 		  console.log("error al optener el usuario autenticado");
 		  $location.path('/login');
       });
	   
	   
		
	   // console.log($scope.user);
	   $scope.vacations = vacations;
	   $scope.vac_requirements = vac_requirements;
	   $scope.only_not_user = [];
	   
	   angular.forEach($scope.vac_requirements,function(value,index){
		   if (value.employee_id != 1){
			   $scope.only_not_user.push(value);
		   }
       });
	   
	   
	   $scope.open_more_info = function (obj) {
		   $scope.obj = obj;
		   var modalInstance = $modal.open({
	         templateUrl: 'more_info.html',
	         resolve: {
	           items: function () {
	             return $scope.obj;
	           }
	         }
	       });
	   }
	   
		// console.log($scope.vacations);
		
	    $scope.requerimiento = new Vacation_requirement();  
		
		$scope.requerimiento.status = "Espera";
		$scope.requerimiento.employee_id = $scope.user.id;
 	   
	   	 //CREAR
	     $scope.putRequest = function() { //create a new company. Issues a POST to /api/companies
	       $scope.requerimiento.$save(function(newData) {
			   $scope.vac_requirements.push(newData);
			   $scope.requerimiento = {};
			   $state.go('main.views.vacations');
	       });
	     };
		 
		 //BORRAR
		 $scope.deleteVacation = function(req_info) { 
 			
			$scope.vacacion = req_info;
 	  		var modalInstance = $modal.open({
 	  			templateUrl: 'vacationContent.html',
 	  			controller: 'ModalVacationCtrl',
 				windowClass: 'small',
 			    resolve: {
 		           vacacion: function () {
 		             return $scope.vacacion;
 		           },
				   vacaciones: function () {
		             return $scope.vac_requirements;
		           }
 		         }
 	  		});
			
 			 modalInstance.result.then(function () {
		    	}, function () {
					console.log('Modal dismissed at: ' + new Date());
		    	});
		 } ///BORRAR
		 
		 //UPDATE APROBAR
 	    $scope.aproveVacation = function(req_info) {
		   $scope.vacacion_update = req_info;
		   $scope.vacacion_update.status = "Aprobado"
 	       $scope.vacacion_update.$update(function(newData) {
			   var index = $scope.vac_requirements.indexOf(req_info);
			   // console.log(index);
			   $scope.vac_requirements[index] = newData;
 	       });
 	     };
		//UPDATE DENIED
  	    $scope.deniedVacation = function(req_info) {
 		   $scope.vacacion_update = req_info;
 		   $scope.vacacion_update.status = "Negado"
  	       $scope.vacacion_update.$update(function(newData) {
 			   var index = $scope.vac_requirements.indexOf(req_info);
 			   // console.log(index);
 			   $scope.vac_requirements[index] = newData;
  	       });
  	     };
		
    })
	
	.controller('ModalVacationCtrl', function ($scope, $modalInstance, vacacion, vacaciones) {

		$scope.vacacion = vacacion;
		$scope.vac_requirements = vacaciones;
		
		$scope.ok = function () {
			vacacion.$delete(function() {
				var index = $scope.vac_requirements.indexOf(vacacion);
				// console.log(index);
				$scope.vac_requirements.splice(index, 1);
				$modalInstance.close(function(){});
			});
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
		
	});
}());
