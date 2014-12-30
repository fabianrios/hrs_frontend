(function(){
  'use strict';

  angular.module('sidebar', [])
  
    .controller('Sidebar.SidebarController', function($scope){
      $scope.ui.sidebar = {
        miniExpanded: false,
        mainCollapsed: false
      };
      $scope.common = {};
    });
}());
