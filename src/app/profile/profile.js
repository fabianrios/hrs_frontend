(function(){
  'use strict';

  angular.module('profile', [])

    .controller('Profile.ProfileController', function($scope){//, $stateParams, currentUser, Employee, $log){

		// $scope.user = currentUser;
		// $scope.aprobador = [];
		// //aprobador
		
		// $scope.cargarAprobador = function(identification){
		//       $scope.aprobador = Employee.show({id:identification, id_posicion: identification});
		//       $log.info($scope.aprobador);
		// }
		
		// 	// 	    angular.forEach($scope.employees,function(value){
		// 	// console.log(value.identification,$scope.user.employee.apply_reviewer);
		// 	// if (value.identification == $scope.user.employee.apply_reviewer){
		// 	// 	console.log("found it!")
		// 	// 	$scope.aprobador.push(value);
		// 	// 	break;
		// 	// }else {
		// 	// 	console.log("Nop!")
		// 	// 	$scope.aprobador = ["No tiene aprobador"];
		// 	// 	break;
		// 	// }
		// 	// 	    });
		
		// // $scope.aprobador = $scope.aprobador[0];
		
		// // console.log($scope.aprobador);
		
		// $scope.audiobutton = false;	
		
		// $scope.toggleSelection = function(valor){
		// 	$("#audio_btn .fa").toggleClass("fa-volume-up");
		// 	$("#audio_btn .fa").toggleClass("fa-volume-off");
		// 	if (valor){
		// 		$("video").prop('muted', false); //unmute
		// 		// console.log(valor, "unmute");
		// 	}else if (!valor){
		// 		$("video").prop('muted', true); //mute
		// 		// console.log(valor, "mute");
		// 	}
		// }
		
		// // $scope.$watch(
		// //       function() {
		// //         return $scope.audiobutton;
		// // 		console.log("first",$scope.audiobutton);
		// //       },function() {
		// // 		  if ($scope.audiobutton){
		// // 		  	$("video").prop('muted', false); //unmute
		// // 			console.log("muted");
		// // 		  }else{
		// // 		  	$("video").prop('muted', true); //mute
		// // 			console.log("unmuted");
		// // 		  }
		// //     });
		// //
    });
}());

