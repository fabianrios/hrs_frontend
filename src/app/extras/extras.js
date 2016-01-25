(function(){
	'use strict';
  
	angular.module('extras', ['extra_requirement.service', 'ui.date'])

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
	
	.controller('Extras.ListController', ['$rootScope', '$scope', '$http', '$state', 'extras_req', 'Extra_requirement', 'HRAPI_CONF', function($rootScope, $scope, $http, $state, extras_req,  Extra_requirement, HRAPI_CONF){

		if($scope.user.company.show_hoex ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		// $scope.user = currentUser;
		$scope.extras = extras_req;
		
		// $scope.tipos = $scope.user.company_type.tipos;
		$scope.options = [];

		$scope.exiteAprobador = function(){
			return $scope.user.employee.hoex_approver != '00000000' &&  $scope.user.employee.hoex_approver != null 
		};
		
		angular.forEach($scope.user.company_type.tipos,function(value,index){
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
			return description;
		};
		
		$scope.requerimiento = new Extra_requirement();  

		$scope.putRequest = function() { //create a new vacation. Issues a POST to /api/vacations
			$scope.requerimiento.sending = true;   
			$scope.requerimiento.$save(function(newData) {
				$scope.extras = Extra_requirement.index()
				$scope.requerimiento = new Extra_requirement();
				$scope.requerimiento.sending = false;   
				$state.go('main.views.extras');
				$scope.alerts.push({type: 'success', msg: "La hora extra a sido guardada"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			}, function(data) {
				$scope.requerimiento.sending = false;              
		        $scope.showMessageErrorRails(data);
		    });
		};
		
		//BORRAR
		$scope.deleteExtra = function(extra,modal) { 
			extra.$destroy(function() {
				$scope.extras = Extra_requirement.index()
				$('#myModal-'+modal).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "El registro de "+ extra.fecha  + " con "+ extra.hours +" horas a sido borrado"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});			
		}; ///BORRAR
	}])
}());

