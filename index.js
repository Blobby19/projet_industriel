
/*
* Fichier de démarrage de l'application
* index.js
* Author: Luc Viala
*/

// Import & déclaration du logger
var Logger = require('./assets/logger')('index');

// Import de la librairie generator
var generator = require('./assets/generator.js')(__dirname, 'generatedFile.xml');
var config_file = require('./config.json');

generator.addTemplate(config_file.config.templates[0], [{name:"appName", value:"TestLuc"}]);
generator.addTemplate(config_file.config.templates[1], [{name:"modbusRtuEnabled", value:"false"}]);
generator.makeFile();
