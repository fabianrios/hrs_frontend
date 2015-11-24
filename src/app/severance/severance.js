(function(){
	'use strict';
  
	angular.module('severance', [])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.severance', {
			url: '/severance',
			templateUrl: 'app/severance/severance.tpl.html',
			controller: 'Severance.ListController',
			resolve:{
				severances: function( Severance ){
					return Severance.index().$promise;
				}
			}	
		})
	})
	
	.controller('Severance.ListController', function($scope, $http, $state, Severance, severances){

		if($scope.user.company.show_scesa ===  false){
			$state.transitionTo('main.views.dashboard');
		}

		$scope.severances = severances;
		$scope.options = [];
		
		angular.forEach($scope.user.company_type.tipos,function(value,index){
			if (value.idactv == "CESA"){
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
		
		$scope.putRequest = function( data ){

			var severance = new Severance();
			severance.numero_de_actorizacion = data.approval;
			severance.fecha_de_corte = data.cut;
			severance.monto = data.monto;
			severance.subty = data.subty;

			$scope.severance.sending = true;

			severance.$save( function(){
				$scope.severances = Severance.index();
				$scope.severance.sending = false;  
				$scope.severance.monto = '';
				$scope.severance.subty = '';
				$scope.severance.approval = '';
				$scope.severance.cut = '';
			},function( data ){
				$scope.severance.sending = false;              
		        $scope.showMessageErrorRails(data);	  
			});

		};

		$scope.deleteSeverance = function(severance,$index){
			console.log(severance);

			severance.$destroy(function() {
				var index = $scope.severances.indexOf(severance);				
				$scope.severances.splice(index, 1);
				$('#myModal-'+$index).foundation('reveal', 'close');
				$scope.alerts.push({type: 'secondary', msg: "El registro a sido borrado"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});	
			
		};
		

	})
	
}());

