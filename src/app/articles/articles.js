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
					return Article.index().$promise;
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
	
	.controller('Articles.ListController', function($scope, $http, $state, articles, currentUser, Article, HRAPI_CONF ){
		
		$scope.user = currentUser;
		$scope.articles = articles.articles;
		var mine = articles.articles;
		$scope.articles_not_mine = [];
		
		// Articulos publicados que no son mios	
		angular.forEach(mine, function(value, key) {
			var i = mine.indexOf(value);
			if (value.employee_id != 1){
				$scope.articles_not_mine.push(value);
			}
		});

		
		$scope.categorias = {
			Bienestar : 'Noticias y eventos de bienestar', 
			Nomina : 'Nomina',
			Salud : 'Salud ocupacional',
			Talento : 'Talento humano'
		};
		
		$scope.articleDelete = function(article,modal) { 
			// article = Article.show({id: article.id})
			// console.log(article);
			// article.$delete( function() {
			$http.delete(
				HRAPI_CONF.apiBaseUrl('/articles/' + article.id + '.json')
			).success(function (data, status, headers, config) { 
	            var index = $scope.articles.indexOf(article);
				console.log(index);
				$scope.articles.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "El articulo '"+ article.titulo + "' a sido borrado"});               
	        }).error(function (data, status, headers, config) { 	            	       
	            $scope.showMessageErrorRails(data);
            });
			
		} ///BORRAR
		

	})	
	.controller('Articles.DetailController', function($scope, $http, $state, article, currentUser, Notification){
        
		
		$scope.user = currentUser;
		$scope.article = article;
        
        Notification.article({id: currentUser.employee.identification, article_id: $scope.article.id });
	
		// console.log("$scope.user",$scope.user, "$scope.article", $scope.article);

	})
	.controller('articles.EditController', function($scope, $http, $state, article, currentUser, HRAPI_CONF, Upload ){
		
		$scope.user = currentUser;
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
	       // $scope.article.$update(function() {
	       //   $state.go('main.views.articles'); // on success go back to company_listing
	       // });
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
	            	$scope.showMessageErrorRails(data);
            });
	     };

	})
	.controller('articles.NewController', function($scope, $http, $state, Article, currentUser, HRAPI_CONF, Upload ){
		
		$scope.user = currentUser;
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
	 

		// console.log("$scope.user",$scope.user);
		
		$scope.article = new Article();  
		$scope.article.employee_id = $scope.user.employee.id;
		$scope.correctlySelected = $scope.options[1];


		$scope.update($scope.correctlySelected);
		
		// $scope.article.category = $scope.options[2].value;

		$scope.loadImage = function( file ){
			archivo = file;
		}

		$scope.addArticulo = function() { //create a new company. Issues a POST to /api/companies
			// $scope.article.$save(function() {
			//    $state.go('main.views.articles'); // on success go back to company_listing
			// });		
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
	            	$scope.showMessageErrorRails(data);	            	
            });
		};

	});
	
}());
