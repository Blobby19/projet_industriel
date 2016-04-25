/**
 * Created by Luc on 04/04/2016.
 */

var template_file = __dirname+'/../../../../configuration/templates.json';
var config_file = __dirname+'/../../../../configuration/application.json';

var fs = require('fs');

var Application = require(__dirname+'/../../../../assets/Application.js');

module.exports = function(router, application){

    router.post('/create_application', function(req, res){
        var application;
        console.log(req.body);
        if(req.body !== undefined)
            application = new Application(req.body);
        res.status(200).send(application);
    });

    router.get('/templates', function(req, res){
        var templates = require(template_file);
        res.json(templates);
    });

    router.post('/templates', function(req, res){
        var templates = require(template_file);
        if(req.body.directory !== undefined)
            templates.template_directory = req.body.directory;
        saveFile(template_file, templates);
        res.json(templates);
    });

    /**
     * Put: add_template to applicationTag
     */
    router.put('/templates', function(req, res){
        try{
            if(!req.body.templates instanceof Array)
                throw new Error;
            //TODO: Ajouter les templates directement au appTag
            res.status(200).send({message: 'templates added correctly'});
        }
        catch(ex){
            res.status(503).send({message: ex.message});
        }
    });

    router.get('/template/detail/:id',function(req, res){
        try{
            var templates = require(template_file);
            var file = JSON.parse(fs.readFileSync(templates.template_directory+"\\"+req.params.id+".json"));
            res.status(200).send(file);
        }
        catch(ex){
            res.status(503).send({message: ex.message});
        }
    });

    router.get('/config', function(req, res){
        var config = require(config_file);
        res.json(config);
    });

    router.post('/config', function(req, res){
        var config = require(config_file);
        if(req.body.app.title !== undefined)
            config.app.title = req.body.app.title;
        if(req.body.directory !== undefined)
            config.directory = req.body.directory;
        saveFile(config_file, config);
        res.json(config);
    });

    router.post('/inputs', function(req, res){
        
    });

    router.post('/make_cta', function(req, res){
        try{
            if(req.body.inputs !== undefined)
                var inputs = JSON.parse(req.body.inputs);
            if(req.body.outputs !== undefined)
                var outputs = JSON.parse(req.body.outputs);
            if(req.body.templates !== undefined)
                var templates = JSON.parse(req.body.templates);
            res.status(200).send({inputs: inputs, outputs: outputs, templates: templates});
        }
        catch(ex){
            res.status(503).send({message: ex.message});
        }
    });

    var saveFile = function(file, content){
        fs.writeFileSync(file, JSON.stringify(content));
    };

};