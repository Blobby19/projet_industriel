/**
 * Created by Luc on 04/04/2016.
 */

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Logger = require('./assets/fr.itv95.logger/LoggerClass.js')('Server');

var port = process.env.PORT || 1337;
var configuration = require('./configuration/application.json');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set('views engine', 'ejs');

var public = express.Router();
require('./client/app/server/routes/public.js')(public, configuration);
app.use('/', public);

var api = express.Router();
require('./client/app/server/routes/api.js')(api);
app.use('/api', api);

app.use('/', express.static('public'));

var server = app.listen(port, function(){
    Logger.info('Server is running on port '+ port);
});

server.closeServer = function(){
    server.close();
};

module.exports = server;