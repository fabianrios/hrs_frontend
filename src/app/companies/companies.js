(function(){
  'use strict';
  
  angular.module('companies', [])

    .config(function($stateProvider){
      $stateProvider
        .state('main.views.companies', {
          url: '/companies',
          templateUrl: 'app/companies/companies.tpl.html',
          controller: 'companies.MainController',
          resolve: {
            widgets: function(){
              return {
                items: [
                  { name: "company 1", config: { param_a: "abc", param_b: "bcd" }},
                  { name: "company 2", config: { param_a: "abc", param_b: "bcd" }},
                  { name: "Widget 3", config: { param_a: "abc", param_b: "bcd" }},
                ]
              }
            }
          }
        })
        .state('main.views.company', {
          url: '/companies/:id',
          templateUrl: 'app/companies/company.tpl.html',
          controller: 'company.MainController'
        })
    })

    .controller('companies.MainController', function($scope, widgets, Company){
      $scope.companies = Company.index();
      $scope.common = {
        widgets: widgets.items
      };
    })
    .controller('company.MainController', function($scope, Company){
      $scope.company = {name: "1"};
	  console.log(Company.show(1));
    });
}());
