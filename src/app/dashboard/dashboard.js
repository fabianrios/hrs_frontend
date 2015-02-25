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
            }
          }
        })
    })

    .controller('Dashboard.MainController', function($scope, widgets, workers, publicaciones, ingresos, Company, employees, UserInfo){
		
		UserInfo.currentUser().then(function(user_info){
			// depende de UserInfo.currentUser
			$scope.user = user_info;
			$scope.saldos = user_info.saldos;
			console.log($scope.saldos);
				
				
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
		

	  
    });
}());
