
/*
* Fichier de démarrage de l'application
* index.js
* Author: Luc Viala
*/

//var express = require('express');
//var app = express();
//var server = require('http').createServer(app);
//var io = require('socket.io')(server);

var morgan = require('morgan');

var port = process.env.port || 1337;

// Import & déclaration du logger
var Logger = require('./assets/logger')('index');


var dbManifestInit = require(__dirname+'\\assets\\fr.itv95.manifests\\dbManifestInit.js');
//var dbManifest = new dbManifestInit("C:\\sedona\\manifests", "C:\\Users\\Luc\\WebstormProjects\\CTAMaker\\app\\assets\\fr.itv95.db");
var dbManifest = new dbManifestInit(__dirname+"\\..\\manifests", __dirname+"\\assets\\fr.itv95.db");

var ApplicationClass = require(__dirname+'\\assets\\Application.js');
var Application = new ApplicationClass("TestLuc");

//var db = require(__dirname+'\\assets\\fr.itv95.db\\RecoverManifest.js')();