(function(){
  'use strict';

  angular.module('profile', [])

    .controller('Profile.ProfileController', function($scope,  Employee ){//, $stateParams, currentUser, Employee, $log){

		$scope.aprobador = [];

		$scope.cargarAprobador = function(identification){
		    $scope.aprobador = Employee.show({id:0, id_posicion: identification});		      
		}
	
		
		$scope.toggleSelection = function(valor){
			$("#audio_btn .fa").toggleClass("fa-volume-up");
			$("#audio_btn .fa").toggleClass("fa-volume-off");
			if (valor){
				$("video").prop('muted', false); //unmute
				// console.log(valor, "unmute");
			}else if (!valor){
				$("video").prop('muted', true); //mute
				// console.log(valor, "mute");
			}
		}

    });
}());

