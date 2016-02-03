var bunyan = require('bunyan');

var log_error = './logs/error.log';
var log_info = './logs/info.log';

// Definition du logger de la librairie
var log = bunyan.createLogger({
  name:'lib_xml',
  streams:[
    {
      level:'info',
      stream: process.stdout
    },
    {
      level:'error',
      path: log_error
    }
  ]
});


module.exports = {
  makeLinks: function(){
    log.info('Make links');

    log.info('Fin Make links');
  }
}
