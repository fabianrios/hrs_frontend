(function(){
  'use strict';
  angular.module('topbar', [])
  .controller('Topbar.TopbarController', ['$scope', '$rootScope', 'Notification', function($scope, $rootScope, Notification){//, currentUser, articles, $log, Notification){	
  	$rootScope.notifications = {}
      $scope.$on( 'hrs:updateNotifications', function(){
          $rootScope.notifications = Notification.show();            
      });						
  }]);
}());

