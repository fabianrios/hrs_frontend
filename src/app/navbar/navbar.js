(function(){
  'use strict';

  angular.module('navbar', [])

    .controller('Navbar.NavbarController', function($scope,currentUser,articles,vac_requirements, extras_requirements){
		
		$scope.user = currentUser;
		$scope.articles = articles.articles;
		$scope.articles_not_mine = [];
		$scope.vac_requirements = vac_requirements;
		$scope.extras_requirements = extras_requirements;
		$scope.only_not_user = [];
		$scope.extras_not_user = [];
		
		// sacar todos los articulos publicados que NO son mios
		angular.forEach($scope.articles, function(value, key) {
			var i = $scope.articles.indexOf(value);
			if (value.employee_id != 1){
				$scope.articles_not_mine.push(value);
			}
		});
		
		//vacaciones pendientes
		angular.forEach($scope.vac_requirements,function(value,index){
			if (value.employee.boss == $scope.user.employee_id && value.status == "Espera"){
				$scope.only_not_user.push(value);
			}
		});
		
		//extras pendientes
		angular.forEach($scope.extras_requirements,function(value,index){
			if (value.employee.boss == $scope.user.employee_id && value.status == "Espera"){
				$scope.extras_not_user.push(value);
			}
		});
		
    });
}());

