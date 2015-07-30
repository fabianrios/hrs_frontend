(function(){
  'use strict';

	angular.module('sidebar', ['employee.service'])
	.controller('Sidebar.SidebarController', function($scope, $state, $http, Employee, currentUser, HRAPI_CONF){
		$scope.common = {};
        
        
            
        $scope.user = currentUser;
        $scope.searchText = '';
		
  	  //toggle expand vacation box
        $scope.favorites = function(e, empleado){
                $(e.currentTarget).children("span").removeClass("fa-start-o");
                $(e.currentTarget).children("span").addClass("fa-start");
                $(e.currentTarget).toggleClass("active");
                currentUser.favorite_employees.push(empleado); 
//                var index = $scope.employees.indexOf(empleado);
//                // console.log(index,empleado.favorite);
//                $scope.employees.splice(index, 1);
//                if (!empleado.favorite){
//                    empleado.favorite = true;
//                    $scope.employees.unshift(empleado);
//                }else{
//                    empleado.favorite = false;
//                    $scope.employees.push(empleado);
//                }             
        };

        $scope.update_favorite =  function(employee){
            $http.post( HRAPI_CONF.apiBaseUrl( '/users/' + currentUser.employee.identification + '/favorite_employee' ), { employee_identification: employee.identification }).
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
            }
            if( newValue.length <= 3 ){
                if(currentUser.favorite_employees.length > 0){
                    $scope.employees = currentUser.favorite_employees;
                }else{
                    $scope.employees = Employee.index();
                }
            }        
        });
		
	});
}());
