(function(){
	'use strict';
  
	angular.module('loans', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.loans', {
			url: '/loans',
			templateUrl: 'app/loans/loans.tpl.html',
			controller: 'Loans.ListController',
			resolve:{
				loans: function( Loan ){
					return Loan.index().$promise;
				}			
			}		
		})
	})
	
	.controller('Loans.ListController', ['$scope', '$http', '$state', 'Loan', 'loans', function($scope, $http, $state, Loan, loans){ 

		if($scope.user.company.show_loans ===  false){
			$state.transitionTo('main.views.dashboard');
		}


		$scope.loans = loans;
		// $scope.approve_loans = approve_loans;		
		$scope.options = [];
		
		
		angular.forEach($scope.user.company_type.tipos,function(value,index){
			if (value.idactv == "PRES"){
				$scope.options.push(value);
			}
		});

		$scope.mot = function(tipo){
			var description = "";
			angular.forEach($scope.options,function(value,index){
				if (value.subty == tipo){
					description = value.descr;
				}
			});
			// console.log(description);
			return description
		};

		$scope.prestamo = new Loan();

		$scope.putRequest = function( pres ){		

			$scope.prestamo.sending = true;
			$scope.prestamo.$save( function(){
				$scope.loans = Loan.index();
				$scope.prestamo = new Loan();
				$scope.prestamo.sending = false;  				
			},function( data ){
				console.log(data);
				$scope.prestamo.sending = false;              
		        $scope.showMessageErrorRails(data);	  
			});

		};

		$scope.deletePres = function(pres,$index){
			pres.$delete(function() {
				$scope.loans = Loan.index();
				$('#myModal-'+$index).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "El registro a sido borrado"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});	
		}
	}]);
}());

