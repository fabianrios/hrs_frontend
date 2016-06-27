(function(){
	'use strict';
  
	angular.module('articles', ['article.service','textAngular', 'analytics.mixpanel'])

	// Add http interceptors that allows us to handle http request before it sends and http response parsing
	.config(function($stateProvider){
		$stateProvider
		.state('main.views.articles', {
			url: '/articles',
			templateUrl: 'app/articles/articles.tpl.html',
			controller: 'Articles.ListController',
			resolve: {
				articles: function(Article){
					return Article.index({per:50}).$promise;
				}
			}
		})
    .state('main.views.articleDetail', {
      url: '/articles/:id/view',
      templateUrl: 'app/articles/article.tpl.html',
      controller: 'Articles.DetailController',
      resolve: {
        article: function(Article, $stateParams){
          return Article.show({id: $stateParams.id}).$promise;
        }
      }
    })
		.state('main.views.articleNew', { //state for adding a new company
		    url: '/articles/new',
		    templateUrl: 'app/articles/articlenew.tpl.html',
		    controller: 'articles.NewController'
		})
		.state('main.views.articleedit', { //state for updating a movie
		    url: '/articles/:id/edit',
		    templateUrl: 'app/articles/articleedit.tpl.html',
		    controller: 'articles.EditController',
	        resolve: {
	          article: function(Article, $stateParams){
	            return Article.show({id: $stateParams.id}).$promise;
	          }
	        }
	    });
	})
	.controller('Articles.ListController', ['$rootScope', '$scope', '$http', '$state', 'Article', 'HRAPI_CONF', 'articles', '$mixpanel', function($rootScope, $scope, $http, $state, Article, HRAPI_CONF, articles, $mixpanel){
		$mixpanel.track("Content Manager", {
      "user_id": 		 $scope.user.id,
      "$pernr": 		 $scope.user.employee.identification,
	    "$email": 	   $scope.user.email,
	    "$date_time":  new Date(),
	    "$first_name": $scope.user.employee.name,
	    "$last_name":  $scope.user.employee.lastname,
	    "company_id":  $scope.user.company_id
    });
		$scope.permission_alert = '';
		
		if(angular.isObject(articles[0])){
			$scope.permission_alert = articles[0].message.permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return angular.isObject(articles[0]);
		}
		
		if(angular.isObject(articles.articles)){
			$scope.articles = articles.articles;
			$scope.articles = articles.articles.concat(articles.not_articles);
			$scope.articles_not_mine = [];
		}
		
		$scope.categorias = {
			Bienestar : 'Noticias y eventos de bienestar', 
			Nomina : 'Nomina',
			Salud : 'Salud ocupacional',
			Talento : 'Talento humano'
		};
		
		$scope.articleDelete = function(article,modal) {
			$http.delete(
				HRAPI_CONF.apiBaseUrl('/articles/' + article.id + '.json')
			).success(function (data, status, headers, config) {
	      var index = $scope.articles.indexOf(article);
				$scope.articles.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "El articulo '"+ article.titulo + "' a sido borrado"});               
      }).error(function (data, status, headers, config) { 	            	       
        $rootScope.showMessageErrorRails(data);
      });
		} 
	}])	
	.controller('Articles.DetailController', ['$scope', '$http', '$state', 'article', 'Notification', function($scope, $http, $state, article, Notification){
		$scope.permission_alert = '';
		
		if(angular.isObject(article[0])){
			$scope.permission_alert = article.message[0].permission_alert;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return angular.isObject(article[0]);
		}

		$scope.article = article;
	}])
	.controller('articles.EditController', ['$scope', '$http', '$state', 'article', 'HRAPI_CONF', 'Upload', 'CONSTANT', function($scope, $http, $state, article, HRAPI_CONF, Upload, CONSTANT){
		$scope.permission_alert = '';
		
		function messagePermission() {
			$scope.permission_alert = CONSTANT.MESSAGE_PERMISSION;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return !$scope.user.company.show_articles;
		}

		if(!$scope.user.company.show_articles){
			messagePermission();
		}
	
		$scope.article = article;
		var archivo    = null;

		$scope.loadImage = function( file ){
			archivo = file;
		}
		
    $scope.options = [
       { label: 'Noticias y eventos de bienestar', value: 'Bienestar' },
       { label: 'Nomina', value: 'Nomina' },
		   { label: 'Salud ocupacional', value: 'Salud' },
		   { label: 'Talento humano', value: 'Talento' }
   	];
	   
		// Cual es la categoria??
		angular.forEach($scope.options, function(value, key) {
			if (value.value == $scope.article.category){
				$scope.correctlySelected = $scope.options[key];
			}
		});
		
		$scope.update = function(item){
			$scope.article.category = item.value;
		};
	
    $scope.updateArticle = function() { //Update the edited company. Issues a PUT to /api/companies/:id
      $scope.article.sending = true;
			Upload.upload({
      	method: 'PUT', 
        url: HRAPI_CONF.apiBaseUrl('/articles/' + $scope.article.id + '.json'), 
        fields: $scope.article, 
        file: archivo
      }).progress(function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total); 		                
      }).success(function (data, status, headers, config) {
      	$state.go('main.views.articles');	               
      }).error(function (data, status, headers, config) { 
      	$scope.article.sending = false;	            	       
      	$scope.showMessageErrorRails(data);
      });
   };
	}])
	.controller('articles.NewController', ['$scope', '$http', '$state', 'Article', 'HRAPI_CONF', 'Upload', 'CONSTANT', function($scope, $http, $state, Article, HRAPI_CONF, Upload, CONSTANT){	
		$scope.permission_alert = '';
		
		function messagePermission() {
			$scope.permission_alert = CONSTANT.MESSAGE_PERMISSION;
			setTimeout(function() {
				$state.transitionTo('main.views.dashboard');
			}, 2000);
		}

		$scope.showMessagePermission = function(){
			return !$scope.user.company.show_articles;
		}

		if(!$scope.user.company.show_articles){
			messagePermission();
		}
		
		if( $scope.user.employee.new_cont=="true"){
			var archivo = null;

		    $scope.options = [
		       { label: 'Noticias y eventos de bienestar', value: 'Bienestar' },
		       { label: 'Nomina', value: 'Nomina' },
			   { label: 'Salud ocupacional', value: 'Salud' },
			   { label: 'Talento humano', value: 'Talento' }
		   ];
		   
		   
			$scope.update = function(item){
				$scope.article.category = item.value;
			};
		 
			
			$scope.article = new Article();  
			$scope.article.employee_id = $scope.user.employee.id;
			$scope.correctlySelected = $scope.options[1];


			$scope.update($scope.correctlySelected);

			$scope.loadImage = function( file ){
				archivo = file;
			}

			$scope.addArticulo = function() { //create a new company. Issues a POST to /api/companies
				$scope.article.sending = true;
				Upload.upload({
      		method: 'POST',
          url: HRAPI_CONF.apiBaseUrl('/articles.json'),
          fields: $scope.article,
          file: archivo
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
      		$mixpanel.track("Content Manager - New", {
					  "user_id": 		 $scope.user.id,
					  "$pernr": 		 $scope.user.employee.identification,
					  "$email": 	   $scope.user.email,
					  "$date_time":  new Date(),
					  "$first_name": $scope.user.employee.name,
					  "$last_name":  $scope.user.employee.lastname,
					  "company_id":  $scope.user.company_id,
					  "app_version": 1
					});
        	$state.go('main.views.articles');
        }).error(function (data, status, headers, config) {
        	// $scope.alerts.push({type: 'alert', msg: data.errors.status[0]});		
        	$scope.article.sending = false;              
        	$scope.showMessageErrorRails(data);	            	
        });
			};
		}else{
			//$state.transitionTo('main.views.articles');
			messagePermission();
		}
	}]);
}());
