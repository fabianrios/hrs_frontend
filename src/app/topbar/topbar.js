(function(){
  'use strict';

  angular.module('topbar', [])

    .controller('Topbar.TopbarController', function($scope, currentUser, articles){
		
		$scope.user = currentUser;
		$scope.articles = articles.articles;
		$scope.articles_not_mine = [];
		$scope.articles_mine = [];
		var mine = articles.articles;
		$scope.not_published_mine = articles.not_articles;
		
		
		//sacar todos los articulos que son mios y no he publicado
		angular.forEach($scope.not_published_mine, function(value, key) {
			var index = $scope.not_published_mine.indexOf(value);
			// console.log(key,value);
			if (value.employee_id != 1){
				$scope.not_published_mine.splice(index, 1);
			}
			// 		  this.push(key + ': ' + value);
		});
		
		
		// sacar todos los articulos publicados que NO son mios
		angular.forEach(mine, function(value, key) {
			var i = mine.indexOf(value);
			if (value.employee_id != 1){
				$scope.articles_not_mine.push(value);
			}
		});
		
		// sacar todos los articulos publicados que son mios
		angular.forEach(mine, function(value, key) {
			var i = mine.indexOf(value);
			if (value.employee_id == 1){
				$scope.articles_mine.push(value);
			}
		});
		
		// console.log($scope.articles, $scope.articles_not_mine, $scope.not_published_mine, $scope.articles_mine);
		
    });
}());

