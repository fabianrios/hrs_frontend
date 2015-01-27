(function(){
  'use strict';
  
  angular.module('organigram', ['organigram.service'])

     // Add http interceptors that allows us to handle http request before it sends and http response parsing
    .config(function($stateProvider){
      $stateProvider
        .state('main.views.organigram', {
          url: '/organigram/:id',
          templateUrl: 'app/organigram/organigram.tpl.html',
          controller: 'Organigram.MainController',
            resolve: {
              employees: function(Organigram, $stateParams){
                return Organigram.index({id: $stateParams.id}).$promise;
              }
            }
        })
    })
	
	
    .controller('Organigram.MainController', function($scope, $http, employees, UserService, Auth){
		
		
   	   UserService.current_user.then(function(user) {
 		  $scope.user = user;
 		  $scope.autenticado = Auth.isAuthenticated(user)
       }, function(error) {
 		  console.log("error al optener el usuario autenticado");
 		  $location.path('/login');
       });
		
		$scope.employees = employees.organigram;
		
		// $scope.employees.splice(0,2);
		$scope.subordinados = $.grep($scope.employees, function(e){ return e.fther == "00002133"; });
		$scope.elempleado = $.grep($scope.employees, function(e){ return e.pernr == "00002133"; });
		$scope.jefes = $.grep($scope.employees, function(e){ return e.pernr == $scope.elempleado[0].fther; });

		
		console.log($scope.subordinados, $scope.elempleado, $scope.jefes);
    });
}());
