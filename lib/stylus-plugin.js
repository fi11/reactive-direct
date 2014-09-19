var path = require('path');
module.exports = function plugin() {
  return function(style){
    style.import(path.join( __dirname,'..', 'node_modules', 'stylobate'));
    style.import(path.join(__dirname, '..', 'node_modules', 'stylobate-islands'));
  };
};
