(function(){
  'use strict';

	angular.module('sidebar', ['employee.service'])
	.controller('Sidebar.SidebarController', function($scope, $state, employees){
		$scope.common = {};
		$scope.employees = employees;
		
  	  //toggle expand vacation box
        $scope.favorites = function(e, empleado){
			$(e.currentTarget).children("span").removeClass("fa-start-o");
		    $(e.currentTarget).children("span").addClass("fa-start");
		    $(e.currentTarget).toggleClass("active");
			var index = $scope.employees.indexOf(empleado);
			console.log(index,empleado.favorite);
			$scope.employees.splice(index, 1);
			if (!empleado.favorite){
				empleado.favorite = true;
				$scope.employees.unshift(empleado);
			}else{
				empleado.favorite = false;
				$scope.employees.push(empleado);
			}
        };
		
	});
}());
