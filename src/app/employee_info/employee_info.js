(function(){
	'use strict';
  
	angular.module('employee_info', ['employee_info.service','info.service'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.employee_info', {
			url: '/employee_info',
			templateUrl: 'app/employee_info/employee_info.tpl.html',
			controller: 'Employee_info.ListController',
			resolve:{
				infos:function(Info){
					return Info.index().$promise;
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
				}
			}
		})
	})
	
	.controller('Employee_info.ListController', function($scope, $state, $rootScope,$http, currentUser, Info, infos){
		
		$scope.user = currentUser;
		$scope.vacation = $scope.user.vacation;
		$rootScope.employee_info = $scope.user.employee_info;
		$scope.toapproved = [];
		$scope.missolicitudes = [];
		
		// Mis solicitudes
		angular.forEach(infos, function(value, key) {
			console.log(value.pernr,$scope.user.employee_id);
			if (value.pernr == $scope.user.employee_id){
				$scope.missolicitudes.push(value);
			}
		});
		
		//  solicitudes a aprobar
		angular.forEach(infos, function(value, key) {
			// console.log(value,key);
			if (value.apply_reviewer == $scope.user.employee_id){
				$scope.toapproved.push(value);
			}
		});
		
		console.log("$rootScope.employee_info", $rootScope.employee_info,"$scope.user", $scope.user);
		console.log("$scope.toapproved",$scope.toapproved, "$scope.missolicitudes", $scope.missolicitudes);
		
		$scope.estados = [{"spras": "S", "land1": "CO", "bland": "05", "bezei": "ANTIOQUIA"}, {"spras": "S", "land1": "CO", "bland": "08", "bezei": "ATLANTICO"}, {"spras": "S", "land1": "CO", "bland": "11", "bezei": "BOGOTA"}, {"spras": "S", "land1": "CO", "bland": "13", "bezei": "BOLIVAR"}, {"spras": "S", "land1": "CO", "bland": "15", "bezei": "BOYACA"}, {"spras": "S", "land1": "CO", "bland": "17", "bezei": "CALDAS"}, {"spras": "S", "land1": "CO", "bland": "18", "bezei": "CAQUETA"}, {"spras": "S", "land1": "CO", "bland": "19", "bezei": "CAUCA"}, {"spras": "S", "land1": "CO", "bland": "20", "bezei": "CESAR"}, {"spras": "S", "land1": "CO", "bland": "23", "bezei": "CORDOBA"}, {"spras": "S", "land1": "CO", "bland": "25", "bezei": "CUNDINAMARCA"}, {"spras": "S", "land1": "CO", "bland": "27", "bezei": "CHOCO"}, {"spras": "S", "land1": "CO", "bland": "41", "bezei": "HUILA"}, {"spras": "S", "land1": "CO", "bland": "44", "bezei": "LA GUAJIRA"}, {"spras": "S", "land1": "CO", "bland": "47", "bezei": "MAGDALENA"}, {"spras": "S", "land1": "CO", "bland": "50", "bezei": "META"}, {"spras": "S", "land1": "CO", "bland": "52", "bezei": "NARINO"}, {"spras": "S", "land1": "CO", "bland": "54", "bezei": "NORTE SANTANDER"}, {"spras": "S", "land1": "CO", "bland": "63", "bezei": "QUINDIO"}, {"spras": "S", "land1": "CO", "bland": "66", "bezei": "RISARALDA"}, {"spras": "S", "land1": "CO", "bland": "68", "bezei": "SANTANDER"}, {"spras": "S", "land1": "CO", "bland": "70", "bezei": "SUCRE"}, {"spras": "S", "land1": "CO", "bland": "73", "bezei": "TOLIMA"}, {"spras": "S", "land1": "CO", "bland": "76", "bezei": "VALLE"}, {"spras": "S", "land1": "CO", "bland": "81", "bezei": "ARAUCA"}, {"spras": "S", "land1": "CO", "bland": "85", "bezei": "CASANARE"}, {"spras": "S", "land1": "CO", "bland": "86", "bezei": "PUTUMAYO"}, {"spras": "S", "land1": "CO", "bland": "88", "bezei": "SAN ANDRES"}, {"spras": "S", "land1": "CO", "bland": "91", "bezei": "AMAZONAS"}, {"spras": "S", "land1": "CO", "bland": "94", "bezei": "GUAINIA"}, {"spras": "S", "land1": "CO", "bland": "95", "bezei": "GUAVIARE"}, {"spras": "S", "land1": "CO", "bland": "97", "bezei": "VAUPES"}, {"spras": "S", "land1": "CO", "bland": "99", "bezei": "VICHADA"}];
		$scope.paises = [{"spras": "S", "land1": "AD", "landx": "Andorran", "natio": "Andorran"}, {"spras": "S", "land1": "AE", "landx": "Utd.Arab Emir.", "natio": "Unit.Arab Emir."}, {"spras": "S", "land1": "AF", "landx": "Afghanistan", "natio": "Afghan"}, {"spras": "S", "land1": "AG", "landx": "Antigua/Barbuda", "natio": "Antiguan"}, {"spras": "S", "land1": "AI", "landx": "Anguilla", "natio": "Anguilla"}, {"spras": "S", "land1": "AL", "landx": "Albania", "natio": "Albanian"}, {"spras": "S", "land1": "AM", "landx": "Armenia", "natio": "Armenian"}, {"spras": "S", "land1": "AO", "landx": "Angola", "natio": "Angolan"}, {"spras": "S", "land1": "AQ", "landx": "Antarctica", "natio": "Antarctica"}, {"spras": "S", "land1": "AR", "landx": "Argentina", "natio": "Argentina"}, {"spras": "S", "land1": "AS", "landx": "Samoa, America", "natio": "Samoan"}, {"spras": "S", "land1": "AT", "landx": "Austria", "natio": "austríaca"}, {"spras": "S", "land1": "AW", "landx": "Aruba", "natio": "Arubanic"}, {"spras": "S", "land1": "AZ", "landx": "Azerbaijan", "natio": "Azerbaijani"}, {"spras": "S", "land1": "BA", "landx": "Bosnia-Herz.", "natio": "Bosnian"}, {"spras": "S", "land1": "BB", "landx": "Barbados", "natio": "Barbadan"}, {"spras": "S", "land1": "BD", "landx": "Bangladesh", "natio": "Bangladeshi"}, {"spras": "S", "land1": "BF", "landx": "Burkina Faso", "natio": "Burkinabe"}, {"spras": "S", "land1": "BG", "landx": "Bulgaria", "natio": "Bulgarian"}, {"spras": "S", "land1": "BH", "landx": "Bahrain", "natio": "Bahraini"}, {"spras": "S", "land1": "BI", "landx": "Burundi", "natio": "Burundi"}, {"spras": "S", "land1": "BJ", "landx": "Benin", "natio": "Beninese"}, {"spras": "S", "land1": "BL", "landx": "Blue", "natio": ""}, {"spras": "S", "land1": "BM", "landx": "Bermuda", "natio": "Bermudan"}, {"spras": "S", "land1": "BN", "landx": "Brunei Daruss.", "natio": "Brunei"}, {"spras": "S", "land1": "BQ", "landx": "Bonaire, Saba", "natio": "Dutch"}, {"spras": "S", "land1": "BR", "landx": "Brazil", "natio": "Brazilian"}, {"spras": "S", "land1": "BS", "landx": "Bahamas", "natio": "Bahaman"}, {"spras": "S", "land1": "BT", "landx": "Bhutan", "natio": "Bhutanese"}, {"spras": "S", "land1": "BV", "landx": "Bouvet Islands", "natio": "Bouvet Islands"}, {"spras": "S", "land1": "BW", "landx": "Botswana", "natio": "Botswanan"}, {"spras": "S", "land1": "BY", "landx": "Belarus", "natio": "Belarusian"}, {"spras": "S", "land1": "BZ", "landx": "Belize", "natio": "Belizean"}, {"spras": "S", "land1": "CC", "landx": "Coconut Islands", "natio": "Australian"}, {"spras": "S", "land1": "CD", "landx": "Dem. Rep. Congo", "natio": "Congolese"}, {"spras": "S", "land1": "CF", "landx": "CAR", "natio": "Central African"}, {"spras": "S", "land1": "CG", "landx": "Rep.of Congo", "natio": "Congolese"}, {"spras": "S", "land1": "CK", "landx": "Cook Islands", "natio": "Cook Islands"}, {"spras": "S", "land1": "CM", "landx": "Cameroon", "natio": "Cameroonian"}, {"spras": "S", "land1": "CN", "landx": "China", "natio": "Chinese"}, {"spras": "S", "land1": "CO", "landx": "Colombia", "natio": "Colombiano"}, {"spras": "S", "land1": "CR", "landx": "Costa Rica", "natio": "Costa Rican"}, {"spras": "S", "land1": "CS", "landx": "Serbia/Monten.", "natio": "Serbian/Monten."}, {"spras": "S", "land1": "CV", "landx": "Cape Verde", "natio": "Cape Verdean"}, {"spras": "S", "land1": "CW", "landx": "Curaçao", "natio": "Curaçaoan"}, {"spras": "S", "land1": "CX", "landx": "Christmas Islnd", "natio": "Australian"}, {"spras": "S", "land1": "CY", "landx": "Cyprus", "natio": "Cypriot"}, {"spras": "S", "land1": "CZ", "landx": "Czech Republic", "natio": "Czech"}, {"spras": "S", "land1": "DE", "landx": "Alemania", "natio": "Aleman"}, {"spras": "S", "land1": "DJ", "landx": "Djibouti", "natio": "Djiboutian"}, {"spras": "S", "land1": "DZ", "landx": "Algeria", "natio": "Algerian"}, {"spras": "S", "land1": "EE", "landx": "Estonia", "natio": "Estonian"}, {"spras": "S", "land1": "EG", "landx": "Egypt", "natio": "Egyptian"}, {"spras": "S", "land1": "EH", "landx": "West Sahara", "natio": "French"}, {"spras": "S", "land1": "ER", "landx": "Eritrea", "natio": "Eritrean"}, {"spras": "S", "land1": "ET", "landx": "Ethiopia", "natio": "Ethiopian"}, {"spras": "S", "land1": "EU", "landx": "European Union", "natio": ""}, {"spras": "S", "land1": "FI", "landx": "Finlandia", "natio": "finlandesa"}, {"spras": "S", "land1": "FJ", "landx": "Fiji", "natio": "Fijian"}, {"spras": "S", "land1": "FK", "landx": "Falkland Islnds", "natio": "British"}, {"spras": "S", "land1": "FM", "landx": "Micronesia", "natio": "Micronesian"}, {"spras": "S", "land1": "FO", "landx": "Faroe Islands", "natio": "Danish"}, {"spras": "S", "land1": "GA", "landx": "Gabon", "natio": "Gabonese"}, {"spras": "S", "land1": "GB", "landx": "United Kingdom", "natio": "British"}, {"spras": "S", "land1": "GD", "landx": "Grenada", "natio": "Grenadian"}, {"spras": "S", "land1": "GE", "landx": "Georgia", "natio": "Georgian"}, {"spras": "S", "land1": "GF", "landx": "French Guayana", "natio": "French"}, {"spras": "S", "land1": "GG", "landx": "Guernsey", "natio": "British"}, {"spras": "S", "land1": "GH", "landx": "Ghana", "natio": "Ghanian"}, {"spras": "S", "land1": "GI", "landx": "Gibraltar", "natio": "Gibraltar"}, {"spras": "S", "land1": "GL", "landx": "Greenland", "natio": "Danish"}, {"spras": "S", "land1": "GM", "landx": "Gambia", "natio": "Gambian"}, {"spras": "S", "land1": "GN", "landx": "Guinea", "natio": "Guinean"}, {"spras": "S", "land1": "GP", "landx": "Guadeloupe", "natio": "French"}, {"spras": "S", "land1": "GQ", "landx": "Equatorial Guin", "natio": "Equatorial Guin"}, {"spras": "S", "land1": "GS", "landx": "S. Sandwich Ins", "natio": "South Georgia"}, {"spras": "S", "land1": "GU", "landx": "Guam", "natio": "American"}, {"spras": "S", "land1": "GW", "landx": "Guinea-Bissau", "natio": "Guinean"}, {"spras": "S", "land1": "GY", "landx": "Guyana", "natio": "Guyanese"}, {"spras": "S", "land1": "HK", "landx": "Hong Kong", "natio": "Hong Kong"}, {"spras": "S", "land1": "HM", "landx": "Heard/McDon.Isl", "natio": "Heard/McDon.Isl"}, {"spras": "S", "land1": "HN", "landx": "Honduras", "natio": "Honduran"}, {"spras": "S", "land1": "HR", "landx": "Croatia", "natio": "Croatian"}, {"spras": "S", "land1": "HU", "landx": "Hungary", "natio": "Hungarian"}, {"spras": "S", "land1": "ID", "landx": "Indonesia", "natio": "Indonesian"}, {"spras": "S", "land1": "IE", "landx": "Ireland", "natio": "Irish"}, {"spras": "S", "land1": "IM", "landx": "Isle of Man", "natio": "British"}, {"spras": "S", "land1": "IN", "landx": "India", "natio": "Indian"}, {"spras": "S", "land1": "IO", "landx": "Brit.Ind.Oc.Ter", "natio": "Brit.Ind.Oc.Ter"}, {"spras": "S", "land1": "IQ", "landx": "Iraq", "natio": "Iraqi"}, {"spras": "S", "land1": "IR", "landx": "Iran", "natio": "Iranian"}, {"spras": "S", "land1": "IS", "landx": "Iceland", "natio": "Icelandic"}, {"spras": "S", "land1": "JE", "landx": "Jersey", "natio": "British"}, {"spras": "S", "land1": "JM", "landx": "Jamaica", "natio": "Jamaican"}, {"spras": "S", "land1": "JO", "landx": "Jordan", "natio": "Jordanian"}, {"spras": "S", "land1": "KE", "landx": "Kenya", "natio": "Kenyan"}, {"spras": "S", "land1": "KG", "landx": "Kyrgyzstan", "natio": "Kyrgyzstani"}, {"spras": "S", "land1": "KH", "landx": "Cambodia", "natio": "Cambodian"}, {"spras": "S", "land1": "KI", "landx": "Kiribati", "natio": "Kiribati"}, {"spras": "S", "land1": "KM", "landx": "Comoros", "natio": "Comoran"}, {"spras": "S", "land1": "KP", "landx": "North Korea", "natio": "Korean"}, {"spras": "S", "land1": "KW", "landx": "Kuwait", "natio": "Kuwaiti"}, {"spras": "S", "land1": "KY", "landx": "Cayman Islands", "natio": "British"}, {"spras": "S", "land1": "KZ", "landx": "Kazakhstan", "natio": "Kazakh"}, {"spras": "S", "land1": "LA", "landx": "Laos", "natio": "Laotian"}, {"spras": "S", "land1": "LC", "landx": "St. Lucia", "natio": "Lucian"}, {"spras": "S", "land1": "LI", "landx": "Liechtenstein", "natio": "Liechtenstein"}, {"spras": "S", "land1": "LK", "landx": "Sri Lanka", "natio": "Sri Lankan"}, {"spras": "S", "land1": "LR", "landx": "Liberia", "natio": "Liberian"}, {"spras": "S", "land1": "LS", "landx": "Lesotho", "natio": "Lesothan"}, {"spras": "S", "land1": "LT", "landx": "Lithuania", "natio": "Lithuanian"}, {"spras": "S", "land1": "LU", "landx": "Luxembourg", "natio": "Luxembourgian"}, {"spras": "S", "land1": "LV", "landx": "Latvia", "natio": "Latvian"}, {"spras": "S", "land1": "LY", "landx": "Libya", "natio": "Libyan"}, {"spras": "S", "land1": "MA", "landx": "Morocco", "natio": "Moroccan"}, {"spras": "S", "land1": "MC", "landx": "Monaco", "natio": "Monegasque"}, {"spras": "S", "land1": "MD", "landx": "Moldova", "natio": "Moldovan"}, {"spras": "S", "land1": "MG", "landx": "Madagascar", "natio": "Madagascan"}, {"spras": "S", "land1": "MH", "landx": "Marshall Islnds", "natio": "Marshallese"}, {"spras": "S", "land1": "MK", "landx": "Macedonia", "natio": "Macedonian"}, {"spras": "S", "land1": "ML", "landx": "Mali", "natio": "Malian"}, {"spras": "S", "land1": "MM", "landx": "Burma", "natio": "Burmese"}, {"spras": "S", "land1": "MN", "landx": "Mongolia", "natio": "Mongolian"}, {"spras": "S", "land1": "MO", "landx": "Macau", "natio": "Portuguese"}, {"spras": "S", "land1": "MP", "landx": "N.Mariana Islnd", "natio": "Marianian"}, {"spras": "S", "land1": "MQ", "landx": "Martinique", "natio": "French"}, {"spras": "S", "land1": "MR", "landx": "Mauretania", "natio": "Mauretanian"}, {"spras": "S", "land1": "MS", "landx": "Montserrat", "natio": "Montserrat"}, {"spras": "S", "land1": "MT", "landx": "Malta", "natio": "Maltese"}, {"spras": "S", "land1": "MU", "landx": "Mauritius", "natio": "Mauritian"}, {"spras": "S", "land1": "MV", "landx": "Maldives", "natio": "Maldivian"}, {"spras": "S", "land1": "MW", "landx": "Malawi", "natio": "Malawian"}, {"spras": "S", "land1": "MY", "landx": "Malaysia", "natio": "Malaysian"}, {"spras": "S", "land1": "MZ", "landx": "Mozambique", "natio": "Mozambican"}, {"spras": "S", "land1": "NA", "landx": "Namibia", "natio": "Namibian"}, {"spras": "S", "land1": "NC", "landx": "New Caledonia", "natio": "French"}, {"spras": "S", "land1": "NE", "landx": "Niger", "natio": "Nigerien"}, {"spras": "S", "land1": "NF", "landx": "Norfolk Islands", "natio": "Norfolk Islands"}, {"spras": "S", "land1": "NG", "landx": "Nigeria", "natio": "Nigerian"}, {"spras": "S", "land1": "NL", "landx": "Netherlands", "natio": "Dutch"}, {"spras": "S", "land1": "NP", "landx": "Nepal", "natio": "Nepalese"}, {"spras": "S", "land1": "NR", "landx": "Nauru", "natio": "Nauruian"}, {"spras": "S", "land1": "NT", "landx": "NATO", "natio": ""}, {"spras": "S", "land1": "NU", "landx": "Niue", "natio": "Niuean"}, {"spras": "S", "land1": "NZ", "landx": "New Zealand", "natio": "New Zealand"}, {"spras": "S", "land1": "OM", "landx": "Oman", "natio": "Omani"}, {"spras": "S", "land1": "OR", "landx": "Orange", "natio": ""}, {"spras": "S", "land1": "PF", "landx": "Frenc.Polynesia", "natio": "French"}, {"spras": "S", "land1": "PG", "landx": "Pap. New Guinea", "natio": "Pap.New Guinean"}, {"spras": "S", "land1": "PH", "landx": "Philippines", "natio": "Filipino"}, {"spras": "S", "land1": "PK", "landx": "Pakistan", "natio": "Pakistani"}, {"spras": "S", "land1": "PL", "landx": "Poland", "natio": "Polish"}, {"spras": "S", "land1": "PM", "landx": "St.Pier,Miquel.", "natio": "French"}, {"spras": "S", "land1": "PN", "landx": "Pitcairn Islnds", "natio": "British"}, {"spras": "S", "land1": "PR", "landx": "Puerto Rico", "natio": "American"}, {"spras": "S", "land1": "PS", "landx": "Palestine", "natio": "Palestinian"}, {"spras": "S", "land1": "PW", "landx": "Palau", "natio": "Palauan"}, {"spras": "S", "land1": "QA", "landx": "Qatar", "natio": "Qatari"}, {"spras": "S", "land1": "RE", "landx": "Reunion", "natio": "French"}, {"spras": "S", "land1": "RU", "landx": "Russian Fed.", "natio": "Russian"}, {"spras": "S", "land1": "RW", "landx": "Rwanda", "natio": "Rwandan"}, {"spras": "S", "land1": "SA", "landx": "Saudi Arabia", "natio": "Saudi Arabian"}, {"spras": "S", "land1": "SB", "landx": "Solomon Islands", "natio": "Solomonese"}, {"spras": "S", "land1": "SC", "landx": "Seychelles", "natio": "Seychellian"}, {"spras": "S", "land1": "SD", "landx": "Sudan", "natio": "Sudanese"}, {"spras": "S", "land1": "SE", "landx": "Suecia", "natio": "sueca"}, {"spras": "S", "land1": "SG", "landx": "Singapore", "natio": "Singaporean"}, {"spras": "S", "land1": "SH", "landx": "Saint Helena", "natio": "Saint Helena"}, {"spras": "S", "land1": "SI", "landx": "Slovenia", "natio": "Slovenian"}, {"spras": "S", "land1": "SJ", "landx": "Svalbard", "natio": "Norwegian"}, {"spras": "S", "land1": "SK", "landx": "Slovakia", "natio": "Slovakian"}, {"spras": "S", "land1": "SL", "landx": "Sierra Leone", "natio": "Sierra Leonean"}, {"spras": "S", "land1": "SM", "landx": "San Marino", "natio": "Sammarinese"}, {"spras": "S", "land1": "SN", "landx": "Senegal", "natio": "Senegalese"}, {"spras": "S", "land1": "SO", "landx": "Somalia", "natio": "Somali"}, {"spras": "S", "land1": "SR", "landx": "Suriname", "natio": "Surinamese"}, {"spras": "S", "land1": "SS", "landx": "South Sudan", "natio": "South Sudanese"}, {"spras": "S", "land1": "ST", "landx": "S.Tome,Principe", "natio": "Sao Tomean"}, {"spras": "S", "land1": "SV", "landx": "El Salvador", "natio": "Salvadoran"}, {"spras": "S", "land1": "SX", "landx": "Sint Maarten", "natio": "Sint Maarten"}, {"spras": "S", "land1": "SZ", "landx": "Swaziland", "natio": "Swazi"}, {"spras": "S", "land1": "TC", "landx": "Turksh Caicosin", "natio": "Turksh Caicosin"}, {"spras": "S", "land1": "TD", "landx": "Chad", "natio": "Chadian"}, {"spras": "S", "land1": "TF", "landx": "French S.Territ", "natio": "French"}, {"spras": "S", "land1": "TG", "landx": "Togo", "natio": "Togolese"}, {"spras": "S", "land1": "TH", "landx": "Thailand", "natio": "Thai"}, {"spras": "S", "land1": "TJ", "landx": "Tajikistan", "natio": "Tajikistani"}, {"spras": "S", "land1": "TK", "landx": "Tokelau Islands", "natio": "Tokelau Islands"}, {"spras": "S", "land1": "TL", "landx": "East Timor", "natio": ""}, {"spras": "S", "land1": "TM", "landx": "Turkmenistan", "natio": "Turkmenian"}, {"spras": "S", "land1": "TN", "landx": "Tunisia", "natio": "Tunisian"}, {"spras": "S", "land1": "TO", "landx": "Tonga", "natio": "Tongan"}, {"spras": "S", "land1": "TP", "landx": "East Timor", "natio": "East Timor"}, {"spras": "S", "land1": "TR", "landx": "Turkey", "natio": "Turkish"}, {"spras": "S", "land1": "TV", "landx": "Tuvalu", "natio": "Tuvaluese"}, {"spras": "S", "land1": "TW", "landx": "Taiwan", "natio": "Chinese"}, {"spras": "S", "land1": "TZ", "landx": "Tanzania", "natio": "Tanzanian"}, {"spras": "S", "land1": "UA", "landx": "Ukraine", "natio": "Ukrainian"}, {"spras": "S", "land1": "UG", "landx": "Uganda", "natio": "Ugandan"}, {"spras": "S", "land1": "UM", "landx": "Minor Outl.Isl.", "natio": "Minor Outl.Isl."}, {"spras": "S", "land1": "UN", "landx": "United Nations", "natio": ""}, {"spras": "S", "land1": "UZ", "landx": "Uzbekistan", "natio": "Uzbekistani"}, {"spras": "S", "land1": "VA", "landx": "Vatican City", "natio": "Vatican City"}, {"spras": "S", "land1": "VC", "landx": "St. Vincent", "natio": "Vincentian"}, {"spras": "S", "land1": "VE", "landx": "Venezuela", "natio": "Venezolano"}, {"spras": "S", "land1": "VG", "landx": "Brit.Virgin Is.", "natio": "British"}, {"spras": "S", "land1": "VI", "landx": "Amer.Virgin Is.", "natio": "American"}, {"spras": "S", "land1": "VN", "landx": "Vietnam", "natio": "Vietnamese"}, {"spras": "S", "land1": "VU", "landx": "Vanuatu", "natio": "Ni-Vanuatu"}, {"spras": "S", "land1": "WF", "landx": "Wallis,Futuna", "natio": "Wallis,Futuna"}, {"spras": "S", "land1": "WS", "landx": "Samoa", "natio": "Samoan"}, {"spras": "S", "land1": "YE", "landx": "Yemen", "natio": "Yemeni"}, {"spras": "S", "land1": "YT", "landx": "Mayotte", "natio": "French"}, {"spras": "S", "land1": "ZA", "landx": "South Africa", "natio": "South African"}, {"spras": "S", "land1": "ZM", "landx": "Zambia", "natio": "Zambian"}, {"spras": "S", "land1": "ZW", "landx": "Zimbabwe", "natio": "Zimbabwean"}];
		$scope.genero = ["nill", "Masculino", "Femenino"];
		$scope.gender_obj = [{value : "Masculino", label : 1}, {value : "Femenino", label: 2}];
		$scope.estado_civil = ["Sol.","Cas.","Viu.","Sep.","Div.","Cohab."];
		$scope.estado_obj = [{value: "Sol.", label: 0},{value:"Cas.",label:1},{value:"Viu.",label:2},{value:"Sep.",label:3},{value:"Div.",label:4},{value:"Cohab.",label:5}];
		$scope.familiares = [{"sprsl": "S", "subty": "1", "stext": "Cónyuge"}, {"sprsl": "S", "subty": "10", "stext": "Cónyuge divorciado"}, {"sprsl": "S", "subty": "11", "stext": "Padre"}, {"sprsl": "S", "subty": "12", "stext": "Madre"}, {"sprsl": "S", "subty": "13", "stext": "Compañero"}, {"sprsl": "S", "subty": "14", "stext": "Hijo del compañero"}, {"sprsl": "S", "subty": "15", "stext": "Interlocutor indicado"}, {"sprsl": "S", "subty": "16", "stext": "Tío"}, {"sprsl": "S", "subty": "17", "stext": "Sobrino"}, {"sprsl": "S", "subty": "18", "stext": "Abuelo"}, {"sprsl": "S", "subty": "19", "stext": "Cuñado"}, {"sprsl": "S", "subty": "2", "stext": "Hijo"}, {"sprsl": "S", "subty": "20", "stext": "Suegro"}, {"sprsl": "S", "subty": "3", "stext": "Tutor legal"}, {"sprsl": "S", "subty": "4", "stext": "Testador"}, {"sprsl": "S", "subty": "5", "stext": "Tutor"}, {"sprsl": "S", "subty": "6", "stext": "Hijo adoptivo"}, {"sprsl": "S", "subty": "7", "stext": "Llamada de emergencia"}, {"sprsl": "S", "subty": "8", "stext": "Personas de referencia"}, {"sprsl": "S", "subty": "AR01", "stext": "Prenatal AR"}, {"sprsl": "S", "subty": "AR02", "stext": "Menor bajo tutela AR"}, {"sprsl": "S", "subty": "AR03", "stext": "Menor tutela temporaria AR"}, {"sprsl": "S", "subty": "AR04", "stext": "Hijo de cónyuge AR"}, {"sprsl": "S", "subty": "AR05", "stext": "Conviviente/concubino AR"}, {"sprsl": "S", "subty": "DE01", "stext": "Testador BAV"}, {"sprsl": "S", "subty": "J1", "stext": "Garante (JP)"}, {"sprsl": "S", "subty": "KW01", "stext": "Esposa"}, {"sprsl": "S", "subty": "QA01", "stext": "Esposa"}, {"sprsl": "S", "subty": "QA02", "stext": "Esposo"}];
		$scope.bancos = [{"banks": "CO", "bankl": "07", "banka": "BANCOLOMBIA"}];
		$scope.formacion = [{"langu": "S", "ausbi": "00006591", "atext": "ADMINISTRACION AERONATICA"}, {"langu": "S", "ausbi": "00006592", "atext": "ADMINSITRACION AGROPECUARIO"}, {"langu": "S", "ausbi": "00006593", "atext": "ADMINISTRACION AEROCIVIL"}, {"langu": "S", "ausbi": "00006594", "atext": "ADMINISTRACION DE AEROLINEAS Y AGENCIAS"}, {"langu": "S", "ausbi": "00006595", "atext": "ADMINISTRACION DE BIENES RAICES"}, {"langu": "S", "ausbi": "00006596", "atext": "ADMINISTRACION DE EMPRESAS"}, {"langu": "S", "ausbi": "00006597", "atext": "ADMINISTRACION DE INSTIRUCIONES DE SERVI"}, {"langu": "S", "ausbi": "00006598", "atext": "ADMINISTRACION DE NEGOCIOS"}, {"langu": "S", "ausbi": "00006599", "atext": "ADMINSITRACION DE OBRAS CIVILES"}, {"langu": "S", "ausbi": "00006600", "atext": "ADMINISTRACION DE OFICINAS"}, {"langu": "S", "ausbi": "00006601", "atext": "ADMINISTRACION DE SEGUROS"}, {"langu": "S", "ausbi": "00006602", "atext": "ADMINISTRACION DE SERVICIOS A BORDO (AER"}, {"langu": "S", "ausbi": "00006603", "atext": "ADMINISTRACION DE TRANSPORTE"}, {"langu": "S", "ausbi": "00006604", "atext": "ADMINISTRACION EDUCATIVO"}, {"langu": "S", "ausbi": "00006605", "atext": "ADMINISTRACION FINANCIERO"}, {"langu": "S", "ausbi": "00006606", "atext": "ADMINISTRACION HOSPITALARIO"}, {"langu": "S", "ausbi": "00006607", "atext": "ADMINISTRACION HOTELERO Y DE TURISMO"}, {"langu": "S", "ausbi": "00006608", "atext": "ADMINISTRACION MARITIMO"}, {"langu": "S", "ausbi": "00006609", "atext": "ADMINISTRACION PUBLICO"}, {"langu": "S", "ausbi": "00006610", "atext": "AGROLOGIA"}, {"langu": "S", "ausbi": "00006611", "atext": "AGRONOMIA"}, {"langu": "S", "ausbi": "00006612", "atext": "ANALISIS Y DISENO DE SISTEMAS DE COMPUTA"}, {"langu": "S", "ausbi": "00006613", "atext": "ANTROPOLOGIA"}, {"langu": "S", "ausbi": "00006614", "atext": "ARQUITECTURA"}, {"langu": "S", "ausbi": "00006615", "atext": "ARTE Y DECORACION"}, {"langu": "S", "ausbi": "00006616", "atext": "ARTES PLASTICAS"}, {"langu": "S", "ausbi": "00006617", "atext": "ARTES REPRESENTATIVAS"}, {"langu": "S", "ausbi": "00006618", "atext": "AVIACION (PILOTAJE Y SERVICIOS )"}, {"langu": "S", "ausbi": "00006619", "atext": "BACTERIOLOGIA"}, {"langu": "S", "ausbi": "00006620", "atext": "BELLAS ARTES"}, {"langu": "S", "ausbi": "00006621", "atext": "BIBLIOTECOLOGIA"}, {"langu": "S", "ausbi": "00006622", "atext": "BIOLOGIA"}, {"langu": "S", "ausbi": "00006623", "atext": "BIOLOGIA MARITNA"}, {"langu": "S", "ausbi": "00006624", "atext": "CIENCIAS MARINAS"}, {"langu": "S", "ausbi": "00006625", "atext": "CIENCIAS POLITICAS Y ADMINISTRATIVAS"}, {"langu": "S", "ausbi": "00006626", "atext": "CIENCIAS POLITICAS Y ESTUDIOS INTERNACIO"}, {"langu": "S", "ausbi": "00006627", "atext": "CINE Y FOTOGRAFIA"}, {"langu": "S", "ausbi": "00006628", "atext": "COMERCIO EXTERIOR"}, {"langu": "S", "ausbi": "00006629", "atext": "COMUNICACION SOCIAL"}, {"langu": "S", "ausbi": "00006630", "atext": "CONSTRUCCION DE EDIFICIOS"}, {"langu": "S", "ausbi": "00006631", "atext": "CONSTRUCCION CIVIL"}, {"langu": "S", "ausbi": "00006632", "atext": "CONTADURIA"}, {"langu": "S", "ausbi": "00006633", "atext": "DERECHO"}, {"langu": "S", "ausbi": "00006634", "atext": "DIBUJO ARQUITECTONICO Y DE INGENIERIA"}, {"langu": "S", "ausbi": "00006635", "atext": "DIBUJO PUBLICITARIO"}, {"langu": "S", "ausbi": "00006636", "atext": "DISENO DE MODAS"}, {"langu": "S", "ausbi": "00006637", "atext": "DISENO GRAFICO"}, {"langu": "S", "ausbi": "00006638", "atext": "DISENO INDUSTRIAL"}, {"langu": "S", "ausbi": "00006639", "atext": "DISENO TEXTIL"}, {"langu": "S", "ausbi": "00006640", "atext": "LICENCIATURA DE LA LINGUISTICA Y LITERAT"}, {"langu": "S", "ausbi": "00006641", "atext": "LICENCIATURA QUIMICA Y BIOLOGIA"}, {"langu": "S", "ausbi": "00006642", "atext": "LICENCIATURA CIENCIAS ECONOMICO SOCIAL"}, {"langu": "S", "ausbi": "00006643", "atext": "LICENCIATURA CIENCIAS SOCIALES"}, {"langu": "S", "ausbi": "00006644", "atext": "LICENCIATURA MATEMATICAS Y FISICAS"}, {"langu": "S", "ausbi": "00006645", "atext": "LICENCIATURA EN IDIOMAS"}, {"langu": "S", "ausbi": "00006646", "atext": "LICENCIATURA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006647", "atext": "ECOLOGIA Y RENDIMIENTO HUMANO"}, {"langu": "S", "ausbi": "00006648", "atext": "ECONOMIA"}, {"langu": "S", "ausbi": "00006649", "atext": "ESTUDANTE EN PRACTICA"}, {"langu": "S", "ausbi": "00006650", "atext": "ECONOMIA AGRARIO"}, {"langu": "S", "ausbi": "00006651", "atext": "ECONOMIA DEL HOGAR"}, {"langu": "S", "ausbi": "00006652", "atext": "ECONOMIA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006653", "atext": "EDUCADOR ESPECIAL"}, {"langu": "S", "ausbi": "00006654", "atext": "EDUCACION FISICA"}, {"langu": "S", "ausbi": "00006655", "atext": "EDUCACION PREESCOLAR"}, {"langu": "S", "ausbi": "00006656", "atext": "EDUCACION PRIMARIA"}, {"langu": "S", "ausbi": "00006657", "atext": "EDUCACION Y CIENCIAS RELIGIOSAS"}, {"langu": "S", "ausbi": "00006658", "atext": "ELECTRIFICACION Y TELEFONIA RURAL"}, {"langu": "S", "ausbi": "00006659", "atext": "ELECTROMEDICINA"}, {"langu": "S", "ausbi": "00006660", "atext": "ENFERMERIA"}, {"langu": "S", "ausbi": "00006661", "atext": "ENSENANZA DE LAS BELLAS ARTES"}, {"langu": "S", "ausbi": "00006662", "atext": "ENSENANZA DE LAS CIENCIAS AGROPECUARIAS"}, {"langu": "S", "ausbi": "00006663", "atext": "ESTADISTICA"}, {"langu": "S", "ausbi": "00006664", "atext": "ESTUDIOS POLICIALES"}, {"langu": "S", "ausbi": "00006665", "atext": "FILOSOFIA Y LETRAS"}, {"langu": "S", "ausbi": "00006666", "atext": "FISICA"}, {"langu": "S", "ausbi": "00006667", "atext": "FISIOTERAPEUTA"}, {"langu": "S", "ausbi": "00006668", "atext": "FLORICULTURA Y DISENO DE JARDINES"}, {"langu": "S", "ausbi": "00006669", "atext": "FONOAUDIOLOGIA"}, {"langu": "S", "ausbi": "00006670", "atext": "GEOLOGIA"}, {"langu": "S", "ausbi": "00006671", "atext": "GERONTOLOGIA"}, {"langu": "S", "ausbi": "00006672", "atext": "HISTORIADOR"}, {"langu": "S", "ausbi": "00006673", "atext": "IDIOMAS"}, {"langu": "S", "ausbi": "00006674", "atext": "INGENIERIA ADMINISTRATIVO"}, {"langu": "S", "ausbi": "00006675", "atext": "INGENIERIA AGRICOLA"}, {"langu": "S", "ausbi": "00006676", "atext": "INGENIERIA AUTOMOTRIZ"}, {"langu": "S", "ausbi": "00006677", "atext": "INGENIERIA CATASTRAL Y GEODESIA"}, {"langu": "S", "ausbi": "00006678", "atext": "INGENIERIA CIVIL"}, {"langu": "S", "ausbi": "00006679", "atext": "INGENIERIA DE ALIMENTOS"}, {"langu": "S", "ausbi": "00006680", "atext": "INGENIERIA DE MINAS Y METALURGIA"}, {"langu": "S", "ausbi": "00006681", "atext": "INGENIERIA DE PETROLEOS"}, {"langu": "S", "ausbi": "00006682", "atext": "INGENIERIA DE PRODUCCION"}, {"langu": "S", "ausbi": "00006683", "atext": "INGENIERIA DE SISTEMAS"}, {"langu": "S", "ausbi": "00006684", "atext": "INGENIERIA DE TRANSPORTE"}, {"langu": "S", "ausbi": "00006685", "atext": "INGENIERIA ELECTRICA"}, {"langu": "S", "ausbi": "00006686", "atext": "INGENIERIA ELECTRONICO"}, {"langu": "S", "ausbi": "00006687", "atext": "INGENIERIA ELECTROMECANICO"}, {"langu": "S", "ausbi": "00006688", "atext": "INGENIERIA FORESTAL"}, {"langu": "S", "ausbi": "00006689", "atext": "INGENIERIA GEOGRAFICO"}, {"langu": "S", "ausbi": "00006690", "atext": "INGENIERIA GEOLOGICO"}, {"langu": "S", "ausbi": "00006691", "atext": "INGENIERIA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006692", "atext": "INGENIERIA MECANICO"}, {"langu": "S", "ausbi": "00006693", "atext": "INGENIERIA NAVAL"}, {"langu": "S", "ausbi": "00006694", "atext": "INGENIERIA PESQUERO"}, {"langu": "S", "ausbi": "00006695", "atext": "INGENIERIA QUIMICO"}, {"langu": "S", "ausbi": "00006696", "atext": "INGENIERIA SANITARIO"}, {"langu": "S", "ausbi": "00006697", "atext": "INGENIERIA TERMICO"}, {"langu": "S", "ausbi": "00006698", "atext": "MATEMATICAS"}, {"langu": "S", "ausbi": "00006699", "atext": "MEDICINA"}, {"langu": "S", "ausbi": "00006700", "atext": "MEDICINA VETERINARIO Y ZOOTECNISTA"}, {"langu": "S", "ausbi": "00006701", "atext": "MERCADOTECNISTA"}, {"langu": "S", "ausbi": "00006702", "atext": "MICROBIOLOGIA"}, {"langu": "S", "ausbi": "00006703", "atext": "MUSICA"}, {"langu": "S", "ausbi": "00006704", "atext": "NUTRICIONISTA Y DIETETICA"}, {"langu": "S", "ausbi": "00006705", "atext": "OCEANOGRAFO FISICO"}, {"langu": "S", "ausbi": "00006706", "atext": "ODONTOLOGIA"}, {"langu": "S", "ausbi": "00006707", "atext": "OPTOMETRIA"}, {"langu": "S", "ausbi": "00006708", "atext": "PEDAGOGIA MUSICAL"}, {"langu": "S", "ausbi": "00006709", "atext": "PERIODISMO"}, {"langu": "S", "ausbi": "00006710", "atext": "PROMOCION SOCIAL"}, {"langu": "S", "ausbi": "00006711", "atext": "PSICOLOGIA"}, {"langu": "S", "ausbi": "00006712", "atext": "PSICOLOGIA EDUCATIVO"}, {"langu": "S", "ausbi": "00006713", "atext": "PUBLICISMO"}, {"langu": "S", "ausbi": "00006714", "atext": "QUIMICO Y FARMACEUTA"}, {"langu": "S", "ausbi": "00006715", "atext": "RECREADOR"}, {"langu": "S", "ausbi": "00006716", "atext": "RELACIONES INDUSTRIALES"}, {"langu": "S", "ausbi": "00006717", "atext": "SECRETARIA"}, {"langu": "S", "ausbi": "00006718", "atext": "SOCIOLOGIA"}, {"langu": "S", "ausbi": "00006719", "atext": "TECNOLOGIA DE PLASTICOS"}, {"langu": "S", "ausbi": "00006720", "atext": "TECNOLOGIA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006721", "atext": "TECNOLOGIA DEPORTIVO"}, {"langu": "S", "ausbi": "00006722", "atext": "TECNOLOGIA EDUCATIVO"}, {"langu": "S", "ausbi": "00006723", "atext": "TEOLOGIA"}, {"langu": "S", "ausbi": "00006724", "atext": "TERAPEUTA OCUPACIONAL"}, {"langu": "S", "ausbi": "00006725", "atext": "TERAPIA RESPIRATORIA"}, {"langu": "S", "ausbi": "00006726", "atext": "TOPOGRAFIA"}, {"langu": "S", "ausbi": "00006727", "atext": "TRABAJODOR SOCIAL"}, {"langu": "S", "ausbi": "00006728", "atext": "TRADUCTOR TURISTICO"}, {"langu": "S", "ausbi": "00006729", "atext": "TECNICO MANTENIMIENTO MOTORES DIESEL"}, {"langu": "S", "ausbi": "00006730", "atext": "TECNICO MAQUINAS Y HERRAMIENTAS"}, {"langu": "S", "ausbi": "00006731", "atext": "TECNICO MANTENIMIENTO"}, {"langu": "S", "ausbi": "00006732", "atext": "TÉCNICO ELECTRICIDAD DE MANTENIMIENTO IN"}, {"langu": "S", "ausbi": "00006733", "atext": "TÉCNICO CONTABILIDAD Y FINANZAS"}, {"langu": "S", "ausbi": "00006734", "atext": "TÉCNICO DIRECCION DE VENTAS"}, {"langu": "S", "ausbi": "00006735", "atext": "TÉCNICO GESTION CONTABLE Y FINANCIERA"}, {"langu": "S", "ausbi": "00006736", "atext": "TECNICO INST.INDUSTRIAL"}, {"langu": "S", "ausbi": "00006737", "atext": "TÉCNICO MANT.MECÁNICO INDUSTRIAL"}, {"langu": "S", "ausbi": "00006738", "atext": "TÉC. SIS. CON ÉNFASIS EN MANT. DE COMPUT"}, {"langu": "S", "ausbi": "00006739", "atext": "TECNOLOGÍA CONT. SISTEMATIZADA"}, {"langu": "S", "ausbi": "00006740", "atext": "TECNOLOGÍA GESTION EMPRESARIAL"}, {"langu": "S", "ausbi": "00006741", "atext": "TECNOLOGÍA MANT. ELECTROMECÁNICO"}, {"langu": "S", "ausbi": "00006742", "atext": "TECNOLOGÍA MERCADEO"}, {"langu": "S", "ausbi": "00006743", "atext": "TECNOLOGO ADMINISTRACION DE EMPRESAS"}, {"langu": "S", "ausbi": "00006744", "atext": "TEC. ADMIN. DE REDES DE COMPUTADORES"}, {"langu": "S", "ausbi": "00006745", "atext": "TECNOLOGO AUTOMATIZACION INDUSTRIAL"}, {"langu": "S", "ausbi": "00006746", "atext": "TECNOLOGO ELECTRONICA"}, {"langu": "S", "ausbi": "00006747", "atext": "TECNOLOGO GESTION DEL MANTENIMIENTO"}, {"langu": "S", "ausbi": "00006748", "atext": "TECNOLOGO INSTRUMENTACION INDUSTRIAL"}, {"langu": "S", "ausbi": "00006749", "atext": "TEC. INSTRUMENTACION Y CONT. DE PROC. IN"}, {"langu": "S", "ausbi": "00006750", "atext": "TECNOLOGO MANT. ELECTROMECÁNICO"}, {"langu": "S", "ausbi": "00006751", "atext": "TEC. MANT. ELECTRONICA E INSTRUMENTAL"}, {"langu": "S", "ausbi": "00006752", "atext": "TEC. MANT.ELECTROMECÁNICO INDUSTRIAL"}, {"langu": "S", "ausbi": "00006753", "atext": "TEC. MEC. DE REFRI. Y AIRE ACONDICIONADO"}, {"langu": "S", "ausbi": "00006754", "atext": "TECNOLOGO MECATRONICA"}, {"langu": "S", "ausbi": "00006755", "atext": "TECNOLOGO SALUD OCUPACIONAL"}, {"langu": "S", "ausbi": "00006756", "atext": "TECNOLOGO SISTEMAS"}, {"langu": "S", "ausbi": "00006757", "atext": "TECNOOGO ADMINISTRACION DE EMPRESAS"}];
		$scope.titulos = [{"sprsl": "S", "slabs": "00", "stext": "Sin Título"}, {"sprsl": "S", "slabs": "01", "stext": "Con Título"}, {"sprsl": "S", "slabs": "02", "stext": "Ingeniero"}, {"sprsl": "S", "slabs": "03", "stext": "Tecnólogo"}, {"sprsl": "S", "slabs": "04", "stext": "Técnico"}, {"sprsl": "S", "slabs": "05", "stext": "Administrador"}, {"sprsl": "S", "slabs": "11", "stext": "Con Titulacion"}];
		$scope.especialidad = [{"langu": "S", "faart": "00010", "ftext": "Classical languages"}, {"langu": "S", "faart": "00011", "ftext": "Modern languages"}, {"langu": "S", "faart": "00012", "ftext": "Math/natural sciences"}, {"langu": "S", "faart": "00013", "ftext": "Liberal arts"}, {"langu": "S", "faart": "00020", "ftext": "Business"}, {"langu": "S", "faart": "00022", "ftext": "Technical"}, {"langu": "S", "faart": "00023", "ftext": "Electrical engineering"}, {"langu": "S", "faart": "00024", "ftext": "Communications engineer."}, {"langu": "S", "faart": "00025", "ftext": "Mechanical engineering"}, {"langu": "S", "faart": "00026", "ftext": "Precision mechanics"}, {"langu": "S", "faart": "00027", "ftext": "Civil engineering"}, {"langu": "S", "faart": "00030", "ftext": "Psychology"}, {"langu": "S", "faart": "00031", "ftext": "Paedagogy"}, {"langu": "S", "faart": "00032", "ftext": "Business paedogogy"}, {"langu": "S", "faart": "00033", "ftext": "Busin.careers for women"}, {"langu": "S", "faart": "00048", "ftext": "Busin.computer sciences"}, {"langu": "S", "faart": "00050", "ftext": "Business administration"}, {"langu": "S", "faart": "00051", "ftext": "Law"}, {"langu": "S", "faart": "00052", "ftext": "Medicine"}, {"langu": "S", "faart": "00053", "ftext": "Biology"}, {"langu": "S", "faart": "00054", "ftext": "Chemical industry"}, {"langu": "S", "faart": "00055", "ftext": "Physics"}, {"langu": "S", "faart": "00056", "ftext": "Other natural sciences"}, {"langu": "S", "faart": "00057", "ftext": "Mathematics"}, {"langu": "S", "faart": "00058", "ftext": "Computer sciences"}, {"langu": "S", "faart": "00059", "ftext": "Tech.computer sciences"}, {"langu": "S", "faart": "00060", "ftext": "German"}, {"langu": "S", "faart": "00061", "ftext": "English"}, {"langu": "S", "faart": "00062", "ftext": "French"}, {"langu": "S", "faart": "00063", "ftext": "Russian"}, {"langu": "S", "faart": "00065", "ftext": "Mercadeo"}, {"langu": "S", "faart": "00066", "ftext": "Administración de Empresas"}, {"langu": "S", "faart": "00067", "ftext": "Economía"}, {"langu": "S", "faart": "00070", "ftext": "DP"}, {"langu": "S", "faart": "00071", "ftext": "REFA"}, {"langu": "S", "faart": "00072", "ftext": "Human Resources"}, {"langu": "S", "faart": "00073", "ftext": "Accounting"}];
		$scope.institutos = [{"sprsl": "S", "slart": "01", "stext": "E. G.Basica"}, {"sprsl": "S", "slart": "02", "stext": "Hauptschule"}, {"sprsl": "S", "slart": "10", "stext": "Formacion prof."}, {"sprsl": "S", "slart": "11", "stext": "Bachillerato"}, {"sprsl": "S", "slart": "20", "stext": "Handelsschule"}, {"sprsl": "S", "slart": "21", "stext": "Instituo superior"}, {"sprsl": "S", "slart": "22", "stext": "G/T. Berufsschule"}, {"sprsl": "S", "slart": "23", "stext": "Kfm. Berufsschule"}, {"sprsl": "S", "slart": "25", "stext": "Handelsakademie"}, {"sprsl": "S", "slart": "26", "stext": "HoeTechnLehranstalt"}, {"sprsl": "S", "slart": "27", "stext": "HoeBundesLehranstalt"}, {"sprsl": "S", "slart": "50", "stext": "Universidad"}, {"sprsl": "S", "slart": "51", "stext": "Universidad"}, {"sprsl": "S", "slart": "52", "stext": "Escuela t. superior"}, {"sprsl": "S", "slart": "60", "stext": "Escuela de idiomas"}, {"sprsl": "S", "slart": "70", "stext": "cursos/sem. internos"}, {"sprsl": "S", "slart": "71", "stext": "cursos/sem. externos"}, {"sprsl": "S", "slart": "E1", "stext": "E.Gral.Basica EGB AR"}, {"sprsl": "S", "slart": "E2", "stext": "E.Polimodal AR"}, {"sprsl": "S", "slart": "E3", "stext": "E.Primaria AR"}, {"sprsl": "S", "slart": "E4", "stext": "E.Secundaria AR"}, {"sprsl": "S", "slart": "E5", "stext": "E.Terciaria AR"}, {"sprsl": "S", "slart": "E6", "stext": "E.Especial AR"}, {"sprsl": "S", "slart": "E7", "stext": "E.Preescolar AR"}, {"sprsl": "S", "slart": "Z1", "stext": "Bachiller"}, {"sprsl": "S", "slart": "Z2", "stext": "Profesional"}, {"sprsl": "S", "slart": "Z3", "stext": "Especialización"}, {"sprsl": "S", "slart": "Z4", "stext": "Maestría"}, {"sprsl": "S", "slart": "Z5", "stext": "Doctorado"}];
		
		$scope.search_country = function(data){
			// Cual es el pais??
			angular.forEach($scope.paises, function(value, key) {
				// console.log(value.land1,key);
				if (value.land1 == data){
					$scope.country = $scope.paises[key].land1;
					// console.log($scope.country,key)
				}
			})
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
					console.log($scope.est_civil);
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
			console.log("cambia",$scope.comparador);
		};
		
		$scope.cambiar_estados = function (estado){
			angular.forEach($scope.estados, function(value, key) {
				// console.log(value.land1,key);
				if (value.bland == estado){
					$scope.comparador = $scope.estados[key].bezei;
					// console.log($scope.comparador,key);
				}
			})
			console.log("cambiar_estados",$scope.comparador);
		};
		
		$scope.cambiar_genero = function (genero){
			angular.forEach($scope.gender_obj, function(value, key) {
				// console.log(value.land1,key);
				if (value.label == genero){
					$scope.comparador = $scope.gender_obj[key].value;
					// console.log($scope.comparador,key);
				}
			})
			console.log("cambiar_genero",$scope.comparador);
		};
		
		$scope.cambiar_est_civil = function (genero){
			angular.forEach($scope.estado_obj, function(value, key) {
				// console.log(value.land1,key);
				if (value.label == genero){
					$scope.comparador = $scope.estado_obj[key].value;
					// console.log($scope.comparador,key);
				}
			})
			console.log("cambiar_est_civil",$scope.comparador);
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
	
		$scope.cambiarInfo = function(subty, ncamp, dcamp, ccamp, objid, comparador){
			// var req = {
			//  method: 'POST',
			//  // url: 'http://190.242.124.184:8000/sap/bc/zpruebarest?OPERATION=UPDDM',
			//  url: 'http://127.0.0.1:3000/api/infos',
			//  headers: {
			//    'Content-Type': undefined,
			//    'Access-Control-Allow-Origin': "*",
			//    'X-CSRF-Token': '139120831238129038129038qsjdsajkfdhsk'
			//  },
			//  data: { pernr: $scope.user.employee_id, subty: subty, ncamp: ncamp, ccamp: ccamp, objid: objid, boss: $scope.user.employee.boss},
			// }
			// console.log(req);
			// $http(req).
			// success(function(data, status, headers, config) {
			// 	// this callback will be called asynchronously
			// 	// when the response is available
			// 	console.log("success, data:",data, status, headers, config);
			// }).
			// error(function(data, status, headers, config) {
			// 	// called asynchronously if an error occurs
			// 	// or server returns response with an error status.
			// 	console.log("error, data:",data, status, headers, config);
			// });
			
			$scope.info = new Info();
			
			
			$scope.info.subty = subty;
			$scope.info.ncamp = ncamp;
			$scope.info.ccamp = ccamp;
			$scope.info.dcamp = dcamp;
			$scope.info.objid = objid;
			$scope.info.pernr = $scope.user.employee_id;
			$scope.info.employee_id = $scope.user.employee.id;
			$scope.info.boss = $scope.user.employee.data_reviewer;
			$scope.info.approved = false;
			$scope.info.comparador = $scope.comparador;
			
			// console.log($scope.info);
			$scope.info.$save(function() {
			   $state.go('main.views.employee_info'); // on success go back to datos_maestros
			   $scope.alerts.push({type: 'success', msg: "La solicitud para cambiar el campo '"+ $scope.info.dcamp +"' a '"+ $scope.comparador + "' a sido enviada para aprobacion"});
			   $scope.missolicitudes.push($scope.info);
			   // reset comparador
			   $scope.comparador = "";
			});
			
		}
		
		$scope.deleteSolicitud = function(solicitud,modal) { 
			// console.log(solicitud);
			solicitud.$delete(function() {
				var index = $scope.missolicitudes.indexOf(solicitud);
				// console.log(index);
				$scope.missolicitudes.splice(index, 1);
				$('#elmodal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "La solicitud a sido borrada"});
			});
		} ///BORRAR
		
		
	})
	
	.controller('Employee_info.LookupController', function ($scope, info, $rootScope, employee, $http) {
		
		$rootScope.employee = employee;
		$rootScope.employee_info = info;
		
		$scope.estados = [{"spras": "S", "land1": "CO", "bland": "05", "bezei": "ANTIOQUIA"}, {"spras": "S", "land1": "CO", "bland": "08", "bezei": "ATLANTICO"}, {"spras": "S", "land1": "CO", "bland": "11", "bezei": "BOGOTA"}, {"spras": "S", "land1": "CO", "bland": "13", "bezei": "BOLIVAR"}, {"spras": "S", "land1": "CO", "bland": "15", "bezei": "BOYACA"}, {"spras": "S", "land1": "CO", "bland": "17", "bezei": "CALDAS"}, {"spras": "S", "land1": "CO", "bland": "18", "bezei": "CAQUETA"}, {"spras": "S", "land1": "CO", "bland": "19", "bezei": "CAUCA"}, {"spras": "S", "land1": "CO", "bland": "20", "bezei": "CESAR"}, {"spras": "S", "land1": "CO", "bland": "23", "bezei": "CORDOBA"}, {"spras": "S", "land1": "CO", "bland": "25", "bezei": "CUNDINAMARCA"}, {"spras": "S", "land1": "CO", "bland": "27", "bezei": "CHOCO"}, {"spras": "S", "land1": "CO", "bland": "41", "bezei": "HUILA"}, {"spras": "S", "land1": "CO", "bland": "44", "bezei": "LA GUAJIRA"}, {"spras": "S", "land1": "CO", "bland": "47", "bezei": "MAGDALENA"}, {"spras": "S", "land1": "CO", "bland": "50", "bezei": "META"}, {"spras": "S", "land1": "CO", "bland": "52", "bezei": "NARINO"}, {"spras": "S", "land1": "CO", "bland": "54", "bezei": "NORTE SANTANDER"}, {"spras": "S", "land1": "CO", "bland": "63", "bezei": "QUINDIO"}, {"spras": "S", "land1": "CO", "bland": "66", "bezei": "RISARALDA"}, {"spras": "S", "land1": "CO", "bland": "68", "bezei": "SANTANDER"}, {"spras": "S", "land1": "CO", "bland": "70", "bezei": "SUCRE"}, {"spras": "S", "land1": "CO", "bland": "73", "bezei": "TOLIMA"}, {"spras": "S", "land1": "CO", "bland": "76", "bezei": "VALLE"}, {"spras": "S", "land1": "CO", "bland": "81", "bezei": "ARAUCA"}, {"spras": "S", "land1": "CO", "bland": "85", "bezei": "CASANARE"}, {"spras": "S", "land1": "CO", "bland": "86", "bezei": "PUTUMAYO"}, {"spras": "S", "land1": "CO", "bland": "88", "bezei": "SAN ANDRES"}, {"spras": "S", "land1": "CO", "bland": "91", "bezei": "AMAZONAS"}, {"spras": "S", "land1": "CO", "bland": "94", "bezei": "GUAINIA"}, {"spras": "S", "land1": "CO", "bland": "95", "bezei": "GUAVIARE"}, {"spras": "S", "land1": "CO", "bland": "97", "bezei": "VAUPES"}, {"spras": "S", "land1": "CO", "bland": "99", "bezei": "VICHADA"}];
		$scope.paises = [{"spras": "S", "land1": "AD", "landx": "Andorran", "natio": "Andorran"}, {"spras": "S", "land1": "AE", "landx": "Utd.Arab Emir.", "natio": "Unit.Arab Emir."}, {"spras": "S", "land1": "AF", "landx": "Afghanistan", "natio": "Afghan"}, {"spras": "S", "land1": "AG", "landx": "Antigua/Barbuda", "natio": "Antiguan"}, {"spras": "S", "land1": "AI", "landx": "Anguilla", "natio": "Anguilla"}, {"spras": "S", "land1": "AL", "landx": "Albania", "natio": "Albanian"}, {"spras": "S", "land1": "AM", "landx": "Armenia", "natio": "Armenian"}, {"spras": "S", "land1": "AO", "landx": "Angola", "natio": "Angolan"}, {"spras": "S", "land1": "AQ", "landx": "Antarctica", "natio": "Antarctica"}, {"spras": "S", "land1": "AR", "landx": "Argentina", "natio": "Argentina"}, {"spras": "S", "land1": "AS", "landx": "Samoa, America", "natio": "Samoan"}, {"spras": "S", "land1": "AT", "landx": "Austria", "natio": "austríaca"}, {"spras": "S", "land1": "AW", "landx": "Aruba", "natio": "Arubanic"}, {"spras": "S", "land1": "AZ", "landx": "Azerbaijan", "natio": "Azerbaijani"}, {"spras": "S", "land1": "BA", "landx": "Bosnia-Herz.", "natio": "Bosnian"}, {"spras": "S", "land1": "BB", "landx": "Barbados", "natio": "Barbadan"}, {"spras": "S", "land1": "BD", "landx": "Bangladesh", "natio": "Bangladeshi"}, {"spras": "S", "land1": "BF", "landx": "Burkina Faso", "natio": "Burkinabe"}, {"spras": "S", "land1": "BG", "landx": "Bulgaria", "natio": "Bulgarian"}, {"spras": "S", "land1": "BH", "landx": "Bahrain", "natio": "Bahraini"}, {"spras": "S", "land1": "BI", "landx": "Burundi", "natio": "Burundi"}, {"spras": "S", "land1": "BJ", "landx": "Benin", "natio": "Beninese"}, {"spras": "S", "land1": "BL", "landx": "Blue", "natio": ""}, {"spras": "S", "land1": "BM", "landx": "Bermuda", "natio": "Bermudan"}, {"spras": "S", "land1": "BN", "landx": "Brunei Daruss.", "natio": "Brunei"}, {"spras": "S", "land1": "BQ", "landx": "Bonaire, Saba", "natio": "Dutch"}, {"spras": "S", "land1": "BR", "landx": "Brazil", "natio": "Brazilian"}, {"spras": "S", "land1": "BS", "landx": "Bahamas", "natio": "Bahaman"}, {"spras": "S", "land1": "BT", "landx": "Bhutan", "natio": "Bhutanese"}, {"spras": "S", "land1": "BV", "landx": "Bouvet Islands", "natio": "Bouvet Islands"}, {"spras": "S", "land1": "BW", "landx": "Botswana", "natio": "Botswanan"}, {"spras": "S", "land1": "BY", "landx": "Belarus", "natio": "Belarusian"}, {"spras": "S", "land1": "BZ", "landx": "Belize", "natio": "Belizean"}, {"spras": "S", "land1": "CC", "landx": "Coconut Islands", "natio": "Australian"}, {"spras": "S", "land1": "CD", "landx": "Dem. Rep. Congo", "natio": "Congolese"}, {"spras": "S", "land1": "CF", "landx": "CAR", "natio": "Central African"}, {"spras": "S", "land1": "CG", "landx": "Rep.of Congo", "natio": "Congolese"}, {"spras": "S", "land1": "CK", "landx": "Cook Islands", "natio": "Cook Islands"}, {"spras": "S", "land1": "CM", "landx": "Cameroon", "natio": "Cameroonian"}, {"spras": "S", "land1": "CN", "landx": "China", "natio": "Chinese"}, {"spras": "S", "land1": "CO", "landx": "Colombia", "natio": "Colombiano"}, {"spras": "S", "land1": "CR", "landx": "Costa Rica", "natio": "Costa Rican"}, {"spras": "S", "land1": "CS", "landx": "Serbia/Monten.", "natio": "Serbian/Monten."}, {"spras": "S", "land1": "CV", "landx": "Cape Verde", "natio": "Cape Verdean"}, {"spras": "S", "land1": "CW", "landx": "Curaçao", "natio": "Curaçaoan"}, {"spras": "S", "land1": "CX", "landx": "Christmas Islnd", "natio": "Australian"}, {"spras": "S", "land1": "CY", "landx": "Cyprus", "natio": "Cypriot"}, {"spras": "S", "land1": "CZ", "landx": "Czech Republic", "natio": "Czech"}, {"spras": "S", "land1": "DE", "landx": "Alemania", "natio": "Aleman"}, {"spras": "S", "land1": "DJ", "landx": "Djibouti", "natio": "Djiboutian"}, {"spras": "S", "land1": "DZ", "landx": "Algeria", "natio": "Algerian"}, {"spras": "S", "land1": "EE", "landx": "Estonia", "natio": "Estonian"}, {"spras": "S", "land1": "EG", "landx": "Egypt", "natio": "Egyptian"}, {"spras": "S", "land1": "EH", "landx": "West Sahara", "natio": "French"}, {"spras": "S", "land1": "ER", "landx": "Eritrea", "natio": "Eritrean"}, {"spras": "S", "land1": "ET", "landx": "Ethiopia", "natio": "Ethiopian"}, {"spras": "S", "land1": "EU", "landx": "European Union", "natio": ""}, {"spras": "S", "land1": "FI", "landx": "Finlandia", "natio": "finlandesa"}, {"spras": "S", "land1": "FJ", "landx": "Fiji", "natio": "Fijian"}, {"spras": "S", "land1": "FK", "landx": "Falkland Islnds", "natio": "British"}, {"spras": "S", "land1": "FM", "landx": "Micronesia", "natio": "Micronesian"}, {"spras": "S", "land1": "FO", "landx": "Faroe Islands", "natio": "Danish"}, {"spras": "S", "land1": "GA", "landx": "Gabon", "natio": "Gabonese"}, {"spras": "S", "land1": "GB", "landx": "United Kingdom", "natio": "British"}, {"spras": "S", "land1": "GD", "landx": "Grenada", "natio": "Grenadian"}, {"spras": "S", "land1": "GE", "landx": "Georgia", "natio": "Georgian"}, {"spras": "S", "land1": "GF", "landx": "French Guayana", "natio": "French"}, {"spras": "S", "land1": "GG", "landx": "Guernsey", "natio": "British"}, {"spras": "S", "land1": "GH", "landx": "Ghana", "natio": "Ghanian"}, {"spras": "S", "land1": "GI", "landx": "Gibraltar", "natio": "Gibraltar"}, {"spras": "S", "land1": "GL", "landx": "Greenland", "natio": "Danish"}, {"spras": "S", "land1": "GM", "landx": "Gambia", "natio": "Gambian"}, {"spras": "S", "land1": "GN", "landx": "Guinea", "natio": "Guinean"}, {"spras": "S", "land1": "GP", "landx": "Guadeloupe", "natio": "French"}, {"spras": "S", "land1": "GQ", "landx": "Equatorial Guin", "natio": "Equatorial Guin"}, {"spras": "S", "land1": "GS", "landx": "S. Sandwich Ins", "natio": "South Georgia"}, {"spras": "S", "land1": "GU", "landx": "Guam", "natio": "American"}, {"spras": "S", "land1": "GW", "landx": "Guinea-Bissau", "natio": "Guinean"}, {"spras": "S", "land1": "GY", "landx": "Guyana", "natio": "Guyanese"}, {"spras": "S", "land1": "HK", "landx": "Hong Kong", "natio": "Hong Kong"}, {"spras": "S", "land1": "HM", "landx": "Heard/McDon.Isl", "natio": "Heard/McDon.Isl"}, {"spras": "S", "land1": "HN", "landx": "Honduras", "natio": "Honduran"}, {"spras": "S", "land1": "HR", "landx": "Croatia", "natio": "Croatian"}, {"spras": "S", "land1": "HU", "landx": "Hungary", "natio": "Hungarian"}, {"spras": "S", "land1": "ID", "landx": "Indonesia", "natio": "Indonesian"}, {"spras": "S", "land1": "IE", "landx": "Ireland", "natio": "Irish"}, {"spras": "S", "land1": "IM", "landx": "Isle of Man", "natio": "British"}, {"spras": "S", "land1": "IN", "landx": "India", "natio": "Indian"}, {"spras": "S", "land1": "IO", "landx": "Brit.Ind.Oc.Ter", "natio": "Brit.Ind.Oc.Ter"}, {"spras": "S", "land1": "IQ", "landx": "Iraq", "natio": "Iraqi"}, {"spras": "S", "land1": "IR", "landx": "Iran", "natio": "Iranian"}, {"spras": "S", "land1": "IS", "landx": "Iceland", "natio": "Icelandic"}, {"spras": "S", "land1": "JE", "landx": "Jersey", "natio": "British"}, {"spras": "S", "land1": "JM", "landx": "Jamaica", "natio": "Jamaican"}, {"spras": "S", "land1": "JO", "landx": "Jordan", "natio": "Jordanian"}, {"spras": "S", "land1": "KE", "landx": "Kenya", "natio": "Kenyan"}, {"spras": "S", "land1": "KG", "landx": "Kyrgyzstan", "natio": "Kyrgyzstani"}, {"spras": "S", "land1": "KH", "landx": "Cambodia", "natio": "Cambodian"}, {"spras": "S", "land1": "KI", "landx": "Kiribati", "natio": "Kiribati"}, {"spras": "S", "land1": "KM", "landx": "Comoros", "natio": "Comoran"}, {"spras": "S", "land1": "KP", "landx": "North Korea", "natio": "Korean"}, {"spras": "S", "land1": "KW", "landx": "Kuwait", "natio": "Kuwaiti"}, {"spras": "S", "land1": "KY", "landx": "Cayman Islands", "natio": "British"}, {"spras": "S", "land1": "KZ", "landx": "Kazakhstan", "natio": "Kazakh"}, {"spras": "S", "land1": "LA", "landx": "Laos", "natio": "Laotian"}, {"spras": "S", "land1": "LC", "landx": "St. Lucia", "natio": "Lucian"}, {"spras": "S", "land1": "LI", "landx": "Liechtenstein", "natio": "Liechtenstein"}, {"spras": "S", "land1": "LK", "landx": "Sri Lanka", "natio": "Sri Lankan"}, {"spras": "S", "land1": "LR", "landx": "Liberia", "natio": "Liberian"}, {"spras": "S", "land1": "LS", "landx": "Lesotho", "natio": "Lesothan"}, {"spras": "S", "land1": "LT", "landx": "Lithuania", "natio": "Lithuanian"}, {"spras": "S", "land1": "LU", "landx": "Luxembourg", "natio": "Luxembourgian"}, {"spras": "S", "land1": "LV", "landx": "Latvia", "natio": "Latvian"}, {"spras": "S", "land1": "LY", "landx": "Libya", "natio": "Libyan"}, {"spras": "S", "land1": "MA", "landx": "Morocco", "natio": "Moroccan"}, {"spras": "S", "land1": "MC", "landx": "Monaco", "natio": "Monegasque"}, {"spras": "S", "land1": "MD", "landx": "Moldova", "natio": "Moldovan"}, {"spras": "S", "land1": "MG", "landx": "Madagascar", "natio": "Madagascan"}, {"spras": "S", "land1": "MH", "landx": "Marshall Islnds", "natio": "Marshallese"}, {"spras": "S", "land1": "MK", "landx": "Macedonia", "natio": "Macedonian"}, {"spras": "S", "land1": "ML", "landx": "Mali", "natio": "Malian"}, {"spras": "S", "land1": "MM", "landx": "Burma", "natio": "Burmese"}, {"spras": "S", "land1": "MN", "landx": "Mongolia", "natio": "Mongolian"}, {"spras": "S", "land1": "MO", "landx": "Macau", "natio": "Portuguese"}, {"spras": "S", "land1": "MP", "landx": "N.Mariana Islnd", "natio": "Marianian"}, {"spras": "S", "land1": "MQ", "landx": "Martinique", "natio": "French"}, {"spras": "S", "land1": "MR", "landx": "Mauretania", "natio": "Mauretanian"}, {"spras": "S", "land1": "MS", "landx": "Montserrat", "natio": "Montserrat"}, {"spras": "S", "land1": "MT", "landx": "Malta", "natio": "Maltese"}, {"spras": "S", "land1": "MU", "landx": "Mauritius", "natio": "Mauritian"}, {"spras": "S", "land1": "MV", "landx": "Maldives", "natio": "Maldivian"}, {"spras": "S", "land1": "MW", "landx": "Malawi", "natio": "Malawian"}, {"spras": "S", "land1": "MY", "landx": "Malaysia", "natio": "Malaysian"}, {"spras": "S", "land1": "MZ", "landx": "Mozambique", "natio": "Mozambican"}, {"spras": "S", "land1": "NA", "landx": "Namibia", "natio": "Namibian"}, {"spras": "S", "land1": "NC", "landx": "New Caledonia", "natio": "French"}, {"spras": "S", "land1": "NE", "landx": "Niger", "natio": "Nigerien"}, {"spras": "S", "land1": "NF", "landx": "Norfolk Islands", "natio": "Norfolk Islands"}, {"spras": "S", "land1": "NG", "landx": "Nigeria", "natio": "Nigerian"}, {"spras": "S", "land1": "NL", "landx": "Netherlands", "natio": "Dutch"}, {"spras": "S", "land1": "NP", "landx": "Nepal", "natio": "Nepalese"}, {"spras": "S", "land1": "NR", "landx": "Nauru", "natio": "Nauruian"}, {"spras": "S", "land1": "NT", "landx": "NATO", "natio": ""}, {"spras": "S", "land1": "NU", "landx": "Niue", "natio": "Niuean"}, {"spras": "S", "land1": "NZ", "landx": "New Zealand", "natio": "New Zealand"}, {"spras": "S", "land1": "OM", "landx": "Oman", "natio": "Omani"}, {"spras": "S", "land1": "OR", "landx": "Orange", "natio": ""}, {"spras": "S", "land1": "PF", "landx": "Frenc.Polynesia", "natio": "French"}, {"spras": "S", "land1": "PG", "landx": "Pap. New Guinea", "natio": "Pap.New Guinean"}, {"spras": "S", "land1": "PH", "landx": "Philippines", "natio": "Filipino"}, {"spras": "S", "land1": "PK", "landx": "Pakistan", "natio": "Pakistani"}, {"spras": "S", "land1": "PL", "landx": "Poland", "natio": "Polish"}, {"spras": "S", "land1": "PM", "landx": "St.Pier,Miquel.", "natio": "French"}, {"spras": "S", "land1": "PN", "landx": "Pitcairn Islnds", "natio": "British"}, {"spras": "S", "land1": "PR", "landx": "Puerto Rico", "natio": "American"}, {"spras": "S", "land1": "PS", "landx": "Palestine", "natio": "Palestinian"}, {"spras": "S", "land1": "PW", "landx": "Palau", "natio": "Palauan"}, {"spras": "S", "land1": "QA", "landx": "Qatar", "natio": "Qatari"}, {"spras": "S", "land1": "RE", "landx": "Reunion", "natio": "French"}, {"spras": "S", "land1": "RU", "landx": "Russian Fed.", "natio": "Russian"}, {"spras": "S", "land1": "RW", "landx": "Rwanda", "natio": "Rwandan"}, {"spras": "S", "land1": "SA", "landx": "Saudi Arabia", "natio": "Saudi Arabian"}, {"spras": "S", "land1": "SB", "landx": "Solomon Islands", "natio": "Solomonese"}, {"spras": "S", "land1": "SC", "landx": "Seychelles", "natio": "Seychellian"}, {"spras": "S", "land1": "SD", "landx": "Sudan", "natio": "Sudanese"}, {"spras": "S", "land1": "SE", "landx": "Suecia", "natio": "sueca"}, {"spras": "S", "land1": "SG", "landx": "Singapore", "natio": "Singaporean"}, {"spras": "S", "land1": "SH", "landx": "Saint Helena", "natio": "Saint Helena"}, {"spras": "S", "land1": "SI", "landx": "Slovenia", "natio": "Slovenian"}, {"spras": "S", "land1": "SJ", "landx": "Svalbard", "natio": "Norwegian"}, {"spras": "S", "land1": "SK", "landx": "Slovakia", "natio": "Slovakian"}, {"spras": "S", "land1": "SL", "landx": "Sierra Leone", "natio": "Sierra Leonean"}, {"spras": "S", "land1": "SM", "landx": "San Marino", "natio": "Sammarinese"}, {"spras": "S", "land1": "SN", "landx": "Senegal", "natio": "Senegalese"}, {"spras": "S", "land1": "SO", "landx": "Somalia", "natio": "Somali"}, {"spras": "S", "land1": "SR", "landx": "Suriname", "natio": "Surinamese"}, {"spras": "S", "land1": "SS", "landx": "South Sudan", "natio": "South Sudanese"}, {"spras": "S", "land1": "ST", "landx": "S.Tome,Principe", "natio": "Sao Tomean"}, {"spras": "S", "land1": "SV", "landx": "El Salvador", "natio": "Salvadoran"}, {"spras": "S", "land1": "SX", "landx": "Sint Maarten", "natio": "Sint Maarten"}, {"spras": "S", "land1": "SZ", "landx": "Swaziland", "natio": "Swazi"}, {"spras": "S", "land1": "TC", "landx": "Turksh Caicosin", "natio": "Turksh Caicosin"}, {"spras": "S", "land1": "TD", "landx": "Chad", "natio": "Chadian"}, {"spras": "S", "land1": "TF", "landx": "French S.Territ", "natio": "French"}, {"spras": "S", "land1": "TG", "landx": "Togo", "natio": "Togolese"}, {"spras": "S", "land1": "TH", "landx": "Thailand", "natio": "Thai"}, {"spras": "S", "land1": "TJ", "landx": "Tajikistan", "natio": "Tajikistani"}, {"spras": "S", "land1": "TK", "landx": "Tokelau Islands", "natio": "Tokelau Islands"}, {"spras": "S", "land1": "TL", "landx": "East Timor", "natio": ""}, {"spras": "S", "land1": "TM", "landx": "Turkmenistan", "natio": "Turkmenian"}, {"spras": "S", "land1": "TN", "landx": "Tunisia", "natio": "Tunisian"}, {"spras": "S", "land1": "TO", "landx": "Tonga", "natio": "Tongan"}, {"spras": "S", "land1": "TP", "landx": "East Timor", "natio": "East Timor"}, {"spras": "S", "land1": "TR", "landx": "Turkey", "natio": "Turkish"}, {"spras": "S", "land1": "TV", "landx": "Tuvalu", "natio": "Tuvaluese"}, {"spras": "S", "land1": "TW", "landx": "Taiwan", "natio": "Chinese"}, {"spras": "S", "land1": "TZ", "landx": "Tanzania", "natio": "Tanzanian"}, {"spras": "S", "land1": "UA", "landx": "Ukraine", "natio": "Ukrainian"}, {"spras": "S", "land1": "UG", "landx": "Uganda", "natio": "Ugandan"}, {"spras": "S", "land1": "UM", "landx": "Minor Outl.Isl.", "natio": "Minor Outl.Isl."}, {"spras": "S", "land1": "UN", "landx": "United Nations", "natio": ""}, {"spras": "S", "land1": "UZ", "landx": "Uzbekistan", "natio": "Uzbekistani"}, {"spras": "S", "land1": "VA", "landx": "Vatican City", "natio": "Vatican City"}, {"spras": "S", "land1": "VC", "landx": "St. Vincent", "natio": "Vincentian"}, {"spras": "S", "land1": "VE", "landx": "Venezuela", "natio": "Venezolano"}, {"spras": "S", "land1": "VG", "landx": "Brit.Virgin Is.", "natio": "British"}, {"spras": "S", "land1": "VI", "landx": "Amer.Virgin Is.", "natio": "American"}, {"spras": "S", "land1": "VN", "landx": "Vietnam", "natio": "Vietnamese"}, {"spras": "S", "land1": "VU", "landx": "Vanuatu", "natio": "Ni-Vanuatu"}, {"spras": "S", "land1": "WF", "landx": "Wallis,Futuna", "natio": "Wallis,Futuna"}, {"spras": "S", "land1": "WS", "landx": "Samoa", "natio": "Samoan"}, {"spras": "S", "land1": "YE", "landx": "Yemen", "natio": "Yemeni"}, {"spras": "S", "land1": "YT", "landx": "Mayotte", "natio": "French"}, {"spras": "S", "land1": "ZA", "landx": "South Africa", "natio": "South African"}, {"spras": "S", "land1": "ZM", "landx": "Zambia", "natio": "Zambian"}, {"spras": "S", "land1": "ZW", "landx": "Zimbabwe", "natio": "Zimbabwean"}];
		$scope.genero = ["nill", "Masculino", "Femenino"];
		$scope.estado_civil = ["Sol.","Cas.","Viu.","Sep.","Div.","Cohab."];
		$scope.familiares = [{"sprsl": "S", "subty": "1", "stext": "Cónyuge"}, {"sprsl": "S", "subty": "10", "stext": "Cónyuge divorciado"}, {"sprsl": "S", "subty": "11", "stext": "Padre"}, {"sprsl": "S", "subty": "12", "stext": "Madre"}, {"sprsl": "S", "subty": "13", "stext": "Compañero"}, {"sprsl": "S", "subty": "14", "stext": "Hijo del compañero"}, {"sprsl": "S", "subty": "15", "stext": "Interlocutor indicado"}, {"sprsl": "S", "subty": "16", "stext": "Tío"}, {"sprsl": "S", "subty": "17", "stext": "Sobrino"}, {"sprsl": "S", "subty": "18", "stext": "Abuelo"}, {"sprsl": "S", "subty": "19", "stext": "Cuñado"}, {"sprsl": "S", "subty": "2", "stext": "Hijo"}, {"sprsl": "S", "subty": "20", "stext": "Suegro"}, {"sprsl": "S", "subty": "3", "stext": "Tutor legal"}, {"sprsl": "S", "subty": "4", "stext": "Testador"}, {"sprsl": "S", "subty": "5", "stext": "Tutor"}, {"sprsl": "S", "subty": "6", "stext": "Hijo adoptivo"}, {"sprsl": "S", "subty": "7", "stext": "Llamada de emergencia"}, {"sprsl": "S", "subty": "8", "stext": "Personas de referencia"}, {"sprsl": "S", "subty": "AR01", "stext": "Prenatal AR"}, {"sprsl": "S", "subty": "AR02", "stext": "Menor bajo tutela AR"}, {"sprsl": "S", "subty": "AR03", "stext": "Menor tutela temporaria AR"}, {"sprsl": "S", "subty": "AR04", "stext": "Hijo de cónyuge AR"}, {"sprsl": "S", "subty": "AR05", "stext": "Conviviente/concubino AR"}, {"sprsl": "S", "subty": "DE01", "stext": "Testador BAV"}, {"sprsl": "S", "subty": "J1", "stext": "Garante (JP)"}, {"sprsl": "S", "subty": "KW01", "stext": "Esposa"}, {"sprsl": "S", "subty": "QA01", "stext": "Esposa"}, {"sprsl": "S", "subty": "QA02", "stext": "Esposo"}];
		$scope.bancos = [{"banks": "CO", "bankl": "07", "banka": "BANCOLOMBIA"}];
		$scope.formacion = [{"langu": "S", "ausbi": "00006591", "atext": "ADMINISTRACION AERONATICA"}, {"langu": "S", "ausbi": "00006592", "atext": "ADMINSITRACION AGROPECUARIO"}, {"langu": "S", "ausbi": "00006593", "atext": "ADMINISTRACION AEROCIVIL"}, {"langu": "S", "ausbi": "00006594", "atext": "ADMINISTRACION DE AEROLINEAS Y AGENCIAS"}, {"langu": "S", "ausbi": "00006595", "atext": "ADMINISTRACION DE BIENES RAICES"}, {"langu": "S", "ausbi": "00006596", "atext": "ADMINISTRACION DE EMPRESAS"}, {"langu": "S", "ausbi": "00006597", "atext": "ADMINISTRACION DE INSTIRUCIONES DE SERVI"}, {"langu": "S", "ausbi": "00006598", "atext": "ADMINISTRACION DE NEGOCIOS"}, {"langu": "S", "ausbi": "00006599", "atext": "ADMINSITRACION DE OBRAS CIVILES"}, {"langu": "S", "ausbi": "00006600", "atext": "ADMINISTRACION DE OFICINAS"}, {"langu": "S", "ausbi": "00006601", "atext": "ADMINISTRACION DE SEGUROS"}, {"langu": "S", "ausbi": "00006602", "atext": "ADMINISTRACION DE SERVICIOS A BORDO (AER"}, {"langu": "S", "ausbi": "00006603", "atext": "ADMINISTRACION DE TRANSPORTE"}, {"langu": "S", "ausbi": "00006604", "atext": "ADMINISTRACION EDUCATIVO"}, {"langu": "S", "ausbi": "00006605", "atext": "ADMINISTRACION FINANCIERO"}, {"langu": "S", "ausbi": "00006606", "atext": "ADMINISTRACION HOSPITALARIO"}, {"langu": "S", "ausbi": "00006607", "atext": "ADMINISTRACION HOTELERO Y DE TURISMO"}, {"langu": "S", "ausbi": "00006608", "atext": "ADMINISTRACION MARITIMO"}, {"langu": "S", "ausbi": "00006609", "atext": "ADMINISTRACION PUBLICO"}, {"langu": "S", "ausbi": "00006610", "atext": "AGROLOGIA"}, {"langu": "S", "ausbi": "00006611", "atext": "AGRONOMIA"}, {"langu": "S", "ausbi": "00006612", "atext": "ANALISIS Y DISENO DE SISTEMAS DE COMPUTA"}, {"langu": "S", "ausbi": "00006613", "atext": "ANTROPOLOGIA"}, {"langu": "S", "ausbi": "00006614", "atext": "ARQUITECTURA"}, {"langu": "S", "ausbi": "00006615", "atext": "ARTE Y DECORACION"}, {"langu": "S", "ausbi": "00006616", "atext": "ARTES PLASTICAS"}, {"langu": "S", "ausbi": "00006617", "atext": "ARTES REPRESENTATIVAS"}, {"langu": "S", "ausbi": "00006618", "atext": "AVIACION (PILOTAJE Y SERVICIOS )"}, {"langu": "S", "ausbi": "00006619", "atext": "BACTERIOLOGIA"}, {"langu": "S", "ausbi": "00006620", "atext": "BELLAS ARTES"}, {"langu": "S", "ausbi": "00006621", "atext": "BIBLIOTECOLOGIA"}, {"langu": "S", "ausbi": "00006622", "atext": "BIOLOGIA"}, {"langu": "S", "ausbi": "00006623", "atext": "BIOLOGIA MARITNA"}, {"langu": "S", "ausbi": "00006624", "atext": "CIENCIAS MARINAS"}, {"langu": "S", "ausbi": "00006625", "atext": "CIENCIAS POLITICAS Y ADMINISTRATIVAS"}, {"langu": "S", "ausbi": "00006626", "atext": "CIENCIAS POLITICAS Y ESTUDIOS INTERNACIO"}, {"langu": "S", "ausbi": "00006627", "atext": "CINE Y FOTOGRAFIA"}, {"langu": "S", "ausbi": "00006628", "atext": "COMERCIO EXTERIOR"}, {"langu": "S", "ausbi": "00006629", "atext": "COMUNICACION SOCIAL"}, {"langu": "S", "ausbi": "00006630", "atext": "CONSTRUCCION DE EDIFICIOS"}, {"langu": "S", "ausbi": "00006631", "atext": "CONSTRUCCION CIVIL"}, {"langu": "S", "ausbi": "00006632", "atext": "CONTADURIA"}, {"langu": "S", "ausbi": "00006633", "atext": "DERECHO"}, {"langu": "S", "ausbi": "00006634", "atext": "DIBUJO ARQUITECTONICO Y DE INGENIERIA"}, {"langu": "S", "ausbi": "00006635", "atext": "DIBUJO PUBLICITARIO"}, {"langu": "S", "ausbi": "00006636", "atext": "DISENO DE MODAS"}, {"langu": "S", "ausbi": "00006637", "atext": "DISENO GRAFICO"}, {"langu": "S", "ausbi": "00006638", "atext": "DISENO INDUSTRIAL"}, {"langu": "S", "ausbi": "00006639", "atext": "DISENO TEXTIL"}, {"langu": "S", "ausbi": "00006640", "atext": "LICENCIATURA DE LA LINGUISTICA Y LITERAT"}, {"langu": "S", "ausbi": "00006641", "atext": "LICENCIATURA QUIMICA Y BIOLOGIA"}, {"langu": "S", "ausbi": "00006642", "atext": "LICENCIATURA CIENCIAS ECONOMICO SOCIAL"}, {"langu": "S", "ausbi": "00006643", "atext": "LICENCIATURA CIENCIAS SOCIALES"}, {"langu": "S", "ausbi": "00006644", "atext": "LICENCIATURA MATEMATICAS Y FISICAS"}, {"langu": "S", "ausbi": "00006645", "atext": "LICENCIATURA EN IDIOMAS"}, {"langu": "S", "ausbi": "00006646", "atext": "LICENCIATURA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006647", "atext": "ECOLOGIA Y RENDIMIENTO HUMANO"}, {"langu": "S", "ausbi": "00006648", "atext": "ECONOMIA"}, {"langu": "S", "ausbi": "00006649", "atext": "ESTUDANTE EN PRACTICA"}, {"langu": "S", "ausbi": "00006650", "atext": "ECONOMIA AGRARIO"}, {"langu": "S", "ausbi": "00006651", "atext": "ECONOMIA DEL HOGAR"}, {"langu": "S", "ausbi": "00006652", "atext": "ECONOMIA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006653", "atext": "EDUCADOR ESPECIAL"}, {"langu": "S", "ausbi": "00006654", "atext": "EDUCACION FISICA"}, {"langu": "S", "ausbi": "00006655", "atext": "EDUCACION PREESCOLAR"}, {"langu": "S", "ausbi": "00006656", "atext": "EDUCACION PRIMARIA"}, {"langu": "S", "ausbi": "00006657", "atext": "EDUCACION Y CIENCIAS RELIGIOSAS"}, {"langu": "S", "ausbi": "00006658", "atext": "ELECTRIFICACION Y TELEFONIA RURAL"}, {"langu": "S", "ausbi": "00006659", "atext": "ELECTROMEDICINA"}, {"langu": "S", "ausbi": "00006660", "atext": "ENFERMERIA"}, {"langu": "S", "ausbi": "00006661", "atext": "ENSENANZA DE LAS BELLAS ARTES"}, {"langu": "S", "ausbi": "00006662", "atext": "ENSENANZA DE LAS CIENCIAS AGROPECUARIAS"}, {"langu": "S", "ausbi": "00006663", "atext": "ESTADISTICA"}, {"langu": "S", "ausbi": "00006664", "atext": "ESTUDIOS POLICIALES"}, {"langu": "S", "ausbi": "00006665", "atext": "FILOSOFIA Y LETRAS"}, {"langu": "S", "ausbi": "00006666", "atext": "FISICA"}, {"langu": "S", "ausbi": "00006667", "atext": "FISIOTERAPEUTA"}, {"langu": "S", "ausbi": "00006668", "atext": "FLORICULTURA Y DISENO DE JARDINES"}, {"langu": "S", "ausbi": "00006669", "atext": "FONOAUDIOLOGIA"}, {"langu": "S", "ausbi": "00006670", "atext": "GEOLOGIA"}, {"langu": "S", "ausbi": "00006671", "atext": "GERONTOLOGIA"}, {"langu": "S", "ausbi": "00006672", "atext": "HISTORIADOR"}, {"langu": "S", "ausbi": "00006673", "atext": "IDIOMAS"}, {"langu": "S", "ausbi": "00006674", "atext": "INGENIERIA ADMINISTRATIVO"}, {"langu": "S", "ausbi": "00006675", "atext": "INGENIERIA AGRICOLA"}, {"langu": "S", "ausbi": "00006676", "atext": "INGENIERIA AUTOMOTRIZ"}, {"langu": "S", "ausbi": "00006677", "atext": "INGENIERIA CATASTRAL Y GEODESIA"}, {"langu": "S", "ausbi": "00006678", "atext": "INGENIERIA CIVIL"}, {"langu": "S", "ausbi": "00006679", "atext": "INGENIERIA DE ALIMENTOS"}, {"langu": "S", "ausbi": "00006680", "atext": "INGENIERIA DE MINAS Y METALURGIA"}, {"langu": "S", "ausbi": "00006681", "atext": "INGENIERIA DE PETROLEOS"}, {"langu": "S", "ausbi": "00006682", "atext": "INGENIERIA DE PRODUCCION"}, {"langu": "S", "ausbi": "00006683", "atext": "INGENIERIA DE SISTEMAS"}, {"langu": "S", "ausbi": "00006684", "atext": "INGENIERIA DE TRANSPORTE"}, {"langu": "S", "ausbi": "00006685", "atext": "INGENIERIA ELECTRICA"}, {"langu": "S", "ausbi": "00006686", "atext": "INGENIERIA ELECTRONICO"}, {"langu": "S", "ausbi": "00006687", "atext": "INGENIERIA ELECTROMECANICO"}, {"langu": "S", "ausbi": "00006688", "atext": "INGENIERIA FORESTAL"}, {"langu": "S", "ausbi": "00006689", "atext": "INGENIERIA GEOGRAFICO"}, {"langu": "S", "ausbi": "00006690", "atext": "INGENIERIA GEOLOGICO"}, {"langu": "S", "ausbi": "00006691", "atext": "INGENIERIA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006692", "atext": "INGENIERIA MECANICO"}, {"langu": "S", "ausbi": "00006693", "atext": "INGENIERIA NAVAL"}, {"langu": "S", "ausbi": "00006694", "atext": "INGENIERIA PESQUERO"}, {"langu": "S", "ausbi": "00006695", "atext": "INGENIERIA QUIMICO"}, {"langu": "S", "ausbi": "00006696", "atext": "INGENIERIA SANITARIO"}, {"langu": "S", "ausbi": "00006697", "atext": "INGENIERIA TERMICO"}, {"langu": "S", "ausbi": "00006698", "atext": "MATEMATICAS"}, {"langu": "S", "ausbi": "00006699", "atext": "MEDICINA"}, {"langu": "S", "ausbi": "00006700", "atext": "MEDICINA VETERINARIO Y ZOOTECNISTA"}, {"langu": "S", "ausbi": "00006701", "atext": "MERCADOTECNISTA"}, {"langu": "S", "ausbi": "00006702", "atext": "MICROBIOLOGIA"}, {"langu": "S", "ausbi": "00006703", "atext": "MUSICA"}, {"langu": "S", "ausbi": "00006704", "atext": "NUTRICIONISTA Y DIETETICA"}, {"langu": "S", "ausbi": "00006705", "atext": "OCEANOGRAFO FISICO"}, {"langu": "S", "ausbi": "00006706", "atext": "ODONTOLOGIA"}, {"langu": "S", "ausbi": "00006707", "atext": "OPTOMETRIA"}, {"langu": "S", "ausbi": "00006708", "atext": "PEDAGOGIA MUSICAL"}, {"langu": "S", "ausbi": "00006709", "atext": "PERIODISMO"}, {"langu": "S", "ausbi": "00006710", "atext": "PROMOCION SOCIAL"}, {"langu": "S", "ausbi": "00006711", "atext": "PSICOLOGIA"}, {"langu": "S", "ausbi": "00006712", "atext": "PSICOLOGIA EDUCATIVO"}, {"langu": "S", "ausbi": "00006713", "atext": "PUBLICISMO"}, {"langu": "S", "ausbi": "00006714", "atext": "QUIMICO Y FARMACEUTA"}, {"langu": "S", "ausbi": "00006715", "atext": "RECREADOR"}, {"langu": "S", "ausbi": "00006716", "atext": "RELACIONES INDUSTRIALES"}, {"langu": "S", "ausbi": "00006717", "atext": "SECRETARIA"}, {"langu": "S", "ausbi": "00006718", "atext": "SOCIOLOGIA"}, {"langu": "S", "ausbi": "00006719", "atext": "TECNOLOGIA DE PLASTICOS"}, {"langu": "S", "ausbi": "00006720", "atext": "TECNOLOGIA INDUSTRIAL"}, {"langu": "S", "ausbi": "00006721", "atext": "TECNOLOGIA DEPORTIVO"}, {"langu": "S", "ausbi": "00006722", "atext": "TECNOLOGIA EDUCATIVO"}, {"langu": "S", "ausbi": "00006723", "atext": "TEOLOGIA"}, {"langu": "S", "ausbi": "00006724", "atext": "TERAPEUTA OCUPACIONAL"}, {"langu": "S", "ausbi": "00006725", "atext": "TERAPIA RESPIRATORIA"}, {"langu": "S", "ausbi": "00006726", "atext": "TOPOGRAFIA"}, {"langu": "S", "ausbi": "00006727", "atext": "TRABAJODOR SOCIAL"}, {"langu": "S", "ausbi": "00006728", "atext": "TRADUCTOR TURISTICO"}, {"langu": "S", "ausbi": "00006729", "atext": "TECNICO MANTENIMIENTO MOTORES DIESEL"}, {"langu": "S", "ausbi": "00006730", "atext": "TECNICO MAQUINAS Y HERRAMIENTAS"}, {"langu": "S", "ausbi": "00006731", "atext": "TECNICO MANTENIMIENTO"}, {"langu": "S", "ausbi": "00006732", "atext": "TÉCNICO ELECTRICIDAD DE MANTENIMIENTO IN"}, {"langu": "S", "ausbi": "00006733", "atext": "TÉCNICO CONTABILIDAD Y FINANZAS"}, {"langu": "S", "ausbi": "00006734", "atext": "TÉCNICO DIRECCION DE VENTAS"}, {"langu": "S", "ausbi": "00006735", "atext": "TÉCNICO GESTION CONTABLE Y FINANCIERA"}, {"langu": "S", "ausbi": "00006736", "atext": "TECNICO INST.INDUSTRIAL"}, {"langu": "S", "ausbi": "00006737", "atext": "TÉCNICO MANT.MECÁNICO INDUSTRIAL"}, {"langu": "S", "ausbi": "00006738", "atext": "TÉC. SIS. CON ÉNFASIS EN MANT. DE COMPUT"}, {"langu": "S", "ausbi": "00006739", "atext": "TECNOLOGÍA CONT. SISTEMATIZADA"}, {"langu": "S", "ausbi": "00006740", "atext": "TECNOLOGÍA GESTION EMPRESARIAL"}, {"langu": "S", "ausbi": "00006741", "atext": "TECNOLOGÍA MANT. ELECTROMECÁNICO"}, {"langu": "S", "ausbi": "00006742", "atext": "TECNOLOGÍA MERCADEO"}, {"langu": "S", "ausbi": "00006743", "atext": "TECNOLOGO ADMINISTRACION DE EMPRESAS"}, {"langu": "S", "ausbi": "00006744", "atext": "TEC. ADMIN. DE REDES DE COMPUTADORES"}, {"langu": "S", "ausbi": "00006745", "atext": "TECNOLOGO AUTOMATIZACION INDUSTRIAL"}, {"langu": "S", "ausbi": "00006746", "atext": "TECNOLOGO ELECTRONICA"}, {"langu": "S", "ausbi": "00006747", "atext": "TECNOLOGO GESTION DEL MANTENIMIENTO"}, {"langu": "S", "ausbi": "00006748", "atext": "TECNOLOGO INSTRUMENTACION INDUSTRIAL"}, {"langu": "S", "ausbi": "00006749", "atext": "TEC. INSTRUMENTACION Y CONT. DE PROC. IN"}, {"langu": "S", "ausbi": "00006750", "atext": "TECNOLOGO MANT. ELECTROMECÁNICO"}, {"langu": "S", "ausbi": "00006751", "atext": "TEC. MANT. ELECTRONICA E INSTRUMENTAL"}, {"langu": "S", "ausbi": "00006752", "atext": "TEC. MANT.ELECTROMECÁNICO INDUSTRIAL"}, {"langu": "S", "ausbi": "00006753", "atext": "TEC. MEC. DE REFRI. Y AIRE ACONDICIONADO"}, {"langu": "S", "ausbi": "00006754", "atext": "TECNOLOGO MECATRONICA"}, {"langu": "S", "ausbi": "00006755", "atext": "TECNOLOGO SALUD OCUPACIONAL"}, {"langu": "S", "ausbi": "00006756", "atext": "TECNOLOGO SISTEMAS"}, {"langu": "S", "ausbi": "00006757", "atext": "TECNOOGO ADMINISTRACION DE EMPRESAS"}];
		$scope.titulos = [{"sprsl": "S", "slabs": "00", "stext": "Sin Título"}, {"sprsl": "S", "slabs": "01", "stext": "Con Título"}, {"sprsl": "S", "slabs": "02", "stext": "Ingeniero"}, {"sprsl": "S", "slabs": "03", "stext": "Tecnólogo"}, {"sprsl": "S", "slabs": "04", "stext": "Técnico"}, {"sprsl": "S", "slabs": "05", "stext": "Administrador"}, {"sprsl": "S", "slabs": "11", "stext": "Con Titulacion"}];
		$scope.especialidad = [{"langu": "S", "faart": "00010", "ftext": "Classical languages"}, {"langu": "S", "faart": "00011", "ftext": "Modern languages"}, {"langu": "S", "faart": "00012", "ftext": "Math/natural sciences"}, {"langu": "S", "faart": "00013", "ftext": "Liberal arts"}, {"langu": "S", "faart": "00020", "ftext": "Business"}, {"langu": "S", "faart": "00022", "ftext": "Technical"}, {"langu": "S", "faart": "00023", "ftext": "Electrical engineering"}, {"langu": "S", "faart": "00024", "ftext": "Communications engineer."}, {"langu": "S", "faart": "00025", "ftext": "Mechanical engineering"}, {"langu": "S", "faart": "00026", "ftext": "Precision mechanics"}, {"langu": "S", "faart": "00027", "ftext": "Civil engineering"}, {"langu": "S", "faart": "00030", "ftext": "Psychology"}, {"langu": "S", "faart": "00031", "ftext": "Paedagogy"}, {"langu": "S", "faart": "00032", "ftext": "Business paedogogy"}, {"langu": "S", "faart": "00033", "ftext": "Busin.careers for women"}, {"langu": "S", "faart": "00048", "ftext": "Busin.computer sciences"}, {"langu": "S", "faart": "00050", "ftext": "Business administration"}, {"langu": "S", "faart": "00051", "ftext": "Law"}, {"langu": "S", "faart": "00052", "ftext": "Medicine"}, {"langu": "S", "faart": "00053", "ftext": "Biology"}, {"langu": "S", "faart": "00054", "ftext": "Chemical industry"}, {"langu": "S", "faart": "00055", "ftext": "Physics"}, {"langu": "S", "faart": "00056", "ftext": "Other natural sciences"}, {"langu": "S", "faart": "00057", "ftext": "Mathematics"}, {"langu": "S", "faart": "00058", "ftext": "Computer sciences"}, {"langu": "S", "faart": "00059", "ftext": "Tech.computer sciences"}, {"langu": "S", "faart": "00060", "ftext": "German"}, {"langu": "S", "faart": "00061", "ftext": "English"}, {"langu": "S", "faart": "00062", "ftext": "French"}, {"langu": "S", "faart": "00063", "ftext": "Russian"}, {"langu": "S", "faart": "00065", "ftext": "Mercadeo"}, {"langu": "S", "faart": "00066", "ftext": "Administración de Empresas"}, {"langu": "S", "faart": "00067", "ftext": "Economía"}, {"langu": "S", "faart": "00070", "ftext": "DP"}, {"langu": "S", "faart": "00071", "ftext": "REFA"}, {"langu": "S", "faart": "00072", "ftext": "Human Resources"}, {"langu": "S", "faart": "00073", "ftext": "Accounting"}];
		$scope.institutos = [{"sprsl": "S", "slart": "01", "stext": "E. G.Basica"}, {"sprsl": "S", "slart": "02", "stext": "Hauptschule"}, {"sprsl": "S", "slart": "10", "stext": "Formacion prof."}, {"sprsl": "S", "slart": "11", "stext": "Bachillerato"}, {"sprsl": "S", "slart": "20", "stext": "Handelsschule"}, {"sprsl": "S", "slart": "21", "stext": "Instituo superior"}, {"sprsl": "S", "slart": "22", "stext": "G/T. Berufsschule"}, {"sprsl": "S", "slart": "23", "stext": "Kfm. Berufsschule"}, {"sprsl": "S", "slart": "25", "stext": "Handelsakademie"}, {"sprsl": "S", "slart": "26", "stext": "HoeTechnLehranstalt"}, {"sprsl": "S", "slart": "27", "stext": "HoeBundesLehranstalt"}, {"sprsl": "S", "slart": "50", "stext": "Universidad"}, {"sprsl": "S", "slart": "51", "stext": "Universidad"}, {"sprsl": "S", "slart": "52", "stext": "Escuela t. superior"}, {"sprsl": "S", "slart": "60", "stext": "Escuela de idiomas"}, {"sprsl": "S", "slart": "70", "stext": "cursos/sem. internos"}, {"sprsl": "S", "slart": "71", "stext": "cursos/sem. externos"}, {"sprsl": "S", "slart": "E1", "stext": "E.Gral.Basica EGB AR"}, {"sprsl": "S", "slart": "E2", "stext": "E.Polimodal AR"}, {"sprsl": "S", "slart": "E3", "stext": "E.Primaria AR"}, {"sprsl": "S", "slart": "E4", "stext": "E.Secundaria AR"}, {"sprsl": "S", "slart": "E5", "stext": "E.Terciaria AR"}, {"sprsl": "S", "slart": "E6", "stext": "E.Especial AR"}, {"sprsl": "S", "slart": "E7", "stext": "E.Preescolar AR"}, {"sprsl": "S", "slart": "Z1", "stext": "Bachiller"}, {"sprsl": "S", "slart": "Z2", "stext": "Profesional"}, {"sprsl": "S", "slart": "Z3", "stext": "Especialización"}, {"sprsl": "S", "slart": "Z4", "stext": "Maestría"}, {"sprsl": "S", "slart": "Z5", "stext": "Doctorado"}];
		
		
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
		
		// console.log($scope.estados);
		
		// console.log("employee",$scope.employee);
		
	});
}());
