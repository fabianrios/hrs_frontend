(function(){
  'use strict';

  angular.module('topbar', [])

    .controller('Topbar.TopbarController', function($scope, Notification){//, currentUser, articles, $log, Notification){	
    	$scope.notifications = {}
        $scope.$on( 'hrs:updateNotifications', function(){
            $scope.notifications = Notification.show();
            // {{notification["count"]}}           
            // console.log($scope.notifications);
        });						
    });
}());

