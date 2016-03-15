
/*
* Fichier de démarrage de l'application
* index.js
* Author: Luc Viala
*/

//var express = require('express');
//var app = express();
//var server = require('http').createServer(app);
//var io = require('socket.io')(server);

//var morgan = require('morgan');

var port = process.env.port || 1337;

// Import & déclaration du logger
var Logger = require('./assets/logger')('index');

// Import de la librairie generator
//var generator = require('./assets/generator.js')(__dirname, 'generatedFile.xml');

// Import du fichier de configuration
//var config_file = require('./config.json');

// Import de la configurationd de l'application
//var constants_file = require('./application.json');

// Permet d'initialiser le générateur XML
//generator.initialization();

// Permet d'ajouter des templates dans la configuration
//generator.addTemplate(config_file.config.templates[1]);

//generator.addFolder("inputs");
//generator.addFolder("ouputs");

//generator.addInput("TAmb", "RTD", "inputs");

// Permet de générer le fichier terminé
//generator.generateSAXFile();

//server.listen(port, function(){
//  Logger.info('Server is listening on port '+port);
//});


var ApplicationClass = require(__dirname+'\\assets\\Application.js');
var Application = new ApplicationClass("TestLuc");

//var db = require(__dirname+'\\assets\\fr.itv95.db\\RecoverManifest.js')();

//var dbManifestInit = require(__dirname+'\\assets\\fr.itv95.manifests\\dbManifestInit.js');
//var dbManifest = new dbManifestInit("C:\\sedona\\manifests", "C:\\Users\\Luc\\WebstormProjects\\CTAMaker\\app\\assets\\fr.itv95.db");