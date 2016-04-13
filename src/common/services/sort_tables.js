(function(){
	'use strict';

	angular.module('sort_tables.service', [])
	.service('sortTables', ['$filter', function($filter){
		this.position_filter      = null; //parseInt($scope.embargoes.length)
		this.predicate 						= '';
    this.reverse   						= true;
    this.registers 			      = null; //$scope.embargoes
    this.registersCountByPage = 5;
    this.filters 							= [];
    this.date_reverse 				= true;

    this.getDateFilter = function(value){
    	var dates = value.split('/');
    	var date = dates[1]+'/'+dates[0]+'/'+dates[2];
			return $filter('date')(new Date(date), 'yyyy-MM-dd');
  	}

    this.existsPageBehind = function(){
  		return this.registers.length / this.registersCountByPage > 1;
    }

    this.existsPageForward = function(){

    }

		this.getDateReverse = function () {
    	return this.date_reverse;
    }

    this.getReverse = function(){
    	return this.reverse;
    }

    this.getPredicate = function(){
    	return this.predicate;
    }

    this.periodSorting = function(filter_id){
    	this.date_reverse = (this.predicate === filter_id) ? !this.date_reverse : false;
    	this.sort(filter_id);
    }
		
    this.sorting = function(filter_id){
    	this.reverse = (this.predicate === filter_id) ? !this.reverse : false;
    	this.sort(filter_id);
    }

    this.sort = function (filter_id){
    	this.predicate = filter_id;

    	$.each(this.filters, function(i, value){
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

    this.rowspanFilter = function(employee){
			return employee.historical.length >= 1 ? employee.historical.length + 1 : 0;
  	}

  	function removeSort(filter_id){
			var uniqueVals = [];
			var isHeader = $('#'+filter_id).hasClass('header');
    	var isUp     = $('#'+filter_id).hasClass('header headerSortUp');
    	var isDown   = $('#'+filter_id).hasClass('header headerSortDown');

	    $.each(this.filters, function(i, value){
	    	if(value === filter_id){
	    		if(isDown){
						$('#'+filter_id).removeClass('header headerSortDown').addClass('header');
			  	}else if(isUp){
			  		$('#'+filter_id).removeClass('header headerSortUp').addClass('header');
			  	}
	    	}
	    });
    }
	}]);
}());