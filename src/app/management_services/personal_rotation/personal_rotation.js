(function(){
	'use strict';
  
	angular.module('personal_rotation', ['personal_rotation.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.personal_rotation', {
			url 				: '/job_rotation',
			templateUrl	: 'app/management_services/personal_rotation/personal_rotation.tpl.html',
			controller  : 'PersonalRotation.ListController',
			resolve     : {
				personalRotation: function(PersonalRotation){
          return PersonalRotation.index().$promise;
        }
			}
		})
	})
	.controller('PersonalRotation.ListController', ['$rootScope', '$scope', 'personalRotation', '$state', function($rootScope, $scope, personalRotation, $state){
		$scope.personal_rotations   = personalRotation;
		$scope.personalModalData    = '';
		$scope.date_filter 					= ''
		$scope.rotation_type_filter = ''
		$scope.position_filter 			= ''
		$scope.warningMessage       = 'app/management_services/warning.tpl.html';
		$scope.permission_alert 		= '';

		if(angular.isObject($scope.personal_rotations.message)){
			$scope.permission_alert = $scope.personal_rotations.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}else{
			var uniqueVals = [];
	    $.each($scope.personal_rotations.staff_turnover, function(i, value){
	    	$.each(value.rotations, function(i, rotation){
	    		if($.inArray(rotation.date, uniqueVals) === -1) uniqueVals.push(rotation.date);
	    	});
	    });
	    $scope.dates = uniqueVals;
			
			var uniqueVals = [];
			$.each($scope.personal_rotations.staff_turnover, function(i, value){
				$.each(value.rotations, function(i, rotation){
					if($.inArray(rotation.type_rotation, uniqueVals) === -1) uniqueVals.push(rotation.type_rotation);
				});
	    });
	    $scope.rotationTypes = uniqueVals;
			
	    var uniqueVals = [];
			$.each($scope.personal_rotations.staff_turnover, function(i, value){
	      if($.inArray(value.position, uniqueVals) === -1) uniqueVals.push(value.position);
	    });
	    $scope.positions = uniqueVals;
		}

		$scope.showMessagePermission = function(){
			return angular.isObject($scope.personal_rotations.message);
		}

  	$scope.existsPersonalRotation = function(){
  		return parseInt($scope.personal_rotations.staff_turnover.length) !== 0;
    }

		$scope.rotationType = function(value){
			switch(value.toLowerCase()){
				case 't': return 'Traslado';
				case 'r': return 'Retiro';
				case 'i': return 'Ingreso';
			}
		}

		$scope.showModal = function(personal){
			$scope.personalModalData = personal;
			$('#rotation_modal').foundation('reveal', 'open');
		}

	}]);
}());

