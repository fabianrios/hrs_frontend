(function(){
	'use strict';
  
	angular.module('notifications', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.notifications', {
			url: '/notifications',
			templateUrl: 'app/notifications/notifications.tpl.html',
			controller: 'Notifications.ListController'			
		})
	})	
	.controller('Notifications.ListController', ['$scope', '$http', '$state', 'HRAPI_CONF', function($scope, $http, $state, HRAPI_CONF){
		//$state.transitionTo('main.views.dashboard');
    	// $scope.user = currentUser;
    $scope.notificaciones = $scope.user.employee.notifications ? $scope.user.employee.notifications : "Semanal";
		
    // $scope.employee = $scope.user.employee;
    
    
    $scope.changedValue = function(item){

      $scope.employee.notifications = item;   
      
		$http({method: 'PUT', 
			url: HRAPI_CONF.apiBaseUrl('/employees/')+$scope.employee.id+".json",
			data: { employee: { notifications: $scope.employee.notifications } }
		})
		.success( function( data, status ) {
			console.log("Se actualizarón las notificaciones a", data);
			$scope.alerts.push({type: 'success', msg: "Se actualizarón la frecuencia de las notificaciones a " + $scope.employee.notifications});
              window.setTimeout(function() {
                $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
                  $(this).remove();
                  $rootScope.alerts = [];
                });
              }, 5000);

		})
		.error( function( data, status ) {
			// errorService.failure( data, status, $scope);
			console.log("error", status, data.errors, $scope);
		});
      
    }
    

    
// 		// $scope.articles = articles.articles;
// 		// $scope.articles_not_mine = [];
// 		$scope.vac_requirements = vac_requirements;
// 		$scope.extras_requirements = extras_requirements;
// 		$scope.inhabilities_requirements = inhabilities_requirements;
// 		$scope.licenses_requirements = licenses_requirements;
// 		$scope.only_not_user = [];
// 		$scope.extras_not_user = [];
// 		$scope.inhabilities_not_user = [];
// 		$scope.licenses_not_user = [];
//         $scope.extras_history = [];
// 		$scope.vac_history = [];
// 		$scope.dm_history = [];
// 		$scope.inhabilities_history = [];
// 		$scope.licenses_history = [];
//         $scope.toapproved = [];
    
// 		// // sacar todos los articulos publicados que NO son mios
// 		// angular.forEach($scope.articles, function(value, key) {
// 		// 	var i = $scope.articles.indexOf(value);
// 		// 	if (value.employee_id != 1){
// 		// 		$scope.articles_not_mine.push(value);
// 		// 	}
// 		// });

// 		// $scope.articles_not_mine = Notification.articles( {id: currentUser.employee.identification });
// 		//vacaciones pendientes
// 		angular.forEach($scope.vac_requirements,function(value,index){
// 			if (value.employee.vaca_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
// 				$scope.only_not_user.push(value);
// 			}else if (value.employee.id_posicion == $scope.user.employee.id_posicion && value.status != "Espera"){
// 			  $scope.vac_history.push(value);
// 			}
// 		});
		
// 		//extras pendientes
// 		angular.forEach($scope.extras_requirements,function(value,index){			
// 			if (value.employee.hoex_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
// 				$scope.extras_not_user.push(value);
// 			}else if (value.employee.id_posicion == $scope.user.employee.id_posicion && value.status != "Espera"){
// 			  $scope.extras_history.push(value);
// 			}
// 		});

//         // datos maestros
// 		angular.forEach(infos, function(value, key) {		
// 			var value_1 = '';
// 			if(value.boss != null){
// 				value_1 = value.boss.toString();
// 			}			
// 			var value_2 = '';
// 			if($scope.user.employee.id_posicion != null){
// 				value_2 = $scope.user.employee.id_posicion.toString();
// 			}
// 			if (value_1 ===  value_2 && (value.approved === false || value.approved === 'false' )){
// 				$scope.toapproved.push(value);
// 			}
// 		});
               
// //		angular.forEach(infos, function(value, key) {            
// //			if (value.employee.dams_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
// //				$scope.toapproved.push(value);
// //			}else if (value.employee.id_posicion == $scope.user.employee.id_posicion && value.approved) {
// //				$scope.dm_history.push(value);
// //			}
// //		});
		
// 		//inhabilidades pendientes
// 		angular.forEach($scope.inhabilities_requirements,function(value,index){
// 			if (value.employee.inca_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
// 				$scope.inhabilities_not_user.push(value);
// 			}else if (value.employee.id_posicion == $scope.user.employee.id_posicion && value.status != "Espera"){                
// 				$scope.inhabilities_history.push(value);
// 			}
// 		});
		
// 		//licencias pendientes
// 		angular.forEach($scope.licenses_requirements,function(value,index){
// 			if (value.employee.perm_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
// 				$scope.licenses_not_user.push(value);
// 			}else if (value.employee.id_posicion == $scope.user.employee.id_posicion && value.status != "Espera"){
// 				$scope.licenses_history.push(value);
// 			}
// 		});
		
// //		console.log($scope.vac_requirements, $scope.licenses_history);

	}])
}());