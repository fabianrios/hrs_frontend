(function(){
  'use strict';

	angular.module('sidebar', ['employee.service'])
	.controller('Sidebar.SidebarController', function($scope, $state, $http, Employee, HRAPI_CONF, employees){//, $state, $http, Employee, currentUser, HRAPI_CONF){

    $scope.common = {};
    $scope.searchText = '';
    $scope.employees = $scope.user.favorite_employees;
				
	  //toggle expand vacation box
    $scope.favorites = function(e, empleado){
      $(e.currentTarget).children("span").removeClass("fa-start-o");
      $(e.currentTarget).children("span").addClass("fa-start");
      $(e.currentTarget).toggleClass("active");
			
			$scope.non = true;
			var len = $scope.user.favorite_employees.length;
			for (var i=0; i<len; i++) {
				if ($scope.user.favorite_employees[i].employee_identification == empleado.identification) {
					$scope.non = false;
					console.log(true, $scope.user.favorite_employees[i].employee_identification, empleado.identification);
				}
			}
			
			if ($scope.non){
				$scope.user.favorite_employees.push({employee_identification: empleado.identification, user_identification: empleado.user_id, employee: empleado});
			}								
    };

    $scope.update_favorite =  function(employee){
        $http.post( 
            HRAPI_CONF.apiBaseUrl( '/users/' + $scope.user.employee.identification + '/favorite_employee' ), 
            { employee_identification: employee.identification }
          ).success(function(data, status, headers, config) {
            console.log("empleado actualizado en favoritos", data);
          }).error(function(data, status, headers, config) {
            console.log("no se pudo vincular el empleado a favoritos", data);
          });
    };
				
    $scope.favorite =  function( employee ){  
        var _return;
        _return = false;
        $scope.user.favorite_employees.some( function( favorite ){        
          if(favorite.employee_identification === employee.identification){
              _return = true;
          }
        });
        return _return;
    };
				
    $scope.$watch('searchText', function(newValue, oldValue) {
        if( newValue.length > 3 ){
            $scope.employees = Employee.search( { q: newValue } );
						$scope.flavor_class = "no-glow";
        }
        if( newValue.length <= 3 ){
            if($scope.user.favorite_employees.length > 0){
                $scope.employees = $scope.user.favorite_employees;
								$scope.flavor_class = "glow";
            }else{
                // $scope.employees = Employee.index();
                $scope.employees = employees;
								$scope.flavor_class = "no-glow";
            }
        }        
    });
		
	});
}());
