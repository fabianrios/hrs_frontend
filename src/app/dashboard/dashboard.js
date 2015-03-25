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
							{ name: "Mis días de vacaciones", config: { param_a: "abc", param_b: "Días que a la liquidación de la última nómina tiene disponibles por este concepto. " }},
							{ name: "Mis cesantías", config: { param_a: "def", param_b: "El Valor de los intereses a las cesantias que a la liquidación de la última nómina tiene causados dentro de la compañía" }},
							{ name: "Mis int. de cesantías", config: { param_a: "ghi", param_b: "El valor que a la liquidación de la última nómina tiene causado dentro de la compañía y el cual  se transferirá al fondo de Cesantias con que se  cuente al  finalizar el periodo." }},
						]
					}
				},
				ingresos: function(){
					return {
						items: [
							{ name: "Mis ingresos y deducciones", config: { param_a: "abc", param_b: "Días que a la liquidación de la última nómina tiene disponibles por este concepto. " }}
						]
					}
				},
				workers: function(){
					return {
						items: [
							{ name: "Cumpleaños este mes", config: { param_a: "abc", param_b: "Días que a la liquidación de la última nómina tiene disponibles por este concepto. " }},
							{ name: "Aniversario laboral", config: { param_a: "def", param_b: "El Valor de los intereses a las cesantias que a la liquidación de la última nómina tiene causados dentro de la compañía" }}
						]
					}
				},
				publicaciones: function(){
					return {
						items: [
							{ name: "Publicaciones recientes", config: { cuantos: "1", param_b: "El valor que a la liquidación de la última nómina tiene causado dentro de la compañía y el cual  se transferirá al fondo de Cesantias con que se  cuente al  finalizar el periodo." }},
						]
					}
				},
				employees: function(Employee){
					return Employee.index();
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
					fontFamily: "futura-pt",
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
				scope.fechasdeudas = JSON.parse(attrs["fechasdeudas"]);
				scope.ingresos = JSON.parse(attrs["ingresos"]);
				scope.deducciones = JSON.parse(attrs["deducciones"]);
				console.log(scope.fechasdeudas,scope.ingresos,scope.deducciones);
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
							fontFamily: "futura-pt"
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
				scope.fpend = JSON.parse(attrs["fpend"]);
				scope.newbetrg = JSON.parse(attrs["newbetrg"]);
				$(element).highcharts({
                    chart:{
                        renderTo: 'cesantias',
                        margin:[15, 0, 0, 0],
                        backgroundColor:'transparent',
                  style: {
                    fontFamily: "futura-pt"
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
				scope.intfpend = JSON.parse(attrs["intfpend"]);
				scope.intnewbetrg = JSON.parse(attrs["intnewbetrg"]);
				$(element).highcharts({
                    chart:{
                        renderTo: 'intcesantias',
                        margin:[15, 0, 0, 0],
                        backgroundColor:'transparent',
                  style: {
                    fontFamily: "futura-pt"
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
	
	.controller('Dashboard.MainController', function($scope, widgets, ingresos, workers, publicaciones, employees, currentUser, articles){
    		
		
		var mine = articles.articles;
		$scope.articles_not_mine = [];
		
		// Articulos publicados que no son mios	
		angular.forEach(mine, function(value, key) {
			var i = mine.indexOf(value);
			if (value.employee_id != 1){
				$scope.articles_not_mine.push(value);
			}
		});
		
		
		$scope.employees = employees;
		$scope.user = currentUser;
	
		$scope.employee = currentUser.employee;
		$scope.vacation = currentUser.vacation;
		$scope.employee_info = currentUser.employee_info;
		$scope.saldos = currentUser.saldos;
		
		// Estos hay que parsearlos como numeros porque llegan como un string para la primera grafica
		$scope.vacationdays = [parseInt($scope.vacation.resumen[1]),parseInt($scope.vacation.resumen[2])];
		// console.log($scope.vacationdays);
		
		//porcentaje para classy
		$scope.porcentaje = 100/($scope.saldos.totdevengos/$scope.saldos.totdeducciones);
		
		//Deudas
		var deduc = [];
		var devng = [];
		$scope.fechasdeudas = [];
		angular.forEach($scope.saldos.t_endeudamiento,function(value){
			deduc.push(value.deduc);
			devng.push(value.devng);
			$scope.fechasdeudas.push(value.fpend);
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
          $scope.fpend.push(value.fpend);
        });
        // saldo de cesantias a numeros
        $scope.betrg.forEach(function(entry, index) {
            $scope.newbetrg[index] = parseInt(entry);
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
        $scope.intbetrg.forEach(function(entry) {
            $scope.intnewbetrg.push(parseInt(entry));
        });
	
		// $scope.shouldShow = function shouldHide(birthOn){
			//  console.log(birthOn);
			//     var birth = new Date(birthOn);
			//     var now = new Date();
			//  console.log(now.getMonth(),birth.getMonth());
			//     var show = now.getMonth() == birth.getMonth() ? true : false;
			//     return show;
			// }
    
    
			$scope.birthShow = function(empleado) {
				var birth = new Date(empleado.fecha_nac);
				var now = new Date(); 
				var show = now.getMonth() == birth.getMonth() ? true : false;
				return show;
			}
    
			$scope.laborShow = function(empleado) {
				var entrada = new Date(empleado.fecha_ingreso);
				var now = new Date(); 
				var show = now.getMonth() == entrada.getMonth() ? true : false;
				return show;
			}
    
    
    
			$scope.sortableOptions = {
				'placeholder': 'placeholder'
			};
    
			$scope.labels = ["Días usados", "Días restantes"];
  
			$scope.common = {
				widgets: widgets.items,
				workers: workers.items,
				publicaciones: publicaciones.items,
				ingresos: ingresos.items
			};
    
			$scope.aniversario = function calculateAnniversary(entrada)
			{
				var todayDate = new Date();
				var entrada = new Date(entrada);
				var age = todayDate.getYear() - entrada.getYear(); 
				return age;
			}
			
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
				// console.log($(this));
				$(this).parent().parent().parent().children(".contenido").slideToggle(70);
				$(this).children(".fa").toggleClass("fa-chevron-circle-up");
				$(this).children(".fa").toggleClass("fa-chevron-circle-down");
			});
    

    
		});
	}());
