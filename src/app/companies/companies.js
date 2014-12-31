(function(){
  'use strict';
  
  angular.module('companies', ['sap.service'])

    .config(function($stateProvider){
      $stateProvider
        .state('main.views.companylisting', {
          url: '/companies',
          templateUrl: 'app/companies/companies.tpl.html',
          controller: 'companies.ListController',
          resolve: {
            companies: function(Company){
              return Company.index().$promise;
            }
          }
        })
        .state('main.views.companydetail', {
          url: '/company/:id',
          templateUrl: 'app/companies/company.tpl.html',
          controller: 'companies.DetailController',
          resolve: {
            company: function(Company, $stateParams){
              return Company.show({id: $stateParams.id}).$promise;
            }
          }
        })
    })

    .controller('companies.ListController', function($scope, $state, companies){
      console.log(companies);
      $scope.companies = companies.items; 
      $scope.viewCompany = function(id) {
        $state.go("main.views.companydetail", { id: id });
      };
    })

    .controller('companies.DetailController', function($scope, company){
       $scope.company = company;
    });
}());
