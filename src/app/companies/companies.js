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


	.controller('companies.ListController', function($scope, $state, companies){
		$scope.companies = companies; 
		$scope.viewCompany = function(id) {
			$state.go("main.views.companydetail", { id: id });
		};
	  
		$scope.deleteCompany = function (empresa) {
			empresa.$delete(function() {
				var index = $scope.companies.indexOf(empresa);
				// $scope.companies.splice(index, 1);
				$state.go('main.views.companylisting'); // on success go back to company_listing
			});
		};
	
	  
	})
	
	.controller('companies.DetailController', function($scope, company){
		$scope.company = company;
	})
	.controller('companies.NewController', function($rootScope, $scope, $state, Company){
		$scope.company = new Company();  
 
		$scope.addCompany = function(e) { //create a new company. Issues a POST to /api/companies
			// $scope.company.$save(function() {
// 				$state.go('main.views.companylisting'); // on success go back to company_listing
// 			});
			
			var aprobado = false;
			$(e.currentTarget).children("div.row").each(function () {
				// tiene errores
				// console.log($(this).children("div.large-12.error").length());
				// if ($(this).children("div.large-12").hasClass("error").length() > 0){
// 					// console.log($(this).children("div.large-12"));
// 				// no tiene mas errores
// 					console.log("tiene errores");
// 					aprobado = false;
// 				}else if ($(this).children("div.large-12").hasClass("error").length() == 0){
// 					aprobado = true;
// 				}
			});
			
			console.log($scope.company.empresa, $scope.company.usuario, $scope.company.confirmar, $scope.company.password, aprobado);
			if (typeof $scope.company.empresa != "undefined" && typeof $scope.company.usuario != "undefined" && typeof $scope.company.confirmar != "undefined" && typeof $scope.company.password != "undefined" && typeof $scope.company.nombre != "undefined" && typeof $scope.company.apellido != "undefined" && typeof $scope.company.documento != "undefined" && typeof $scope.company.email != "undefined"){
				$rootScope.alerts.push({type: 'success', msg: "la empresa " + $scope.company.empresa + " con el usuario " + $scope.company.usuario + " ha sido creada"});
        window.setTimeout(function() {
          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            $rootScope.alerts = [];
          });
        }, 5000);
			}else{
				$rootScope.alerts.push({type: 'alert', msg: "la empresa no ha podido crearse revisa los campos "});
				window.setTimeout(function() {
					$(".alert-box").fadeTo(500, 0).slideUp(500, function(){
						$(this).remove(); 
						$rootScope.alerts = [];
					});
				}, 5000);
			}
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
