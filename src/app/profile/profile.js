(function(){
  'use strict';
  angular.module('profile', [])
  .controller('Profile.ProfileController', ['$scope', 'Employee', function($scope,  Employee ){//, $stateParams, currentUser, Employee, $log){

		$scope.aprobador 			  = [];
		$scope.dataContactModal = '';
		$scope.classContacModal = '';

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

		$scope.contactModal = function(data, type){
			$scope.classContacModal = type == 'phone' ? 'fa fa-phone' : 'fa fa-envelope-o';
			$scope.dataContactModal = data;
			$('#employee_contact_data_modal').foundation('reveal','open');
		}

		$scope.showIconContact = function(data){
			if(data == null || data == ''){
				return true;	
			}else{
				return false;
			}
		}

        $scope.success = function () {
        	$("#msgCopied").fadeIn();
        	$scope.msgCopied = "Copiado!";
        	$scope.viewMsg = true;
        	setTimeout(function(){
        		$scope.msgCopied = "";
        		$scope.viewMsg = false;
        		$("#msgCopied").fadeOut();
        	},1000);
        };

        $scope.fail = function (err) {
        	$("#msgCopied").fadeIn();
        	$scope.msgCopied = "Error!" + err;
        	$scope.viewMsg = true;
        	setTimeout(function(){
        		$scope.msgCopied = "";
        		$scope.viewMsg = false;
        		$("#msgCopied").fadeOut();
        	},4000);
        };

  }]);
}());

