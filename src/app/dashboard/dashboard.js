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
                  { name: "Widget 1", config: { param_a: "abc", param_b: "bcd" }},
                  { name: "Widget 2", config: { param_a: "abc", param_b: "bcd" }},
                  { name: "Widget 3", config: { param_a: "abc", param_b: "bcd" }},
                ]
              }
            }
          }
        })
    })

    .controller('Dashboard.MainController', function($scope, widgets, Company){
      $scope.companies = Company.index();
      $scope.common = {
        widgets: widgets.items
      };
    });
}());
