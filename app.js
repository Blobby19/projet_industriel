/*
Import des librairies npm
 */
var fs = require('fs');
var bunyan = require('bunyan');

var log_error = './logs/error.log';
var log_info = './logs/info.log';

var log = bunyan.createLogger({
  name:'app',
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

/*
Import des librairies locales
 */
var config_file = __dirname+'/config/config.json'
var config = require(config_file);
var manifest = require(__dirname+'/app/read_manifest.js');
var jsonSax = require(__dirname+'/app/json_2_sax.js');

var install = config.config.install;

var installation = function(){
  if(!install.import){
    manifest.read_folder(install.directory, install.version);
    install.import = true;
    fs.writeFileSync(config_file, JSON.stringify(config));
  }
}

var main = function(){
  installation();
  jsonSax.create_xml();
}

main();