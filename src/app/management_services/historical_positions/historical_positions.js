(function(){
	'use strict';
  
	angular.module('historical_positions', ['historical_positions.service', 'analytics.mixpanel'])
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.historical_positions', {
			url 				: '/historical_positions',
			templateUrl	: 'app/management_services/historical_positions/historical_positions.tpl.html',
			controller  : 'HistoricalPositions.ListController',
			resolve     : {
				historicalPositions: function(HistoricalPositions){
          return HistoricalPositions.index().$promise;
        }
			}
		})
	})
	.controller('HistoricalPositions.ListController', ['$rootScope', '$scope', '$filter', 'historicalPositions', '$state', '$mixpanel', 'HRAPI_CONF', function($rootScope, $scope, $filter, historicalPositions, $state, $mixpanel, HRAPI_CONF){
		if (!HRAPI_CONF.isDevelopment){
			$mixpanel.track("Management Services - Historical Positions", {
	      "user_id": 		 $scope.user.id,
	    	"$pernr": 		 $scope.user.employee.identification,
		    "$email": 	   $scope.user.email,
		    "$date_time":  new Date(),
		    "$first_name": $scope.user.employee.name,
		    "$last_name":  $scope.user.employee.lastname,
		    "company_id":  $scope.user.company_id,
		    "app_version": 1
	    });
		}
		$scope.historical_positions = historicalPositions.historical_positions;
		$scope.warningMessage       = 'app/management_services/warning.tpl.html';
		$scope.permission_alert 		= '';
		$scope.data 								= {};

		//###START###
		$scope.position_filter      = parseInt($scope.historical_positions[0]);
		$scope.employeeData         = $scope.historical_positions[0]
		$scope.predicate 						= '';
    $scope.reverse   						= true;
    $scope.registers 			      = $scope.historical_positions;
    $scope.registersCountByPage = 5;

    $scope.existsPageBehind = function(){
    	console.log('existsPageBehind: ')
  		return $scope.registers.length / $scope.registersCountByPage > 1;
    }

    $scope.existsPageForward = function(){

    }

    $scope.filters = ['employee_pernr', 'employee_name', 'position'];

    function removeSort(filter_id){
			var uniqueVals = [];
			var isHeader = $('#'+filter_id).hasClass('header');
    	var isUp     = $('#'+filter_id).hasClass('header headerSortUp');
    	var isDown   = $('#'+filter_id).hasClass('header headerSortDown');

	    $.each($scope.filters, function(i, value){
	    	if(value === filter_id){
	    		if(isDown){
						$('#'+filter_id).removeClass('header headerSortDown').addClass('header');
			  	}else if(isUp){
			  		$('#'+filter_id).removeClass('header headerSortUp').addClass('header');
			  	}
	    	}
	    });
    }

    $scope.sorting = function(filter_id){
    	$scope.reverse = ($scope.predicate === filter_id) ? !$scope.reverse : false;
    	$scope.predicate = filter_id;

    	$.each($scope.filters, function(i, value){
	    	if(value !== filter_id){
	    		var isHeader = $('#'+value).hasClass('header');
		    	var isUp     = $('#'+value).hasClass('header headerSortUp');
		    	var isDown   = $('#'+value).hasClass('header headerSortDown');
	    		if(isDown){
						$('#'+value).removeClass('header headerSortDown').addClass('header');
			  	}else if(isUp){
			  		$('#'+value).removeClass('header headerSortUp').addClass('header');
			  	}
	    	}
	    });

	    var isHeader = $('#'+filter_id).hasClass('header');
    	var isUp     = $('#'+filter_id).hasClass('header headerSortUp');
    	var isDown   = $('#'+filter_id).hasClass('header headerSortDown');

    	if(isDown){
				$('#'+filter_id).removeClass('header headerSortDown').addClass('header headerSortUp');
    	}else if(isUp){
    		$('#'+filter_id).removeClass('header headerSortUp').addClass('header headerSortDown');
    	}else{
    		$('#'+filter_id).removeClass('header').addClass('header headerSortUp');
    	}
    }

    $scope.rowspanFilter = function(employee){
			return employee.historical.length >= 1 ? employee.historical.length + 1 : 0;
  	}
		//###END###

		if(angular.isObject(historicalPositions.message)){
			$scope.permission_alert = historicalPositions.message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}else{
			$scope.data.position_filter = parseInt($scope.historical_positions[0]);
			$scope.employeeData         = $scope.historical_positions[0]
		}
		
		$scope.showMessagePermission = function(){
			return angular.isObject(historicalPositions.message);
		}

		$scope.existsHistoricalPositions = function(){
  		return parseInt($scope.historical_positions.length) !== 0;
    }
  	
		$scope.employeeFilter = function(){
			$scope.employeeData = $scope.historical_positions[$scope.data.position_filter];
		}
		
		$scope.diffDates = function(date_1, date_2){
			var dates       = date_2.split('-');
			var date1 		  = new Date(date_1);
			var date2 		  = dates[0] == 9999 ? new Date() : new Date(date_2);
			var months      = (date2.getFullYear() * 12 + date2.getMonth()) - (date1.getFullYear() * 12 + date1.getMonth());
			var years       = parseInt(months / 12);
			var restMonths  = parseInt(months - (years * 12));
			var time_string = '';

			if(years != 0){
				time_string += years;
				time_string += years > 1 ? ' años' : ' año';
			}
			if(restMonths != 0){
				time_string += time_string != '' ? ' y '+restMonths : restMonths;
				time_string += restMonths > 1 ? ' meses' : ' mes';
			}
			return time_string;
		}

		$scope.validateDateNow = function(date){
			var dates = date.split('-');
			if(dates[0] == 9999){
				return 'Actualidad';
			}
			return $filter('date')(date, "dd/MM/yyyy");
		}
		
	}]);
}());

