( function() {

'use strict';

window.gimmeAnItemElement = function() {
  var elem = document.createElement('div');
  elem.className = 'item';
  return elem;
};

})();
