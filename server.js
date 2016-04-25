/**
 * Created by Luc on 04/04/2016.
 */

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Logger = require('./assets/fr.itv95.logger/LoggerClass.js')('Server');

var port = process.env.PORT || 1337;
var configuration = require('./configuration/application.json');

module.exports = function(){
    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(morgan('dev'));
    app.set('views engine', 'ejs');

    var application = null;

    //Appel du router des 
    var public = express.Router();
    require('./server/app/server/routes/public.js')(public, configuration);
    app.use('/', public);

    var api = express.Router();
    require('./server/app/server/routes/api.js')(api, application);
    app.use('/api', api);

    app.use('/', express.static('public'));

    return app;
};