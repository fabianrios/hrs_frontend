(function(){
  'use strict';

  angular.module('topbar', [])

    .controller('Topbar.TopbarController', function($scope, Notification){//, currentUser, articles, $log, Notification){				
        $scope.$on( 'hrs:updateNotifications', function(){
            $scope.notifications = Notification.show().$promise;
            $scope.notifications.count = $scope.notifications.articles + $scope.notifications.vacation + $scope.notifications.extra + $scope.notifications.inhability +  $scope.notifications.license + $scope.notifications.info;
        });						
    });
}());

