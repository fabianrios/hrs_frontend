(function(){
	'use strict';
  
	angular.module('variance_analysis', ['variance_analysis.service'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.variance_analysis', {
			url 		: '/variance_analysis',
			templateUrl	: 'app/management_services/variance_analysis/variance_analysis.tpl.html',
			controller  : 'VarianceAnalysis.ListController',
			resolve     : {
				varianceAnalysis: function(VarianceAnalysis){
          return VarianceAnalysis.index().$promise;
        }
			}
		})
	})
	.controller('VarianceAnalysis.ListController', ['$rootScope', '$scope', '$filter', 'varianceAnalysis', function($rootScope, $scope, $filter, varianceAnalysis){
		console.log(varianceAnalysis);
		$scope.variance_analysis = varianceAnalysis.variace_analysis;
		$scope.employeeData    = '';


		$scope.existsVarianceAnalysis = function(){
			return true;
		}

		$scope.showModal = function(variance){
			$scope.employeeData = variance;
			$('#variance_modal').foundation('reveal', 'open');
		}

		$scope.getValueFormat = function(value, format, currency){
			if(format == 'porcentage'){
				return value + ' %';
			}else if(format == 'currency'){
				return $filter('currency')(value, currency+" $", 0);
			}
		}

		/*
		$scope.personal_rotations   = personalRotation;
		$scope.date_filter 					= ''
		$scope.rotation_type_filter = ''
		$scope.position_filter 			= ''
		$scope.warningMessage       = 'app/management_services/warning.tpl.html';

		if($scope.personal_rotations.staff_turnover.length == 0){
			$state.transitionTo('main.views.dashboard');
  	}

  	$scope.existsPersonalRotation = function(){
  		//return parseInt($scope.personal_rotations.staff_turnover.length) != 0
  		return 0 != 0
    }

		$scope.rotationType = function(value){
			switch(value.toLowerCase()){
				case 't': return 'Traslado';
				case 'r': return 'Retiro';
				case 'i': return 'Ingreso';
			}
		}

		

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
    */
	}]);
}());

