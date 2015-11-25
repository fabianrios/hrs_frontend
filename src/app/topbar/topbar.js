(function(){
  'use strict';

  angular.module('topbar', [])

    .controller('Topbar.TopbarController', function($scope, $rootScope, Notification){//, currentUser, articles, $log, Notification){	
    	$rootScope.notifications = {}
        $scope.$on( 'hrs:updateNotifications', function(){
            $rootScope.notifications = Notification.show();            
        });						
    });
}());

