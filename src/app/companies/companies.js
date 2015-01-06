(function(){
  'use strict';
  
  angular.module('companies', ['sap.service'])

    .config(function($stateProvider){
      $stateProvider
        .state('main.views.companies', {
          url: '/companies',
          templateUrl: 'app/companies/companies.tpl.html',
          controller: 'companies.ListController',
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
          url: '/company/:id',
          templateUrl: 'app/companies/company.tpl.html',
          controller: 'companies.DetailController'
        })
    })

    .controller('companies.ListController', function($scope, widgets, Company, $location){
      $scope.companies = Company.index();
      $scope.common = {
        widgets: widgets.items
      };
	  
	  $scope.viewCompany = function(id) {
	    return $location.url("/company/" + id);
	  };
	  
		// 	  $scope.newCompany = new Company();  //create new company instance. Properties will be set via ng-model on UI
		//
		// 	  $scope.addCompany = function() {
		// console.log($scope.newCompany);
		//       $scope.newCompany.$save(function() {
		//         $state.go('companies.ListController'); // on success go back to home i.e. movies state.
		//       });
		//
		//       };
	  
    })
    .controller('companies.DetailController', function($scope, Company, $stateParams){
		// $scope.company = company;
		$scope.company = Company.show({id:$stateParams.id});
		
    });
}());
