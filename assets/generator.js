/*
* Fichier permettant de générer un fichier xml
* generator.js
* Author: Luc Viala
*/

// Déclaration du Logger
var Logger = require('./logger.js')('generator');

// Librairie FileSystem
var fs = require('fs');

// Librairie xml2js permet de transformer un xml en json
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

// Fichier de configuration
var config_file = require('../config.json');

// Import de la classe Tag
var MainTag = require('./TagClass.js');

module.exports = function(rootFolder, fileName){

  var generator = {};

  var root = config_file.config.root;
  var templatesAvailable = config_file.config.templates;
  var locationTagsAvailable = config_file.config.locationTags;
  var rootTemplate = {};

  var appTag = new MainTag('app');
  //var appTag, linksTag;
  var testTag = new MainTag('test');

  // Fonction privée d'initialisation de la librairie generator
  var init = function(){
    Logger.info('init');
    if(fileName === undefined
      || fileName === ""
      || rootFolder === undefined
      || rootFolder === ""){
      rootFolder = "c:\\wamp\\www\\projet-industriel-2\\";
      fileName = "generatedFile.xml";
    }
    if(root !== undefined){
      if(root.templateUrl !== undefined
        && root.templateUrl !== ""){
        root.templateUrl = root.templateUrl.replace('/', '\\');
        rootTemplate = parseRootTemplate(rootFolder+'\\'+root.templateUrl);
        
      }
    }
  }

  // Fonction privée qui permet de scanner le template root
  var parseRootTemplate = function(rootTemplateFile){
    Logger.info('parseRootTemplate');
    var retour = {};
    var file = fs.readFileSync(rootTemplateFile);
    if(file !== undefined
      && file !==""){
      parser.parseString(file, function(err, result){
        retour = result;
      });
    }
    return retour;
  }

  // Fonction privée qui permet de parser le template séléctionné
  var parseTemplate = function(templateFile){
    Logger.info('parseTemplate');
    var retour = {};
    if(appTag === undefined || appTag === ""){
      init();
    }
    var file = fs.readFileSync(templateFile);
    if(file !== undefined
      && file !==""){
      parser.parseString(file, function(err, result){
        retour = result;
      });
    }
    return retour;
  }

  // Fonction privée de remplacement des slashs dans les liens
  var replaceSlashs = function(string){
    Logger.info('replaceSlashs');
    return string.replace('/', '\\');
  }

  // Fonction privée qui permet de compiler un template avec une liste d'argument
  var compileTemplate = function(template, args){
    if(args instanceof Array && args.length>0){
      args.forEach(function(arg){
        template = replaceDynamically(template, arg, false);
      });
      return template;
    }
  }

  // Fonction privée qui permet de remplacer dynamiquement les parametres dans un template
  var replaceDynamically = function(obj, arg, valid){
    Logger.info('replaceDynamically');
    if(!valid){
      var _valid = false;
      for(key in obj){
        if(typeof(obj[key]) == 'object' && !(obj[key] instanceof Array)){
          if(obj[key].name === arg.name){
            obj[key].val = arg.value;
            valid = true;
            return obj[key];
          }else{
            obj[key] = replaceDynamically(obj[key], arg, valid);
          }
        }
        else if((obj[key] instanceof Array)) {
          obj[key].forEach(function(obj){
            obj = replaceDynamically(obj, arg, valid);
          });
        }
        else return obj;
      }
      return obj;
    }
  }

  // Fonction publique qui permet de générer le fichier
  generator.makeFile = function(){
    Logger.info('makeFile');
    init();
  };

  // Fonction publique qui permet d'ajouter un composant dans le fichier
  generator.addTemplate = function(template, args){
    Logger.info('addTemplate');
    if(template === undefined || template === ""){
      Logger.error('Template is not defined!');
    }
    else if(template.type === undefined || template.type === ""){
      Logger.error('Template type is not defined!');
    }
    else if(template.templateUrl === undefined || template.templateUrl === ""){
      Logger.error('Template url is not defined!');
    }
    else if(template.locationTag === undefined || template.locationTag === ""){
      Logger.error('Template locationTag is not defined!');
    }
    else{
      var jsonTemplate = parseTemplate(rootFolder+'\\'+replaceSlashs(template.templateUrl));
      jsonTemplate = compileTemplate(jsonTemplate, args);
      switch(template.locationTag){
        case "app":
          appTag.addTemplate(jsonTemplate);
          break;
        case "links":
          console.log("links");
          break;
        default:
          break;
      }
    }
  };

  return generator;
};
