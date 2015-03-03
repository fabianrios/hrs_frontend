(function(){
  'use strict';

  angular.module('expandbanner', [])

    .controller('Expandbanner.ExpandbannerController', function($scope, $state, currentUser){
	  	  
	$scope.elusuario = currentUser;
	$scope.user = currentUser;
	$scope.vacation = $scope.user.vacation;
	$scope.employee_info = $scope.user.employee_info;
	$scope.vacationdates = $scope.vacation.detalle;
	console.log($scope.vacationdates);
	$scope.disponibles = parseInt($scope.vacation.resumen[1]);
	$scope.usados = parseInt($scope.vacation.resumen[2]);
	  
	  var thedates;
	  $scope.elusuario.$promise.then(function(items){
			thedates = items.vacation.detalle;
	 		$.datepicker.regional['es'] = {
	 		  closeText: 'Cerrar',
	 		  prevText: 'anterior',
	 		  nextText: 'siguiente',
	 		  currentText: 'Hoy',
	 		  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	 		  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	 		  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	 		  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
	 		  dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
	 		  weekHeader: 'Sm',
	 		  dateFormat: 'dd/mm/yy',
	 		  firstDay: 1,
	 		  isRTL: false,
	 		  showMonthAfterYear: false,
	 		  yearSuffix: ''
	 		};
	 		$.datepicker.setDefaults($.datepicker.regional['es']);
	 		// console.log(thedates, thedates.length);
	 		var y = new Date(thedates[thedates.length-1][1]); 
			$( "#inicio" ).datepicker();
			$( "#final" ).datepicker();
	 	    $( "#vacaciones" ).datepicker({
	 			numberOfMonths: 2,
	 			defaultDate: y,
	 			beforeShowDay: highlightDays
	 	    });
			
			function highlightDays(d)
			{
			    for (var i = 0; i < thedates.length; i++) {
					// console.log(new Date((thedates[i][0]));
			      if (new Date(thedates[i][0]) <= d && d <= new Date(thedates[i][1])) {
					  if  (new Date(thedates[i][0]) == d) { 
	  			      	return [true, 'inicio', 'inicio-vacaciones']; 
	  			      } else{
						return [true, 'Highlighted', 'vacaciones']; // [0] = true | false if this day is selectable, [1] = class to add, [2] = tooltip to display
	  			      }
			      }
			    }
 
			    return [true, ''];
			}
			
	  });
		
		
		
    });
}());
