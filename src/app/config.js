(function(){
  'use strict';

  // Configuraciones generales aplicacion front end
  var ui = {
    default_state: 'main.views.dashboard.home'
  };

  // Informacion de entorno
  var runEnv = {
    isDevelopment: window.location.port === '9000',
    dummyHost: 'hrsolutions.co',
    clientHostResourceUrl : 'http://hrsolutions.amazonaws.com/client-resources/'
  };

  // Configuracion API HR
  var hrapi = {};
  hrapi.hostname = function(){
    if(runEnv.isDevelopment === true){
      return 'http://127.0.0.1:3000';
      // return 'http://0.0.0.0:3000';
    }
    return 'http://hdvbackend.hrinteractive.co';
  }();
  hrapi.apiName = 'humanresources';
  hrapi.apiVersion = 'v1';
  hrapi.apiBaseUrl = function(path){
    //return hrapi.hostname + '/api/' + hrapi.apiName + '/' + hrapi.apiVersion + '/' + path;
    return hrapi.hostname + '/api' + path;
  };

  hrapi.baseUrl = function(path){
    //return hrapi.hostname + '/api/' + hrapi.apiName + '/' + hrapi.apiVersion + '/' + path;    
    if(runEnv.isDevelopment === true){      
      return hrapi.hostname + path;
    }
    return path
  };

  angular.module('app.config', [])
    .constant('RUNENV_CONF', runEnv)
    .constant('UI_CONF', ui)
    .constant('HRAPI_CONF', hrapi);
}());

