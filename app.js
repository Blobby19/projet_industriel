/*
Import des librairies npm
 */
var fs = require('fs');
var bunyan = require('bunyan');
var express = require('express');
var prompt = require('prompt');

var log_error = './logs/error.log';
var log_info = './logs/info.log';

// Déclaration du logger
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

// Import des librairies locales
var config_file = __dirname+'/config/config.json'
var config = require(config_file);
var manifest = require(__dirname+'/app/read_manifest.js');
var jsonSax = require(__dirname+'/app/json_2_sax.js');
var libXml = require(__dirname+'/app/lib_xml.js')

// Permet d'installer l'application
var installation = function(){
  log.info('installation');
  try{
    var sedonaDirectory = fs.statSync(config.config.default.directory);
    if(sedonaDirectory.isDirectory()){
      log.info('Sedona directory exists !');
      config.config.install.directory = config.config.default.directory;
    }
    else{
      log.warn('Sedona directory doesn\'t exists');
      config.config.install.directory = getSedonaDirectory();
    }
  }
  catch(e){
    log.warn('Sedona directory doesn\'t exists');
    config.config.install.directory = getSedonaDirectory();
  }
  manifest.read_folder(config.config.install.directory, "1.2.28");
  config.config.install.import=true;
  saveInstallation(config.config.install);
  log.info('fin installation');
}

// Permet de récupérer le dossier Sedona
var getSedonaDirectory = function(){
  log.info('getSedonaDirectory');
  return 'C:\\Niagara\\Niagara-3.7.106\\sedona\\kits';
}

// Permet de sauvegarder la configuration
var saveInstallation = function(_install){
  config.config.install=_install;
  fs.writeFileSync(config_file, JSON.stringify(config));
}

// Fonction principale
var main = function(){
  log.info('Main')
  console.log(config.config.install.import);
  if(!config.config.install.import)
    installation();
  jsonSax.create_xml();
}

var app = express();

main();
