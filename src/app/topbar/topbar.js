(function(){
  'use strict';

  angular.module('topbar', [])

    .controller('Topbar.TopbarController', function($scope, Notification){//, currentUser, articles, $log, Notification){				
        $scope.$on( 'hrs:updateNotifications', function(){
            $scope.notifications = Notification.show({id: $scope.user.employee.identification}).$promise;
        });						
    });
}());

