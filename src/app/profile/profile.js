(function(){
  'use strict';
  angular.module('profile', [])
  .controller('Profile.ProfileController', ['$scope', 'Employee', function($scope,  Employee ){//, $stateParams, currentUser, Employee, $log){

		$scope.aprobador = [];

		$scope.cargarAprobador = function(identification){
		    $scope.aprobador = Employee.show({id:0, id_posicion: identification});		      
		}
	
	  var expected = ['main.views.certificates_error','main.views.certificates_labor','main.views.certificates_vacations','main.views.certificates_payroll','main.views.certificates_income'];
 
	  $scope.certificatesRoute = function (ubication){
	      var tryout = expected.indexOf(ubication);
	      return tryout > -1 ? true : false;
	  }
		
		$scope.toggleSelection = function(valor){
			$("#audio_btn .fa").toggleClass("fa-volume-up");
			$("#audio_btn .fa").toggleClass("fa-volume-off");
			if (valor){
				$("video").prop('muted', false); //unmute
			}else if (!valor){
				$("video").prop('muted', true); //mute
			}
		}

  }]);
}());

