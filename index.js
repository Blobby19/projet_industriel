
/*
* Fichier de démarrage de l'application
* index.js
* Author: Luc Viala
*/

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var morgan = require('morgan');

var port = process.env.port || 1337;

// Import & déclaration du logger
var Logger = require('./assets/logger')('index');

// Import de la librairie generator
var generator = require('./assets/generator.js')(__dirname, 'generatedFile.xml');

// Import du fichier de configuration
var config_file = require('./config.json');

// Import de la configurationd de l'application
var constants_file = require('./application.json');

app.use('/', express.static(__dirname+ '/public'));

app.use(morgan('dev'));

// Permet de spécifier le moteur de template
app.set('view engine', 'ejs');
app.set('views', 'views');

// Permet de servir les fichier de l'application
app.get('/', function(req, res){
  res.render('index', constants_file.app);
});

app.get('/double', function(req, res){
  res.render('double', constants_file.app);
})

io.on('connection', function(socket){
  console.log('Client connected!');
});

// Permet d'initialiser le générateur XML
//generator.initialization();

// Permet d'ajouter des templates dans la configuration
//generator.addTemplate(config_file.config.templates[0]);

// Permet de générer le fichier terminé
//generator.generateSAXFile();

server.listen(port, function(){
  Logger.info('Server is listening on port '+port);
});
