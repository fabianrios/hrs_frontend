(function(){
  'use strict';

	angular.module('sidebar', ['employee.service'])
	.controller('Sidebar.SidebarController', ['$scope', '$state', '$http', 'Employee', 'HRAPI_CONF', function($scope, $state, $http, Employee, HRAPI_CONF){//, $state, $http, Employee, currentUser, HRAPI_CONF){ , employees

    $scope.rcntv        = 2;
    $scope.common       = {};
    $scope.searchText   = '';
    $scope.employees    = Employee.index();
    $scope.empFavorites = $scope.user.favorite_employees;
    $scope.subdomain = $scope.getAppSubdomain();
    $scope.modalDataEmployee = 'app/includes/modal_data_employee.tpl.html';

    $scope.isRcnTv = function (){
      $scope.subdomain = $scope.getAppSubdomain();
      return $scope.subdomain == "rcntv";
    }

    $scope.showModal = function(employee){
      $('#employeeDataModal').foundation('reveal', 'open');
      $scope.employeeData = employee;
    }

    $scope.favorites = function(e, empleado){
      $(e.currentTarget).children("span").removeClass("fa-start-o");
      $(e.currentTarget).children("span").addClass("fa-start");
      $(e.currentTarget).toggleClass("active");
    };

    $scope.update_favorite =  function(employee){
      $http.post( 
        HRAPI_CONF.apiBaseUrl( '/users/' + $scope.user.employee.identification + '/favorite_employee' ), 
        { employee_identification: employee.identification }
      ).success(function(data, status, headers, config) {
        $http.get(
          HRAPI_CONF.apiBaseUrl( '/users/' + $scope.user.employee.identification + '/favorite_employees' ), 
          {}
        ).success(function(data2){
          $scope.empFavorites = data2
        })
        console.log("empleado actualizado en favoritos", data);
      }).error(function(data, status, headers, config) {
        console.log("no se pudo vincular el empleado a favoritos", data);
      });
    };
				
    $scope.updateContact = function(e, employee){
      $scope.favorites(e, employee);
      $scope.update_favorite(employee);
      $scope.searchText = '';
    }

    $scope.favorite =  function( employee ){  
      var _return;
      _return = false;
      $scope.empFavorites.some( function( favorite ){        
        if(favorite.employee_identification === employee.id){
            _return = true;
        }
      });
      return _return;
    };

    $scope.isSearchEmployee = function(){
      return $scope.searchText.length != 0 ? true : false;
      //return 'https://hrsolutions.s3.amazonaws.com/uploads/employee/image/340/980.jpeg';
    }
			
    $scope.$watch('searchText', function(newValue, oldValue) {
        if( newValue.length > 3 ){
            $scope.employees = Employee.search( { q: newValue } );
            $scope.empFavorites = []
						$scope.flavor_class = "no-glow";
        }else{
          $scope.employees = Employee.index();
          $scope.empFavorites = $scope.user.favorite_employees;
        }
        /*
        if( newValue.length <= 3 ){
            if($scope.user.favorite_employees.length > 0){
              //console.log('entre: favorite_employees');
                //var arr = new Array();
                //arr.push($scope.user.favorite_employees);
                //$scope.employees = arr;
                ////console.log($scope.user.favorite_employees)
                ////console.log(arr)
                
                //$scope.employees = $scope.user.favorite_employees;
                //$scope.employees = employees.push($scope.user.favorite_employees);
								$scope.flavor_class = "glow";
            }else{
                $scope.employees = Employee.index();
                //$scope.employees = employees;
								$scope.flavor_class = "no-glow";
            }
        }
        */
    });
		
	}])
  .filter("autoAdjusts", function(){
    return function(value) {
      return value.length >= 21 ? value.substring(0, 20).toLowerCase()+'...' : value.toLowerCase();
    }
  });
}());
