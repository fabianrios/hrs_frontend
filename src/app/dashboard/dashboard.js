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

    .controller('Dashboard.MainController', function($scope, widgets, workers, publicaciones, ingresos, Company){
		
		$scope.sortableOptions = {
			'placeholder': 'placeholder'
		};
		
		$scope.labels = ["Días usados", "Días restantes"];
		
      // $scope.companies = Company.index();
	  
      $scope.common = {
        widgets: widgets.items,
		workers: workers.items,
		publicaciones: publicaciones.items,
		ingresos: ingresos.items
      };
    });
}());
