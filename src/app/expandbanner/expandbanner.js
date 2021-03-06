(function(){
  'use strict';
  angular.module('expandbanner', [])
  .controller('Expandbanner.ExpandbannerController', ['$scope', '$state', function($scope, $state){

  	$( "#datepicker" ).datepicker();

		$scope.elusuario = $scope.user;	
		$scope.vacation = $scope.user.vacation;    

	  $scope.privateValidation = function(priv){
      if(priv == "X" && $scope.user.employee.see_all_dm != "true"){
        return "hide"
      }
      else{
        return "show"
      }
		}
	
		//CESANTIAS
		$scope.saldos = $scope.user.saldos;
	    // meter las cesantias
		$scope.betrg = [];
		$scope.fpend = [];
		$scope.newbetrg = [];
    $scope.elsaldocesantias = $scope.saldos.saldo;
    // $scope.intcesantias = $scope.saldos.intsaldo;
     // Intereses de cesantias a numeros


     // meter las int. cesantias     


   
	

    // meter las cesantias
    angular.forEach($scope.saldos.t_cesantias,function(value){
      $scope.betrg.push(value.betrg);
      $scope.fpend.push(value.fpend);
    });
    // saldo de cesantias a numeros
    $scope.betrg.forEach(function(entry, index) {
        $scope.newbetrg[index] = parseInt(entry);
        if( index === 0){
            $scope.elsaldocesantias = parseInt(entry);
        }
    });
	
    // meter las int. cesantias     
    $scope.intbetrg = [];
    $scope.intfpend = [];
		$scope.intnewbetrg = [];
	  angular.forEach($scope.saldos.t_intcesantias,function(value){
      $scope.intbetrg.push(value.betrg);
      $scope.intfpend.push(value.fpend);
    });
  
    // Intereses de cesantias a numeros    
		$scope.intbetrg.forEach(function(entry, index) {
        $scope.intnewbetrg.push(parseInt(entry));
        if( index === 0){
            $scope.intcesantias = parseInt(entry);
        }
    });
	
		// esto esta por el rootscope de employee_info
		// $scope.employee_info = $scope.user.employee_info;
		$scope.vacationdates = $scope.vacation.detalle;
		if 	($scope.user.vacation != null){
			$scope.disponibles = parseInt($scope.vacation.resumen[2]);
			$scope.usados = parseInt($scope.vacation.resumen[1]);
		}else{
			$scope.disponibles = [];
			$scope.usados = [];
		}

		var thedates;


	  // $scope.elusuario.$promise.then(function(items){
		$scope.fecha_calendar = function(){
			thedates = $scope.user.vacation.detalle;		
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

	 		// console.log(y);
			
			var number = 2;
			if (screen.width < 700){
				number = 1;
			}else{
				number = 2;
			}

 	    $( "#vacaciones" ).datepicker({
	 			numberOfMonths: number,
	 			defaultDate: y,
	 			beforeShowDay: highlightDays
 	    });
			
			// console.log(angular.element("#vacaciones").datepicker()); 
			function highlightDays(d){
				console.log("ïngreso");
				console.log(d);				
			    for (var i = 0; i < thedates.length; i++) {
			    	console.log(thedates[i]);
					console.log(new Date((thedates[i][0])));
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
			
	  // });
		}
		$scope.fecha_calendar();
  }]);
}());
