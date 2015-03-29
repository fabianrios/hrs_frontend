(function(){
  'use strict';

  angular.module('profile', [])

    .controller('Profile.ProfileController', function($scope, $stateParams, currentUser, employees){

		$scope.user = currentUser;
		$scope.employees = employees;
		$scope.aprobador = [];
		//aprobador
	    angular.forEach($scope.employees,function(value){
			// console.log(value.identification,$scope.user.employee.boss);
			if (value.identification == $scope.user.employee.boss){
				$scope.aprobador.push(value);
			}
	    });
		
		$scope.aprobador = $scope.aprobador[0];
		
		console.log($scope.aprobador);
		
		$scope.audiobutton = false;	
		
		$scope.toggleSelection = function(valor){
			$("#audio_btn .fa").toggleClass("fa-volume-up");
			$("#audio_btn .fa").toggleClass("fa-volume-off");
			if (valor){
				$("video").prop('muted', false); //unmute
				console.log(valor, "unmute");
			}else if (!valor){
				$("video").prop('muted', true); //mute
				console.log(valor, "mute");
			}
		}
		
		// $scope.$watch(
		//       function() {
		//         return $scope.audiobutton;
		// 		console.log("first",$scope.audiobutton);
		//       },function() {
		// 		  if ($scope.audiobutton){
		// 		  	$("video").prop('muted', false); //unmute
		// 			console.log("muted");
		// 		  }else{
		// 		  	$("video").prop('muted', true); //mute
		// 			console.log("unmuted");
		// 		  }
		//     });
		//
    });
}());

