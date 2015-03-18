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
	
	.controller('Articles.ListController', function($scope, $http, $state, articles, currentUser){
		
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
			console.log(article);
			// article.$delete(function() {
				var index = $scope.articles.indexOf(article);
				console.log(index);
				$scope.articles.splice(index, 1);
				$('#myModal-'+modal).foundation('reveal', 'close');  
				$scope.alerts.push({type: 'alert', msg: "El articulo '"+ article.titulo + "' a sido borrado"});
			// });
			
		} ///BORRAR
		

	})	
	.controller('Articles.DetailController', function($scope, $http, $state, article, currentUser){
		
		$scope.user = currentUser;
		$scope.article = article;
	
		// console.log("$scope.user",$scope.user, "$scope.article", $scope.article);

	})
	.controller('articles.EditController', function($scope, $http, $state, article, currentUser){
		
		$scope.user = currentUser;
		$scope.article = article;
		
		console.log($scope.article);
		
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
	       $scope.article.$update(function() {
	         $state.go('main.views.articles'); // on success go back to company_listing
	       });
	     };

	})
	.controller('articles.NewController', function($scope, $http, $state, Article, currentUser){
		
		$scope.user = currentUser;
		
	    $scope.options = [
	       { label: 'Noticias y eventos de bienestar', value: 'Bienestar' },
	       { label: 'Nomina', value: 'Nomina' },
		   { label: 'Salud ocupacional', value: 'Salud' },
		   { label: 'Talento humano', value: 'Talento' }
	   ];
	   
	   
	   $scope.correctlySelected = $scope.options[1];
	
		// console.log("$scope.user",$scope.user);
		
		$scope.article = new Article();  
		$scope.article.employee_id = $scope.user.employee.id;
		
		$scope.update = function(item){
			console.log(item);
			$scope.article.category = item.value;
		};
		
		// $scope.article.category = $scope.options[2].value;
 
		$scope.addArticulo = function() { //create a new company. Issues a POST to /api/companies
			$scope.article.$save(function() {
			   $state.go('main.views.articles'); // on success go back to company_listing
			});
		};

	});
	
}());
