(function(){
  'use strict';

	angular.module('sidebar', ['employee.service'])
	.controller('Sidebar.SidebarController', function($scope, $state, $http, employees, currentUser){
		$scope.common = {};
		$scope.employees = employees;
		console.log($scope.employees);
		
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

        $scope.update_favorite =  function(employee){
            $http.post('/api/users/' + currentUser.employee.identification + '/favorite_employee', { employee_identification: employee.identification }).
              success(function(data, status, headers, config) {
                console.log(data);
              }).
              error(function(data, status, headers, config) {
                console.log(data);
              });
        };

        $scope.favorite =  function( employee ){
            var _return;
            _return = false;
            currentUser.favorite_employees.some( function( favorite ){                
                if(favorite.employee_identification == employee.identification){
                    _return = true;                     
                }
            });
            return _return;
        };
		
	});
}());
