(function(){
	'use strict';
  
	angular.module('managment', [
		'gantt',
	    'gantt.tooltips',
	    'gantt.bounds',
	    'gantt.table',
	    'gantt.resizeSensor'
	])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.managment', {
			url: '/managment',
			templateUrl: 'app/managment/managment.tpl.html',
			controller: 'Managment.ListController'
		})
	})
	
	.controller('Managment.ListController', ['$scope', '$http', '$state', '$log', 'moment', function($scope, $http, $state, $log, moment){
		
		// $scope.user = currentUser;
		$scope.data = [
		    {name: 'Talero Heidi Liliana', tasks: [
		        {name: 'Vacaciones (4) Días', color: '#9AECA5', from: new Date("2015-02-02"), to: new Date("2015-02-09")},
		        ]
		    },
		    {name: 'Martinez Andrea', color: 'rgba(195, 234, 153,.1)', tasks: [
		        {name: 'Vacaciones (4) Días', color: 'rgb(195, 234, 153)', from: new Date("2015-01-05"), to: new Date("2015-01-09")},
		        {name: 'Vacaciones (10) Días', color: 'rgb(195, 234, 153)', from: new Date("2015-06-08"), to: new Date("2015-06-12")}
		      ]
		    },
		    {name: 'Torres Ortega John Alvaro', tasks: [
		        {name: 'Vacaciones (4) Días', color: 'rgb(202, 219, 255)', from: new Date("2015-01-05"), to: new Date("2015-01-09")},
		        {name: 'Vacaciones (10) Días', color: 'rgb(202, 219, 255)', from: new Date("2015-02-23"), to: new Date("2015-03-06")},
				{name: 'Vacaciones (6) Días', color: 'rgb(202, 219, 255)', from: new Date("2015-03-20"), to: new Date("2015-03-30")}
		        ]
		    },
		    {name: 'Velazquez Velazquez Julian David', tasks: [
		        {name: 'Vacaciones (10) Días', color: 'rgb(108, 196, 235)', from: new Date("2015-01-05"), to: new Date("2015-01-16")},
		        {name: 'Vacaciones (4) Días', color: 'rgb(108, 196, 235)', from: new Date("2015-01-19"), to: new Date("2015-01-23")}
		      ]
		    },
			{name: 'Rodas Ruben', tasks: [
		        {name: 'Vacaciones (4) Días', color: 'rgb(157, 249, 224)', from: new Date("2015-01-05"), to: new Date("2015-01-09")},
		        {name: 'Vacaciones (10) Días', color: 'rgb(157, 249, 224)', from: new Date("2015-02-05"), to: new Date("2015-02-15")}
		      ]
		    },
			{name: 'Zarrate Amalia', tasks: [
		        {name: 'Vacaciones (4) Días', color: 'rgb(244, 250, 24)', from: new Date("2015-01-19"), to: new Date("2015-01-23")},
		        {name: 'Vacaciones (10) Días', color: 'rgb(244, 250, 24)', from: new Date("2015-02-16"), to: new Date("2015-02-23")}
		      ]
		    },
			{name: 'Valderrama Palacio Carlos Alberto', tasks: [
		        {name: 'Vacaciones (4) Días', color: 'rgb(255, 197, 47)', from: new Date("2015-01-05"), to: new Date("2015-01-09")},
		        {name: 'Vacaciones (10) Días', color: 'rgb(255, 197, 47)', from: new Date("2015-02-19"), to: new Date("2015-02-23")}
		      ]
		    },
			{name: 'Calderon Pinzón Carmen Cecilia', tasks: [
		        {name: 'Vacaciones (4) Días', color: 'rgb(255, 141, 45)', from: new Date("2015-01-05"), to: new Date("2015-01-08")},
		        {name: 'Vacaciones (10) Días', color: 'rgb(255, 141, 45)', from: new Date("2015-02-15"), to: new Date("2015-02-12")}
		      ]
		    }
		];
		
		$scope.options = {
			thescale: ['day', 'week', '2 weeks', 'month', 'quarter', '6 months', 'year'],
			mode: 'custom',
			scale: 'week',
			sortMode: undefined,
			sideMode: 'TreeTable',
			daily: false,
			maxHeight: false,
			width: false,
			zoom: 1,
			columns: ['name', 'from', 'to'],
			treeTableColumns: ['from', 'to'],
			columnsHeaders: {'name' : 'Name', 'from': 'From', 'to': 'To'},
			columnsClasses: {'name' : 'gantt-column-name', 'from': 'gantt-column-from', 'to': 'gantt-column-to'},
			columnsFormatters: {
			    'from': function(from) {
			        return from !== undefined ? from.format('lll') : undefined;
			    },
			    'to': function(to) {
			        return to !== undefined ? to.format('lll') : undefined;
			    }
			},
			treeHeaderContent: '<i class="fa fa-align-justify"></i> Empleados',
			autoExpand: 'none',
			taskOutOfRange: 'truncate',
			fromDate: moment(null),
			toDate: undefined,
			allowSideResizing: true,
			labelsEnabled: true,
			currentDate: 'line',
			currentDateValue: new Date(2015, 2, 23, 11, 20, 0),
			draw: false,
			readOnly: false,
			filterTask: '',
			filterRow: '',
			timeFramesNonWorkingMode: 'visible',
			columnMagnet: '15 minutes',
			timeFramesMagnet: true,
		}		
		console.log("$scope.data",$scope.data);
	}])
}());

