(function(){
  'use strict';

	angular.module('sidebar', ['employee.service'])
	.controller('Sidebar.SidebarController', function($scope, $state, $http, Employee, currentUser, HRAPI_CONF){
		$scope.common = {};
        
        
            
        $scope.user = currentUser;
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
										// $scope.user.favorite_employees.splice(i, 1);
									}
								}
								
								if ($scope.non){
									$scope.user.favorite_employees.push({employee_identification: empleado.identification, user_identification: empleado.user_id, employee: empleado});
									console.log("meter empleado", empleado);
								}
								
               // $scope.user.favorite_employees.push(empleado);
							 //                var index = $scope.user.favorite_employees.indexOf(empleado);
							 // if (index == -1){
							 // 								 console.log("no esta en la lista",empleado);
							 // 								 $scope.user.favorite_employees.push(empleado);
							 // }else{
							 // 	 console.log("esta en la lista",empleado);
							 //    $scope.user.favorite_employees.splice(index, 1);
							 // }
							 
							 
               
               // $scope.employees.splice(index, 1);
               // if (!empleado.favorite){
               //     empleado.favorite = true;
               //     $scope.employees.unshift(empleado);
               // }else{
               //     empleado.favorite = false;
               //     $scope.employees.push(empleado);
               // }
							 // console.log("last:", $scope.user.favorite_employees, empleado);
        };

        $scope.update_favorite =  function(employee){
            $http.post( HRAPI_CONF.apiBaseUrl( '/users/' + currentUser.employee.identification + '/favorite_employee' ), { employee_identification: employee.identification }).
              success(function(data, status, headers, config) {
                console.log("empleado actualizado en favoritos", data);
              }).
              error(function(data, status, headers, config) {
                console.log("no se pudo vincular el empleado a favoritos", data);
              });
        };
				
        $scope.favorite =  function( employee ){  
            var _return;
            _return = false;
            $scope.user.favorite_employees.some( function( favorite ){
//                employee['favorite'] = false;
                if(favorite.employee_identification === employee.identification){
//                    employee['favorite'] = true;
//                    var index = $scope.employees.indexOf(employee);
//                    $scope.employees.splice(index, 1);
//                    $scope.employees.unshift(employee);
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
                    $scope.employees = Employee.index();
										$scope.flavor_class = "no-glow";
                }
            }        
        });
		
	});
}());
