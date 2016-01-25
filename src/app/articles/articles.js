(function(){
	'use strict';
  
	angular.module('articles', ['article.service','textAngular'])

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
	
	.controller('Articles.ListController', ['$rootScope', '$scope', '$http', '$state', 'Article', 'HRAPI_CONF', 'articles', function($rootScope, $scope, $http, $state, Article, HRAPI_CONF, articles){
		if($scope.user.company.show_articles ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		$scope.articles = articles.articles;		
		$scope.articles = articles.articles.concat(articles.not_articles);	
		$scope.articles_not_mine = [];		

		
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
				console.log(index);
				$scope.articles.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "El articulo '"+ article.titulo + "' a sido borrado"});               
	        }).error(function (data, status, headers, config) { 	            	       
	            $rootScope.showMessageErrorRails(data);
            });
			
		} 

	}])	
	.controller('Articles.DetailController', ['$scope', '$http', '$state', 'article', 'Notification', function($scope, $http, $state, article, Notification){
    if($scope.user.company.show_articles ===  false){
			$state.transitionTo('main.views.dashboard');
		} 		
		$scope.article = article;
	}])
	.controller('articles.EditController', ['$scope', '$http', '$state', 'article', 'HRAPI_CONF', 'Upload', function($scope, $http, $state, article, HRAPI_CONF, Upload){

		if($scope.user.company.show_articles ===  false){
			$state.transitionTo('main.views.dashboard');
		} 
		
		// $scope.user = currentUser;
		$scope.article = article;
		var archivo = null;
		
		console.log($scope.article);

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
			// console.log(value,key);
			if (value.value == $scope.article.category){
				$scope.correctlySelected = $scope.options[key];
				console.log(value.value,key)
			}
		});
		
		$scope.update = function(item){
			console.log(item);
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
	.controller('articles.NewController', ['$scope', '$http', '$state', 'Article', 'HRAPI_CONF', 'Upload', function($scope, $http, $state, Article, HRAPI_CONF, Upload){	
		if($scope.user.company.show_articles ===  false){
			$state.transitionTo('main.views.dashboard');
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
			
			// $scope.article.category = $scope.options[2].value;

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
		            	$state.go('main.views.articles');	               
		            }).error(function (data, status, headers, config) { 
		            	// $scope.alerts.push({type: 'alert', msg: data.errors.status[0]});		
		            	$scope.article.sending = false;              
		            	$scope.showMessageErrorRails(data);	            	
	            });
			};
		}else{
			$state.transactionTo('main.views.articles');
		}
	}]);
}());
