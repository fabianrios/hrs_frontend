(function(){
	'use strict';
	angular.module('seizures', ['embargo.service'])
	.config(['$stateProvider',function($stateProvider) {
		$stateProvider
		.state('main.views.seizures', {
			url 		: '/seizures',
			templateUrl	: 'app/seizures/seizures.tpl.html',
			controller  : 'Seizures.ListController',
			resolve     : {
				embargo: function(Embargoes){
          return Embargoes.index().$promise;
        }
			}
		})
	}])
	.controller('Seizures.ListController', ['$scope', '$filter', 'embargo', function($scope, $filter, embargo){
		$scope.embargoes = embargo.embargoes;
		$scope.payroll_date_filter = ''
		$scope.titleReport  = 'no existen consultas';
		$scope.titleReport2 = "asociadas";

		//###START###
		$scope.position_filter      = parseInt($scope.embargoes.length);
		$scope.employeeData         = $scope.embargoes;
		$scope.predicate 						= '';
    $scope.reverse   						= true;
    $scope.registers 			      = $scope.embargoes;
    $scope.registersCountByPage = 5;
    //
    $scope.date_reverse = true;

    $scope.existsPageBehind = function(){
    	console.log('existsPageBehind: ')
  		return $scope.registers.length / $scope.registersCountByPage > 1;
    }

    $scope.existsPageForward = function(){

    }

    $scope.filters = ['payroll_date_filter', 'desga'];

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

    $scope.periodSorting = function(filter_id){
    	$scope.date_reverse = ($scope.predicate === filter_id) ? !$scope.date_reverse : false;
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
		
		$scope.existsSeizures = function(){
			return $scope.embargoes.length !== 0;			
		}

		$scope.dateFilter = function(value){
			var filterValue = $filter('filter')($scope.embargoes, {fpper: value});
			return filterValue.length >= 1 ? filterValue.length + 1 : 0;
  	}

  	var uniqueVals = [];
  	var payroll_dates = [];
    $.each($scope.embargoes, function(i, value){
      //if($.inArray(value.fpper.trim(), uniqueVals) === -1) uniqueVals.push(value.fpper.trim());
      if ($.inArray(value.fpper.trim(), uniqueVals) === -1) {
      	uniqueVals.push(value.fpper.trim());
    		payroll_dates[i] = {
    			value: value.fpper.trim()
    		}
      }
    });
    $scope.payroll_dates = payroll_dates;

		var uniqueVals = [];
		$.each($scope.embargoes, function(i, value){
      if($.inArray(value.desga, uniqueVals) === -1) uniqueVals.push(value.desga);
    });
    $scope.payroll_concepts = uniqueVals;
	}]);
}());