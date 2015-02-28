(function(){
  'use strict';
  
  angular.module('dashboard', ['user.service'])

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
                  { name: "Mis intereses de cesantías", config: { param_a: "ghi", param_b: "El valor que a la liquidación de la última nómina tiene causado dentro de la compañía y el cual  se transferirá al fondo de Cesantias con que se  cuente al  finalizar el periodo." }},
                ]
              }
            },
            ingresos: function(){
              return {
                items: [
					{ name: "Mis ingresos y deducciones", config: { param_a: "abc", param_b: "Cantidad de deuda e ingresos" }}
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
            }
          }
        })
    })

    .controller('Dashboard.MainController', function($scope, widgets, workers, publicaciones, ingresos, Company, employees, UserInfo){
		
	  
		$scope.employee = {};
		$scope.user = {};
		$scope.vacation = {};
		$scope.employee_info = {};
		$scope.saldos = {};
		$scope.betrg = [];
		$scope.fpend = [];
		
		// variables para cesantias
		$scope.newbetrg = [];
		$scope.intbetrg = [];
		$scope.intfpend = [];
		$scope.intnewbetrg = [];
		$scope.elsaldocesantias = "";
		$scope.deduc = [];
		$scope.devng = [];
		$scope.fechas_deudas = [];
		$scope.ingresos = [];
		$scope.deducciones = [];
		
		
		UserInfo.currentUser().then(function(user_info){
			console.log(user_info);
			// depende de UserInfo.currentUser
			$scope.user = user_info;
			$scope.saldos = user_info.saldos;
			
			$scope.employee = user_info.employee;
			$scope.vacation = user_info.vacation;
			$scope.employee_info = user_info.employee_info;
			// console.log($scope.saldos);
			// meter las cesantias
			angular.forEach($scope.saldos.t_cesantias,function(value,index){
				$scope.betrg.push(value.betrg);
				$scope.fpend.push(value.fpend);
			})
			// console.log($scope.fpend,$scope.betrg);
			// console.log(items);
			// Estos hay que parsearlos como numeros porque llegan como un string
			$scope.vacationdays = [parseInt(user_info.vacation.resumen[1]),parseInt(user_info.vacation.resumen[2])];
			$scope.vacationdates = user_info.vacation.detalle;
			// console.log($scope.vacationdates);
			$scope.company = user_info.company;
			 
			// Variables para cesantias 
			$scope.saldos = user_info.saldos;
			$scope.elsaldocesantias = $scope.saldos.saldo;
			$scope.intcesantias = $scope.saldos.intsaldo;
			// meter las cesantias
			angular.forEach($scope.saldos.t_cesantias,function(value,index){
				$scope.newbetrg.push(value.betrg);
				$scope.fpend.push(value.fpend);
			})
			// meter las int. cesantias			
			angular.forEach($scope.saldos.t_intcesantias,function(value,index){
				$scope.intbetrg.push(value.betrg);
				$scope.intfpend.push(value.fpend);
			})	
			// saldo de cesantias a numeros
			$scope.betrg.forEach(function(entry, index) {
				$scope.newbetrg[index] = parseInt(entry);
			});
			
			// Intereses de cesantias a numeros
			$scope.intbetrg.forEach(function(entry) {
				$scope.intnewbetrg.push(parseInt(entry));
			});
			
			$scope.newbetrg = $scope.newbetrg.reverse();
			$scope.fpend = $scope.fpend.reverse()
			$scope.intnewbetrg = $scope.intnewbetrg.reverse();
			$scope.intfpend = $scope.intfpend.reverse()
			
			//Deudas
			angular.forEach($scope.saldos.t_endeudamiento,function(value,index){
				$scope.deduc.push(value.deduc);
				$scope.devng.push(value.devng);
				$scope.fechas_deudas.push(value.fpend);
			})	
			
			$scope.deduc.forEach(function(deuda) {
				$scope.deducciones.push(parseInt(deuda));
			});
			

			$scope.devng.forEach(function(ingresos) {
				$scope.ingresos.push(parseInt(ingresos));
			});
			
			$scope.ingresos = $scope.ingresos.reverse();
			$scope.deducciones = $scope.deducciones.reverse();
			$scope.fechas_deudas = $scope.fechas_deudas.reverse();
			  
			
			
				
            Highcharts.setOptions({
                global : {
                    useUTC : true
                }
            });
			
			var cesantias = new Highcharts.Chart({
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
	    			categories: $scope.fpend,
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
	                data: $scope.newbetrg
	            }]

	        });//cesantias
			var intcesantias = new Highcharts.Chart({
                chart:{
                    renderTo: 'intsaldos',
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
        			categories: $scope.intfpend,
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
                    data: $scope.intnewbetrg
                }]

            });//intcesantias
			var endeudamiento = new Highcharts.Chart({
			  chart: {
				renderTo: 'endeudamiento',
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
				categories: $scope.fechas_deudas
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
				data: $scope.ingresos,
				color: '#2ED63B'
			  },
			{
			      type: 'spline',
			      name: 'Gastos',
				data: $scope.deducciones,
				color: '#ff2211'
			}]
			});//endeudamiento
			
			//porcentaje
			var porcentaje = 100/($scope.saldos.totdevengos/$scope.saldos.totdeducciones);
			var loader = $('.loader').ClassyLoader({
				percentage: porcentaje,
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
			});
			
		}, function(error){
			//codigo handling error interfaz
			console.log(error,"algo paso con el usuario autenticado");
		});
		
		
		$scope.employees = employees;
	
		
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
				$(".dashboardlis li .contenido").hide();
			}else if ($(window).width() >= 720) {
				$(".dashboardlis li .contenido").show();
			}
		}).resize(); 
		
		$(".closing").click(function(){
			console.log($(this));
			$(this).parent().parent().parent().children(".contenido").slideToggle(70);
			$(this).children(".fa").toggleClass("fa-chevron-circle-up");
			$(this).children(".fa").toggleClass("fa-chevron-circle-down");
		});
	

	  
    });
}());
