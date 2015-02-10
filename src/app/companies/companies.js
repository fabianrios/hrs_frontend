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
          url: '/companies/:id/view',
          templateUrl: 'app/companies/company.tpl.html',
          controller: 'companies.DetailController',
          resolve: {
            company: function(Company, $stateParams){
              return Company.show({id: $stateParams.id}).$promise;
            }
          }
        })
		.state('main.views.companynew', { //state for adding a new company
		    url: '/companies/new',
		    templateUrl: 'app/companies/companynew.tpl.html',
		    controller: 'companies.NewController'
		  })
		.state('main.views.companyedit', { //state for updating a movie
	      url: '/companies/:id/edit',
	      templateUrl: 'app/companies/companyedit.tpl.html',
	      controller: 'companies.EditController'
	    });
    })

    .controller('companies.ListController', function($scope, $modal, $state, companies){
      $scope.companies = companies; 
	  
      $scope.viewCompany = function(id) {
        $state.go("main.views.companydetail", { id: id });
      };
	  

		// DELETE
		$scope.deleteCompany = function(company) { // Delete a movie. Issues a DELETE to /api/movies/:id
			
			$scope.empresa = company;
	  		var modalInstance = $modal.open({
	  			templateUrl: 'myModalContent.html',
	  			controller: 'ModalInstanceCtrl',
				windowClass: 'small',
			    resolve: {
		           empresa: function () {
		             return $scope.empresa;
		           },
				   companies: function () {
		             return $scope.companies;
		           }
		         }
	  		});
			
			 modalInstance.result.then(function () {
  		    	}, function () {
					console.log('Modal dismissed at: ' + new Date());
  		    	});

			// Popup.confirm('Seguro quieres borrar esto?').then(function () {
			// 	company.$delete(function() {
			// 		var index = $scope.companies.indexOf(company)
			// 		$scope.companies.splice(index, 1);
			// 		$state.go('main.views.companylisting'); // on success go back to company_listing
			// 	});
			// }, function () {
			// 	console.error('Rechazado!');
			// });
			
		};
	  
    })
	
	.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $state, empresa, companies) {

	  $scope.companies = companies; 
	  $scope.empresa = empresa;
		
	  $scope.ok = function () {
		empresa.$delete(function() {
			var index = $scope.companies.indexOf(empresa);
			$scope.companies.splice(index, 1);
			$modalInstance.close(function(){});
			$state.go('main.views.companylisting'); // on success go back to company_listing
		});
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	})

    .controller('companies.DetailController', function($scope, company){
       $scope.company = company;
    })
    .controller('companies.NewController', function($scope, $state, Company){
	    $scope.company = new Company();  
 
	     $scope.addCompany = function() { //create a new company. Issues a POST to /api/companies
	       $scope.company.$save(function() {
			   $state.go('main.views.companylisting'); // on success go back to company_listing
	       });
	     };
    })
    .controller('companies.EditController', function($scope, $state, $stateParams, Company){
	    $scope.updateCompany = function() { //Update the edited company. Issues a PUT to /api/companies/:id
	       $scope.company.$update(function() {
	         $state.go('main.views.companylisting'); // on success go back to company_listing
	       });
	     };

	     $scope.loadCompany = function() { //Issues a GET request to /api/movies/:id to get a movie to update
	       $scope.company = Company.get({ id: $stateParams.id });
		   // console.log($scope.company);
	     };

	     $scope.loadCompany(); // Load a movie which can be edited on UI
    });
}());
