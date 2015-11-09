(function(){
  'use strict';

  angular.module('navbar', [])

    .controller('Navbar.NavbarController', function($scope, vac_requirements, extras_requirements, inhabilities_requirements, licenses_requirements, infos, Notification){//,currentUser,articles,vac_requirements, extras_requirements, inhabilities_requirements, licenses_requirements, infos, Notification){
		
		
		// $scope.articles = articles.articles;
		// $scope.articles_not_mine = [];
		$scope.vac_requirements = vac_requirements;
		$scope.extras_requirements = extras_requirements;
		$scope.inhabilities_requirements = inhabilities_requirements;
		$scope.licenses_requirements = licenses_requirements;
		$scope.only_not_user = [];
		$scope.extras_not_user = [];
		$scope.inhabilities_not_user = [];
		$scope.licenses_not_user = [];
		$scope.toapproved =[];
    
	    $scope.seeValidation = function(see){
	      if (see == "true"){
	        return true
	      }
	      else{
	        return false
	      }
	    }

    
		$scope.hoexAprobador = function(){
			return $scope.user.employee.hoex_approver != '00000000' &&  $scope.user.employee.hoex_approver != null 
		};
    
	    $scope.incaAprobador = function(){
	      return $scope.user.employee.inca_approver != '00000000' &&  $scope.user.employee.inca_approver != null 
	    };
	    
	    $scope.presAprobador = function(){
	      return $scope.user.employee.pres_approver != '00000000' &&  $scope.user.employee.pres_approver != null 
	    };
	    
	    $scope.vacaAprobador = function(){
	      return $scope.user.employee.vaca_approver != '00000000' &&  $scope.user.employee.vaca_approver != null 
	    };
	    
	    $scope.permAprobador = function(){
	      return $scope.user.employee.perm_approver != '00000000' &&  $scope.user.employee.perm_approver != null 
	    };
	    
	    $scope.cesaAprobador = function(){
	      return $scope.user.employee.cesa_approver != '00000000' &&  $scope.user.employee.cesa_approver != null 
	    };
		
		// // sacar todos los articulos publicados que NO son mios
		// angular.forEach($scope.articles, function(value, key) {
		// 	var i = $scope.articles.indexOf(value);
		// 	if (value.employee_id != 1){
		// 		$scope.articles_not_mine.push(value);
		// 	}
		// });
		
		//vacaciones pendientes
		angular.forEach($scope.vac_requirements,function(value,index){
			if (value.employee.vaca_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
				$scope.only_not_user.push(value);
			}
		});
		
		//extras pendientes
		angular.forEach($scope.extras_requirements,function(value,index){			
			if (value.employee.hoex_approver == $scope.user.employee.id_posicion && value.status == "Espera"){				
				$scope.extras_not_user.push(value);
			}
		});
    
        // datos maestros
		angular.forEach(infos, function(value, key) {		
			var value_1 = '';
			if(value.boss != null){
				value_1 = value.boss.toString();
			}			
			var value_2 = '';
			if($scope.user.employee.id_posicion != null){
				value_2 = $scope.user.employee.id_posicion.toString();
			}
			if (value_1 ===  value_2 && (value.approved === false || value.approved === 'false' )){
				$scope.toapproved.push(value);
			}
		});
		
		//inhabilidades pendientes
		angular.forEach($scope.inhabilities_requirements,function(value,index){
			if (value.employee.inca_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
				$scope.inhabilities_not_user.push(value);
			}
		});
		
		//licencias pendientes
		angular.forEach($scope.licenses_requirements,function(value,index){
			if (value.employee.perm_approver == $scope.user.employee.id_posicion && value.status == "Espera"){
				$scope.licenses_not_user.push(value);
			}
		});
		
		// console.log($scope.licenses_not_user);
		
    });
}());
