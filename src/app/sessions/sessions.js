(function(){
  'use strict';
  
  angular.module('sessions', ['sap.service', 'user.service'])

    .config(function($stateProvider){
      $stateProvider
        .state('login', {
          abstract: true,
          templateUrl: 'app/layouts/login.tpl.html'
        })
        .state('login.auth', {
          url: '/login',
          templateUrl: 'app/sessions/login.tpl.html',
          controller: 'sessions.LoginController'
        })
        .state('main.views.edit', {
          url: '/edit',
          templateUrl: 'app/sessions/edit.tpl.html',
          controller: 'sessions.EditController'
        });
    })

    .controller('sessions.LoginController', function($scope, Auth){

      $scope.credentials = {};
    
      $scope.login = function() { //login
        Auth.login($scope.credentials).then(function(user) {
          // inicializacion de algun tipo 
        }, function(error) {
            console.log("sessions.LoginController: error en la autenticacion")
        });
      };
     
    })

    .controller('sessions.EditController', function($scope, $state, $stateParams, $http, $location, Auth, User){
    
    
      // Hmm esto no tiene cara de ir aca ...
      $scope.$on('s3upload:success', function (evt, xhr, fileUrl) {
            
        $http({method: 'PUT', 
               url: '/api/users/'+$scope.user.id,
               data: { user: { pic: fileUrl.path}}
        })
          .success( function( data, status ) {
            // errorService.success( data, status, 'Your password has been changed', $scope);
            console.log("imagen colocada", data);
          })
          .error( function( data, status ) {
            // errorService.failure( data, status, $scope);
            console.log("error", status, data.errors, $scope);
          });
      });

    
      $scope.updateUser = function() { //editar
      //console.log("$scope.user", $scope.user);
          // $scope.user.$update(function() {
//            $location.path('/home'); // on success go back to home
//      });
      console.log($scope.user);
      
      $http({method: 'PUT', 
               url: '/api/users.json',
               data: {user: {
                   name: $scope.user.name,
                   email: $scope.user.email,
                             password: $scope.user.password,
                             password_confirmation: $scope.user.password_confirmation,
                   current_password: $scope.user.current_password}}})
          .success( function( data, status ) {
            // errorService.success( data, status, 'Your password has been changed', $scope);
        $location.path('/home'); //volver al home
          })
          .error( function( data, status ) {
            // errorService.failure( data, status, $scope);
        console.log("error", status, data.errors, $scope);
        $scope.alerts.push({type: 'alert', msg: "Revisa los campos"});
          });
      
       };
     
    //
    // Auth.currentUser().then(function(user) {
    //    $scope.user_id = user.id;
    //        $scope.pass = user.current_password;
    //                // console.log($scope.user_id); // => {id: 1, ect: '...'}
    //
    //           $scope.loadUser = function() { //Issues a GET request to /api/movies/:id to get a movie to update
    //          $scope.user = User.get({ id: $scope.user.id });
    //           // console.log($scope.user);
    //           };
    //
    //           $scope.loadUser($scope.usuario); // Load a movie which can be edited on UI
    //
    //            }, function(error) {
    //                // unauthenticated error
    //         });
     
     
     
    });
}());
