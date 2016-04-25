
/*
* Fichier de démarrage de l'application
* index.js
* Author: Luc Viala
*/

// Import & déclaration du logger
var Logger = require('./assets/logger')('Index');

var dbManifestInit = require(__dirname+'\\assets\\fr.itv95.manifests\\dbManifestInit.js');
var dbManifest = new dbManifestInit("C:\\sedona\\manifests", "C:\\Users\\Luc\\WebstormProjects\\CTAMaker\\app\\assets\\fr.itv95.db");
//var dbManifest = new dbManifestInit(__dirname+"\\..\\manifests", __dirname+"\\assets\\fr.itv95.db");

var ApplicationClass = require(__dirname+'\\assets\\Application.js');
var Application = new ApplicationClass();

var db = require(__dirname+'\\assets\\fr.itv95.db\\RecoverManifest.js')();

//var server = app().listen(1337);
//Logger.info('Server is listening on port: '+1337);