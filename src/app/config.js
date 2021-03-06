(function(){
  'use strict';

  // Configuraciones generales aplicacion front end
  var ui = {
    default_state: 'main.views.dashboard.home'
  };

  // Informacion de entorno
  var runEnv = {
    isDevelopment: window.location.port === '9000',
    isDevelopmentCloud: window.location.host === 'hritest.hrinteractive.co',
    dummyHost: 'hrsolutions.co',
    clientHostResourceUrl : 'http://hrsolutions.amazonaws.com/client-resources/'
  };
  // Configuracion API HR
  var hrapi = {};
  hrapi.hostname = function(){
    if(runEnv.isDevelopment === true){
      return 'http://127.0.0.1:3000';
      // return 'http://10.0.1.74:3000';
    }else if(runEnv.isDevelopmentCloud === true){
      return 'http://devhrinteractive.herokuapp.com';
    }
    return 'https://hdvbackend.hrinteractive.co';
  }();
  hrapi.apiName = 'humanresources';
  hrapi.apiVersion = 'v1';
  hrapi.apiBaseUrl = function(path){
    //return hrapi.hostname + '/api/' + hrapi.apiName + '/' + hrapi.apiVersion + '/' + path;
    return hrapi.hostname + '/api/v1' + path;
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

  angular.module('analytics.mixpanel')
  .config(['$mixpanelProvider', function($mixpanelProvider) {
    $mixpanelProvider.apiKey("f929f52c03b5d4d6032c28be34eabd91"); // your API key
  }]);
}());

