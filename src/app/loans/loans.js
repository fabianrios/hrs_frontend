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
				},
				approve_loans: function(Loan){
					return Loan.index_approve().$promise;
				}
			}		
		})
	})
	
	.controller('Loans.ListController', function($scope, $http, $state, Loan, loans, approve_loans){ //, Loan, loans


		$scope.loans = loans;
		$scope.approve_loans = approve_loans;		
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

		$scope.putRequest = function( pres ){
			console.log(pres);
			var prestamo = new Loan();
			prestamo.monto = pres.monto;
			prestamo.subty = pres.subty;

			$scope.prestamo.sending = true;

			prestamo.$save( function(){
				$scope.loans = Loan.index();
				$scope.prestamo.sending = false;  
				$scope.prestamo.monto = '';
				$scope.prestamo.subty = '';
			},function( data ){
				$scope.prestamo.sending = false;              
		        $scope.showMessageErrorRails(data);	  
			});

		};

		$scope.deletePres = function(pres,$index){
			pres.$delete(function() {
				var index = $scope.loans.indexOf(pres);
				// console.log(extra,index,modal);
				$scope.loans.splice(index, 1);
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
		
	});
	
}());

