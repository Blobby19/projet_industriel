
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

var SedonaAppTagClass = require(__dirname+'\\assets\\fr.itv95.class\\SedonaAppTagClass.js');
var CompTagClass = require(__dirname+'\\assets\\fr.itv95.class\\CompTagClass.js');
var PropTagClass = require(__dirname+'\\assets\\fr.itv95.class\\PropTagClass.js');
var LinkTagClass = require(__dirname+'\\assets\\fr.itv95.class\\LinkTagClass.js');
var KitTagClass = require(__dirname+'\\assets\\fr.itv95.class\\KitTagClass.js');

var sedonaApp = new SedonaAppTagClass();

var schemaTag = sedonaApp.getSchemaTag();
var appTag = sedonaApp.getAppTag();
var linkTag = sedonaApp.getLinksTag();

var comp = new CompTagClass("name");
var prop = new PropTagClass("prop");

console.log(sedonaApp.generateTag());