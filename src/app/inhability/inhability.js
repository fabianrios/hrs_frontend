(function(){
	'use strict';
  
	angular.module('inhability', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.inhabilities', {
			url: '/inhabilities',
			templateUrl: 'app/inhability/inhability.tpl.html',
			controller: 'Inhabilities.ListController',
			resolve: {
				inhabilities_req: function(Inhability_requirement){
					return Inhability_requirement.index().$promise;
				}
			}
		})
	})
	
	.controller('Inhabilities.ListController', function($rootScope, $scope, $http, $state, inhabilities_req, Inhability_requirement, Upload, HRAPI_CONF){

		if($scope.user.company.show_inhabilities ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		// $scope.user = currentUser;
		$scope.inhabilities = inhabilities_req;
		//console.log("$scope.user",$scope.user, "inhabilities: ", $scope.inhabilities);
		
		$scope.tipos = $scope.user.company_type.tipos;
		$scope.only_not_user = [];
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
			return $scope.user.employee.inca_approver != '00000000' &&  $scope.user.employee.inca_approver != null 
		};
		
		// angular.forEach($scope.inhabilities,function(value,index){
		// 	// console.log(value.employee.apply_reviewer,$scope.user.employee_id);
		// 	if (value.employee.apply_reviewer == $scope.user.employee_id){
		// 		$scope.only_not_user.push(value);
		// 	}
		// });
		
		angular.forEach($scope.tipos,function(value,index){
			if (value.idactv == "INCA"){
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
		
		$scope.requerimiento = new Inhability_requirement();  


		$scope.loadImage = function( file ){
			archivo = file;
		}

		$scope.putRequest = function() { //create a new 
            $scope.requerimiento.sending = true;
			Upload.upload({ 
	            	method: 'POST', 
	                url: HRAPI_CONF.apiBaseUrl('/inhability_requirements.json'), 
	                fields: $scope.requerimiento, 
	                file: archivo
	            }).progress(function (evt) { 
	                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            }).success(function (data, status, headers, config) { 
                    $scope.requerimiento.sending = false;
                    $scope.inhabilities = Inhability_requirement.index();
                    $scope.requerimiento = new Inhability_requirement();           
                    $state.go('main.views.inhabilities');
                    $scope.alerts.push({type: 'success', msg: "La incapacidad a sido guardada"});
                    window.setTimeout(function() {
                        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                          $(this).remove();
                          $rootScope.alerts = [];
                        });
                    }, 5000);
	            }).error(function (data, status, headers, config) {                    
					$rootScope.showMessageErrorRails(data);
                    $scope.requerimiento.sending = false;
                });
		};
		
	
		$scope.deleteInhability = function(inhability,modal) { 
			inhability.$destroy(function() {
				$scope.inhabilities = Inhability_requirement.index();
				$('#myModal-'+modal).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "La inhabilidad del "+ inhability.start_date  + " al "+ inhability.end_date +" a sido borrada"});
		        window.setTimeout(function() {
			          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			            $(this).remove();
			            $scope.alerts = [];
			          });
		        }, 5000);
			});			
		} 
		
		
	})
	
}());

