(function(){
	'use strict';
	angular.module('dashboard', [])

	.config(function($stateProvider){
		$stateProvider
		.state('main.views.dashboard', {
			url: '/home',
			templateUrl: 'app/dashboard/dashboard.tpl.html',
			controller: 'Dashboard.MainController',
			resolve: {
				widgets: function(){
					return {
						items: [
							{ name: "Mis días de vacaciones", config: { param_a: "abc", param_b: "Días que a la liquidación de la ultima nomina tiene disponibles y usados por este concepto." }},
							{ name: "Mis cesantías", config: { param_a: "def", param_b: "Valor que a la liquidación de la ultima nomina tiene causados en la compañía. Este valor sera consignado al Fondo de Cesantias antes del 14 de Febrero de cada año." }},
							{ name: "Mis inters. de cesantías", config: { param_a: "ghi", param_b: "Valor de los intereses a las cesantias causados a 31 de Diceimbre de cada año." }},
						]
					}
				},
				ingresos: function(){
					return {
						items: [
							{ name: "Mis Ingresos y Deducciones", config: { param_a: "abc", param_b: "Los ingresos hacen referecia a la remuneracion economica que recibe el empleado. Las Deducciones son los descuentos que le realiza la empresa al empleado por concepto de aporte a seguridad social, préstamos, entre otros." }}
						]
					}
				},
				workers: function(){
					return {
						items: [
							{ name: "Cumpleaños del mes", config: { param_a: "abc", param_b: "Empleados que cumplen años en último mes." }},
							{ name: "Aniversario laboral", config: { param_a: "def", param_b: "Fecha en la cual el empleado cumple año(s) de ingreso a la compañía." }},
							{ name: "Empleados nuevos del mes", config: { }}
						]
					}
				},
				publicaciones: function(){
					return {
						items: [
							{ name: "Publicaciones recientes", config: { cuantos: "1", param_b: "Articulos de interés publicados por los Directivos de la empresa." }},
						]
					}
				}
			}
		})
	})
    
	.directive('classy', function() {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
				//porcentaje
				// var porcentaje = 100/(scope.saldos.totdevengos/scope.saldos.totdeducciones);
				scope.porcentaje = attrs["classy"];
				// console.log(scope.porcentaje);
				$(element).ClassyLoader({
					percentage: scope.porcentaje,
					width: 150,
					height: 150,
					speed: 15,
					fontFamily: "Lato",
					roundedLine: true,
					diameter: 70,
					lineColor: "#ff3b30",
					remainingLineColor: "#2ED63B",
					lineWidth: 10,
					fontSize: "35px"
				})
	        }
	    }
	})
	
	.directive('endeudamiento', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				//porcentaje
				// var porcentaje = 100/(scope.saldos.totdevengos/scope.saldos.totdeducciones);
				if( attrs["fechasdeudas"] ) {
					scope.fechasdeudas = JSON.parse(attrs["fechasdeudas"]);
				}else{
					scope.fechasdeudas = [];
				}
				if( attrs["ingresos"] ) {
					scope.ingresos = JSON.parse(attrs["ingresos"]);
				}else{
					scope.ingresos = [];
				}
				if( attrs["deducciones"] ) {
					scope.deducciones = JSON.parse(attrs["deducciones"]);
				}else{
					scope.deducciones = [];
				}
				// console.log(scope.fechasdeudas,scope.ingresos,scope.deducciones);
                Highcharts.setOptions({
                    global : {
                        useUTC : true
                    }
                });
				$(element).highcharts({
					chart: {
						backgroundColor:'rgba(255, 255, 255, 0)',
						height: 250,
						style: {
							fontFamily: "Lato"
						}
					},
					title: {
						text: ''
					},
					xAxis: {
						type: 'datetime',
						categories: scope.fechasdeudas.reverse()
					},
					yAxis: {
						title: {
							text: 'Unidades en Millones'
						}
					},
					legend: {
						enabled: false
					},
					tooltip:{
						enabled:true,
						borderWidth: 1,
						shadow: false,
						useHTML: true,
						hideDelay: 2,
						shared: true,
						padding: 0,
					},
					plotOptions: {
						areaspline: {
							fillOpacity: 0.5
						},
						area: {
							marker: {
								radius: 6,
								lineWidth: 2,
								lineColor: '#ffffff'
							},
							lineWidth: 2,
							states: {
								hover: {
									lineWidth: 1
								}
							},
							threshold: null
						}
					},
					series: [{
						type: 'spline',
						name: 'Ingresos',
						data: scope.ingresos.reverse(),
						color: '#2ED63B'
					},
					{
						type: 'spline',
						name: 'Gastos',
						data: scope.deducciones.reverse(),
						color: '#ff2211'
					}]
				})//endeudamiento
			}
		}
	})
	
	.directive('cesantias', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				//porcentaje
				// var porcentaje = 100/(scope.saldos.totdevengos/scope.saldos.totdeducciones);
				if( attrs["fpend"] ){
					scope.fpend = JSON.parse(attrs["fpend"]);
				}else{
					scope.fpend = [];
				}
				if( attrs["newbetrg"] ){ 
					scope.newbetrg = JSON.parse(attrs["newbetrg"]);
				}else{
					scope.newbetrg = [];
				}
				
				$(element).highcharts({
                    chart:{
                        renderTo: 'cesantias',
                        margin:[15, 0, 0, 0],
                        backgroundColor:'transparent',
                  style: {
                    fontFamily: "Lato"
                  }
                    },
                    title:{
                        text:''
                    },
                colors: [
                            "#1F82E9"
                            ],
                    credits:{
                        enabled:false
                    },
                    xAxis:{
                  categories: scope.fpend.reverse(),
                        labels:{
                            enabled:false
                        }
                    },
                    yAxis:{
                        maxPadding:0,
                        minPadding:0,
                        gridLineWidth: 0,
                        endOnTick:false,
                        labels:{
                            enabled:false
                        }
                    },
                    legend:{
                        enabled:false
                    },
                  tooltip:{
                      enabled:true,
                      borderWidth: 1,
                      shadow: false,
                      useHTML: true,
                      hideDelay: 2,
                      shared: true,
                      padding: 0,
                  },
                    plotOptions:{
                        series:{
                    name: 'Saldo',
                            enableMouseTracking:true,
                            lineWidth:1,
                            shadow:false,
                    pointWidth: 20,
                    borderWidth: 0,
                            states:{
                                hover:{
                                    lineWidth:1
                                }
                            },
                            marker:{
                                //enabled:false,
                                radius:0,
                                states:{
                                    hover:{
                                        radius:2
                                    }
                                }
                            }
                        }
                    },
                    series: [{type:'column',
                        data: scope.newbetrg.reverse()
                    }]
				})//cesantias
			}
		}
	})
	
	.directive('intcesantias', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				//porcentaje
				// var porcentaje = 100/(scope.saldos.totdevengos/scope.saldos.totdeducciones);
				
				if( attrs["intfpend"] ){
					scope.intfpend = JSON.parse(attrs["intfpend"]);
				}else{
					scope.intfpend = [];
				}
				if( attrs["intnewbetrg"] ){ 
					scope.intnewbetrg = JSON.parse(attrs["intnewbetrg"]);
				}else{
					scope.intnewbetrg = [];
				}
				$(element).highcharts({
                    chart:{
                        renderTo: 'intcesantias',
                        margin:[15, 0, 0, 0],
                        backgroundColor:'transparent',
                  style: {
                    fontFamily: "Lato"
                  }
                    },
                    title:{
                        text:''
                    },
                colors: [
                            "#2ED63B"
                            ],
                    credits:{
                        enabled:false
                    },
                    xAxis:{
                  categories: scope.intfpend.reverse(),
                        labels:{
                            enabled:false
                        }
                    },
                    yAxis:{
                        maxPadding:0,
                        minPadding:0,
                        gridLineWidth: 0,
                        endOnTick:false,
                        labels:{
                            enabled:false
                        }
                    },
                    legend:{
                        enabled:false
                    },
                  tooltip:{
                      enabled:true,
                      borderWidth: 1,
                      shadow: false,
                      useHTML: true,
                      hideDelay: 2,
                      shared: true,
                      padding: 0,
                  },
                    plotOptions:{
                        series:{
                    name: 'Saldo',
                            enableMouseTracking:true,
                            lineWidth:1,
                            shadow:false,
                    pointWidth: 20,
                    borderWidth: 0,
                            states:{
                                hover:{
                                    lineWidth:1
                                }
                            },
                            marker:{
                                //enabled:false,
                                radius:0,
                                states:{
                                    hover:{
                                        radius:2
                                    }
                                }
                            }
                        }
                    },
                    series: [{type:'column',
                        data: scope.intnewbetrg.reverse()
                    }]
				})//intcesantias
			}
		}
	})
	
	// .controller('Dashboard.MainController', function($scope, widgets, ingresos, workers, publicaciones, employees, currentUser, articles){
	.controller('Dashboard.MainController', function($scope, widgets, ingresos, workers, publicaciones, Employee, Article ){
		$scope.$Employee = Employee;
    	$scope.$Article = Article;
    
	    $scope.sortEmpleado = function(empleado) {
	        var date = new Date(empleado.fecha_ingreso).getDate().toString();
	        // console.log(parseInt(date));
	        return parseInt(date);
	    };
	    
	    $scope.sortNacimiento = function(empleado) {
	        var date = new Date(empleado.fecha_nac).getDate().toString();
	        // console.log(parseInt(date));
	        return parseInt(date);
	    };
				
		// $scope.employees = employees;
		
		
		$scope.employee = $scope.user.employee;
		$scope.vacation = $scope.user.vacation;
		$scope.employee_info = $scope.user.employee_info;
	
		
		if ($scope.user.saldos != null){
			$scope.saldos = $scope.user.saldos;
		}else{
			$scope.saldos = {};
		}
		
		if ( $scope.vacation != null){			
			$scope.vacationdays = [parseInt($scope.vacation.resumen[1]),parseInt($scope.vacation.resumen[2])];			
		}else{
			$scope.vacationdays = [];
		}

		//porcentaje para classy
		$scope.porcentaje = 100/($scope.saldos.totdevengos/$scope.saldos.totdeducciones);
		
		//Deudas
		var deduc = [];
		var devng = [];
		$scope.fechasdeudas = [];

		angular.forEach($scope.saldos.t_endeudamiento,function(value){
			deduc.push(value.deduc);
			devng.push(value.devng);
			$scope.fechasdeudas.push( moment( $scope.formatDate(value.fpend) ).format("YYYY-MM-DD") ) ;
		});
		
		$scope.deducciones = [];
		deduc.forEach(function(deuda) {
			$scope.deducciones.push(parseInt(deuda));
		});
		
		$scope.ingresos = [];
		devng.forEach(function(ingresos) {
			$scope.ingresos.push(parseInt(ingresos));
		});
		// /Deudas
		
        // meter las cesantias
		$scope.betrg = [];
		$scope.fpend = [];
		$scope.newbetrg = [];
        $scope.elsaldocesantias = $scope.saldos.saldo;
        $scope.intcesantias = $scope.saldos.intsaldo;

        // meter las cesantias
        angular.forEach($scope.saldos.t_cesantias,function(value){
          $scope.betrg.push(value.betrg);
          $scope.fpend.push( moment( $scope.formatDate(value.fpend)  ).format("YYYY-MM-DD") );
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
          $scope.intfpend.push( moment( $scope.formatDate(value.fpend)  ).format("YYYY-MM-DD") );            
        });
      
        // Intereses de cesantias a numeros
        $scope.intbetrg.forEach(function(entry, index) {
            $scope.intnewbetrg.push(parseInt(entry));
            if( index === 0){
                $scope.intcesantias = parseInt(entry);
            }
        });
	
    
    
		$scope.sortableOptions = {
			'placeholder': 'placeholder'
		};
    
		$scope.labels = ["Días usados", "Días restantes"];
    	$scope.colours = ['#cacaca','#2ED63B'];
  
		$scope.common = {
			widgets: widgets.items,
			workers: workers.items,
			publicaciones: publicaciones.items,
			ingresos: ingresos.items
		};
    
		// $scope.aniversario = function calculateAnniversary(entrada)
		$scope.aniversario = function(entrada)
		{
			var todayDate = new Date();
			var entrada = new Date(entrada);
			var age = todayDate.getYear() - entrada.getYear(); 
			return age;
		};
			
		if($(window).width() <= 500) {
			$(".dashboardlis li .contenido").hide();
		}
		
		$(window).resize(function() {
			if($(window).width() <= 500) {
				$(".dashboardlis li .contenido").slideUp();
				$(".contenido#vacations-chart").slideDown();
			}else if ($(window).width() >= 720) {
				$(".dashboardlis li .contenido").show();
			}
		}).resize(); 
		
		$(".closing").click(function(){
			$(this).parent().parent().parent().children(".contenido").slideToggle(70);
			$(this).children(".fa").toggleClass("fa-chevron-circle-up");
			$(this).children(".fa").toggleClass("fa-chevron-circle-down");
		});

    
		});
	}());
