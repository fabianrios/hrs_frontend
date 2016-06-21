(function(){
	'use strict';
  
	angular.module('employee_info', ['employee_info.service','data_master.service','info.service', 'ui.date'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.employee_info', {
			url: '/employee_info',
			templateUrl: 'app/employee_info/employee_info.tpl.html',
			controller: 'Employee_info.ListController',
			resolve:{
				missolicitudes:function(Info){
					return Info.index().$promise;
				},
				datamaster: function(DataMaster){
          			return DataMaster.master_data_labels_company().$promise;
        		}
			}
		})
		.state('main.views.employee_info_lookup', {
			url: '/employee_info/:id?c/view',
			templateUrl: 'app/employee_info/employee_info_lookup.tpl.html',
			controller: 'Employee_info.LookupController',
			resolve: {
				info: function(Employee_info, $stateParams){
					return Employee_info.show({id: $stateParams.id, pernr: $stateParams.id, company_id: $stateParams.c}).$promise;
				},			
				employee: function(Employee, $stateParams){
					return Employee.show({id: $stateParams.id, identification: $stateParams.id, c: $stateParams.c}).$promise;
				},
				datamaster: function(DataMaster){
          return DataMaster.master_data_labels_company().$promise;
        }
			}
		})
	})	
	.controller('Employee_info.ListController', ['$scope', '$rootScope', '$state', '$filter', 'Info', 'missolicitudes', '$anchorScroll', 'Employee','datamaster', function($scope, $rootScope,$state, $filter, Info, missolicitudes, $anchorScroll, Employee,datamaster){
		$rootScope.employee_info = $scope.user.employee_info;
 		$scope.missolicitudes = missolicitudes;
    
		$scope.inputEmployeeInclude 		= 'app/employee_info/input_employee_info.tpl.html';
		$scope.inputDateEmployeeInclude = 'app/employee_info/input_date_employee_info.tpl.html';	
		$scope.includeInfoMessage 			= 'app/employee_info/info_message.tpl.html'
				
		//all companies
		$scope.paises = datamaster.master_data.countries;
		$scope.estados = datamaster.master_data.state;
		$scope.genero = ["nill", "Masculino", "Femenino"];
		$scope.gender_obj = [{value : "Masculino", label : 1}, {value : "Femenino", label: 2}];
		$scope.estado_civil = ["Sol.","Cas.","Viu.","Sep.","Div.","Cohab."];
		$scope.estado_obj = [{value: "Sol.", label: 0},{value:"Cas.",label:1},{value:"Viu.",label:2},{value:"Sep.",label:3},{value:"Div.",label:4},{value:"Cohab.",label:5}];
		$scope.familiares = datamaster.master_data.family;
		$scope.bancos = datamaster.master_data.banks;
		$scope.formacion = datamaster.master_data.formations;
		$scope.titulos = datamaster.master_data.titles;
		$scope.especialidad = datamaster.master_data.specialties;
		$scope.institutos = datamaster.master_data.institutes;
		$scope.rel_laborales = datamaster.master_data.labor_relations;;

		
		$scope.edit_field = function( edit ){
			return edit === 'X' && $scope.user.employee.dams_approver && $scope.user.employee.dams_approver != '00000000'
		}

		$scope.isFieldDisabled = function(edit){
			var style = '';
			if (!$scope.edit_field(edit)) {
				style = 'field-disabled'
			}
			return style;
		}
		
		$scope.cargarAprobador = function(identification){
		    $scope.approver = Employee.approver_employee({id_posicion: identification});      
		}
		$scope.cargarAprobador($scope.user.employee.dams_approver);

		$scope.search_country = function(data){
			// Cual es el pais??
			angular.forEach($scope.paises, function(value, key) {
				if (value.land1 == data){
					$scope.country = $scope.paises[key].land1;
				}
			});
		};

		var flagFamily = 0;
		var uniqueVals = [];
		var familyData = [];
		angular.forEach($rootScope.employee_info.datos_familiares, function(value, key) {
			if (value.tcamp !== "HIDE"){
				var data 			 = {};
				data.tcamp = value.tcamp;
				data.ccamp = value.ccamp;
				data.lstbx = value.lstbx;
				data.ncamp = value.ncamp;
				data.dcamp = value.dcamp;
				data.sedit = value.sedit;
				
				uniqueVals.push(data);

				if (value.pvisu === '10'){
					familyData[flagFamily] = uniqueVals;
					uniqueVals = [];
					flagFamily += 1;
				}
			}
		});
		$rootScope.familyData = familyData;
		
		/*
		* Dividir la información de cada beneficiario de tal forma que se vea por renglon
		*/
		$scope.beneficiarios = [];
		var flagBen = 0;
		angular.forEach($rootScope.employee_info.datos_beneficiarios, function(val, i){
			if (val.dcamp == "PARENTESCO"){
				if ($scope.beneficiarios.length > 0){
					flagBen += 1;
				}
				$scope.beneficiarios[flagBen] = []; 
			}
			$scope.beneficiarios[flagBen].push(val);
		});
		//Beneficiarios ilimitados 
		$scope.verifyBeneficiario  = function(ncamp){
			if(ncamp.indexOf("P0831-FAM")>-1){
				return true;
			}
		};
		$scope.defaultDataBenef = function(ncamp){
			if(ncamp.indexOf("P0831-FAM")>-1){
				return false;
			}else{
				return true;
			}
		};
		/*
		* Dividir la informacion por renglones para institutos
		*/
		$scope.estudios = [];
		var flagEst = 0;
		angular.forEach($rootScope.employee_info.datos_estudios, function(val, i){
			if (val.ncamp == "P0022-SLART"){
				if ($scope.estudios.length > 0){
					flagEst += 1;
				}
				$scope.estudios[flagEst] = []; 
			}
			$scope.estudios[flagEst].push(val);
		});
		$scope.trade_date = function(data){
			// console.log("recibido:",data);
			data = new Date(data);
			// console.log("vuelto fecha:",data);
			data = $filter('date')(data, 'yyyy-MM-dd', '-0500');
			// data = data.setMinutes(data.getMinutes() - data.getTimezoneOffset());
			// data.toJSON().slice(0, 10);
			// console.log("formateado:",data);
			return data
		};
		
		$scope.search_estado = function(data){
			// Cual es el pais??
			angular.forEach($scope.estados, function(value, key) {
				// console.log(value.land1,key);
				if (value.bland == data){
					$scope.states = $scope.estados[key].bland;
					// console.log($scope.states,key);
				}
			})
		};
		
		$scope.search_natio = function(data){
			// Cual es la nacionalidad??
			angular.forEach($scope.paises, function(value, key) {
				// console.log(value.land1,data);
				if (value.land1 == data){
					$scope.natio = $scope.paises[key].land1;
					// console.log($scope.natio);
				}
			})
		};
		
		$scope.search_genero = function(data){
			// Cual es la nacionalidad??
			angular.forEach($scope.gender_obj, function(value, key) {
				// console.log(value.land1,data);
				if (value.label == data){
					$scope.gender = value.label;
					// console.log($scope.gender);
				}
			})
		};
		
		$scope.search_est_civil = function(data){
			// Cual es el est. civil??
			angular.forEach($scope.estado_obj, function(value, key) {
				// console.log(value.land1,data);
				if (value.label == data){
					$scope.est_civil = value.label;
					// console.log($scope.est_civil);
				}
			})
		};
		
		$scope.cambiar = function (pais){
			angular.forEach($scope.paises, function(value, key) {
				// console.log(value.land1,key);
				if (value.land1 == pais){
					$scope.comparador = $scope.paises[key].landx;
					// console.log($scope.country,key)
				}
			})
		};
		
		$scope.cambiar_estados = function (estado){
			angular.forEach($scope.estados, function(value, key) {
				// console.log(value.land1,key);
				if (value.bland == estado){
					$scope.comparador = $scope.estados[key].bezei;
					// console.log($scope.comparador,key);
				}
			})
		};
		
		$scope.cambiar_genero = function (genero){
			angular.forEach($scope.gender_obj, function(value, key) {
				// console.log(value.land1,key);
				if (value.label == genero){
					$scope.comparador = $scope.gender_obj[key].value;
					// console.log($scope.comparador,key);
				}
			})
		};
		
		$scope.cambiar_est_civil = function (genero){
			angular.forEach($scope.estado_obj, function(value, key) {
				// console.log(value.land1,key);
				if (value.label == genero){
					$scope.comparador = $scope.estado_obj[key].value;
					// console.log($scope.comparador,key);
				}
			})
		};
		
		$scope.find_institutos = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].slart == compare) {
						return obj[i].stext;
					}
				}
				return compare;
		}
		
		$scope.find_especialidad = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].faart == compare) {
						return obj[i].ftext;
					}
				}
				return compare;
		}
		
		$scope.find_formacion = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].ausbi == compare) {
						return obj[i].atext;
					}
				}
				return compare;
		}
		
		$scope.find_titulos = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].slabs == compare) {
						return obj[i].stext;
					}
				}
				return compare;
		}
		
		
		$scope.find_banks = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].bankl == compare) {
						return obj[i].banka;
					}
				}
				return compare;
		}
		
		$scope.find_related = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].subty == compare) {
						return obj[i].stext;
					}
				}
				return compare;
		}
		
		$scope.find_states = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].bland == compare) {
						return obj[i].bezei;
					}
				}
				return compare;
		}
		
		$scope.find_country = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].land1 == compare) {
						return obj[i].landx;
					}
				}
				return compare;
		}
		
		$scope.find_natio = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].land1 == compare) {
						return obj[i].natio;
					}
				}
				return compare;
		}
		$scope.sortableOptions = {
			'placeholder': 'placeholder'
		};
		
		$scope.disabling = "disabled";
	
		/*
		$scope.cambiarInfo = function(copy, subty, ncamp, dcamp, ccamp, objid, comparador, objps, where){
			if(copy !== ccamp){
				console.log('subty', subty)
				console.log('ncamp', ncamp)
				console.log('dcamp', dcamp)
				console.log('ccamp', ccamp)
				console.log('objid', objid)
				console.log('comparador', comparador)
				console.log('objps', objps)
				console.log('where', where)
				
				$scope.info = new Info();

				$scope.info.subty = subty;
				$scope.info.ncamp = ncamp;
				$scope.info.ccamp = ccamp;
				$scope.info.dcamp = dcamp;
				$scope.info.objid = objid;
				$scope.info.objps = objps;					
				$scope.info.where = where;			
				$scope.info.comparador = comparador;
				
				$scope.info.$save(function() {			
				   $state.go('main.views.employee_info'); // on success go back to datos_maestros
				   $anchorScroll("mis_solicitudes");
				   $scope.alerts.push({type: 'success', msg: "La solicitud para cambiar el campo '"+ $scope.info.dcamp +"' a '"+ $scope.info.ccamp + "' a sido enviada para aprobacion"});
			         window.setTimeout(function() {
			           $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
			             $(this).remove();
			             $scope.alerts = [];
			           });
			         }, 5000);
				   $scope.missolicitudes.push($scope.info);
				   // reset comparador
				   $scope.comparador = "";
				});
			}
		}
		*/
		
		
		$scope.deleteSolicitud = function(solicitud,modal) { 
			// console.log(solicitud);
			solicitud.$delete(function() {
				var index = $scope.missolicitudes.indexOf(solicitud);				
				$scope.missolicitudes.splice(index, 1);
				$('#elmodal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "La solicitud a sido borrada"});
		        window.setTimeout(function() {
		          $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		            $(this).remove();
		            $scope.alerts = [];
		          });
		        }, 5000);
			});
		} ///BORRAR
	}])
	.controller('Employee_info.LookupController', ['$state', '$scope', '$rootScope', 'info', 'employee', '$http','datamaster', function ($state, $scope, $rootScope, info, employee, $http,datamaster) {
		if($scope.user.employee.see_all_dm  ===  'false' || $scope.user.employee.see_all_dm  ===  false ){
			$state.transitionTo('main.views.dashboard');
		} 
		
		$rootScope.employee = employee;
		$rootScope.employee_info = info;
		
		
		if (typeof $scope.employee_info.error !== "undefined"){			
			$scope.alerts.push({type: 'alert', msg: $scope.employee_info.error});
		      window.setTimeout(function() {
		        $(".alert-box").fadeTo(500, 0).slideUp(500, function(){
		          $(this).remove();
		          $rootScope.alerts = [];
		        });
		      }, 5000);
		}
				  
	    $scope.privateValidation = function(priv){
	      if (priv == "X" && $scope.user.employee.see_all_dm != "true"){
	        return "hide"
	      }
	      else{
	        return "show"
	      }
	    }

    	$scope.edit_field = function( edit ){
			return edit === 'X' && $scope.user.employee.dams_approver && $scope.user.employee.dams_approver != '00000000'
		}
    
		
		$scope.estados = datamaster.master_data.state;
		$scope.paises = $scope.paises = datamaster.master_data.countries;
		$scope.genero = ["nill", "Masculino", "Femenino"];
		$scope.estado_civil = ["Sol.","Cas.","Viu.","Sep.","Div.","Cohab."];
		$scope.familiares = datamaster.master_data.family;
		$scope.bancos = datamaster.master_data.banks;
		$scope.formacion = datamaster.master_data.formations;
		$scope.titulos = datamaster.master_data.titles;
		$scope.especialidad = datamaster.master_data.specialties;
		$scope.institutos = datamaster.master_data.institutes;
		
		$scope.find_institutos = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].slart == compare) {
						return obj[i].stext;
					}
				}
				return compare;
		}
		
		$scope.find_especialidad = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].faart == compare) {
						return obj[i].ftext;
					}
				}
				return compare;
		}
		
		$scope.find_formacion = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].ausbi == compare) {
						return obj[i].atext;
					}
				}
				return compare;
		}
		
		$scope.find_titulos = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].slabs == compare) {
						return obj[i].stext;
					}
				}
				return compare;
		}
		
		
		$scope.find_banks = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].bankl == compare) {
						return obj[i].banka;
					}
				}
				return compare;
		}
		
		$scope.find_related = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].subty == compare) {
						return obj[i].stext;
					}
				}
				return compare;
		}
		
		$scope.find_states = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].bland == compare) {
						return obj[i].bezei;
					}
				}
				return compare;
		}
		
		$scope.find_country = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].land1 == compare) {
						return obj[i].landx;
					}
				}
				return compare;
		}
		
		$scope.find_natio = function (obj, compare){
			var len = obj.length;
				for (var i=0; i<len; i++) {
					// console.log(obj[i].bland);
					if (obj[i].land1 == compare) {
						return obj[i].natio;
					}
				}
				return compare;
		}
	}]);
}());
