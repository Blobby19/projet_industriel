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
var builder = new xml2js.Builder();

// Fichier de configuration
var config_file = require('../config.json');

// Import de la classe Tag
var MainTag = require('./TagClass.js').MainTag;

module.exports = function(rootFolder, fileName){

  var generator = {};

  // rootConfig
  var rootConfig = config_file.config.root;
  var destinationFile = config_file.config.destinationFile;
  var templatesAvailable = config_file.config.templates;
  var locationTagsAvailable = config_file.config.locationTags;

  // rootTemplate contient le template entier
  var rootTemplate = {};

  var appTag = new MainTag('app');

  var testTag = new MainTag('test');

  // Fonction privée d'initialisation de la librairie generator
  var init = function(){
    Logger.info('init');
    // Si aucun filename n'est disponible alors on les redéfinis par défaut.
    if(fileName === undefined
      || fileName === ""
      || rootFolder === undefined
      || rootFolder === ""){
      rootFolder = "c:\\wamp\\www\\projet-industriel-2\\";
      fileName = "generatedFile.xml";
    }
    if(rootConfig !== undefined){
      if(rootConfig.templateUrl !== undefined
        && rootConfig.templateUrl !== ""){
        //root.templateUrl = root.templateUrl.replace('/', '\\');
        //rootTemplate = parseRootTemplate(rootFolder+'\\'+root.templateUrl);
        if(rootConfig.params.length > 0){
          // TODO: Vérifier le nombre de parmaètres à rentrer
          // Compilation du rootTemplate afin de remplacer les différents éléments
          rootTemplate = compileTemplate(rootConfig, [{name: "appName", value: "Test"}]);
          console.log(rootTemplate);
          appTag.setRaw(rootTemplate.sedonaApp.app);
        }
      }
    }
  }

  // Fonction privée qui permet de parser le template séléctionné
  var parseTemplate = function(templateFile){
    Logger.info('parseTemplate');
    var retour = {};
    if(appTag === undefined || appTag === ""){
      Logger.warn('No MainTag defined!');
      init();
    }
    var file = fs.readFileSync(templateFile);
    if(file !== undefined
      && file !==""){
      parser.parseString(file, function(err, result){
        retour = result;
      });
    }else{
      Logger.warn('No MainTag defined!');
    }
    return retour;
  }

  // Fonction privée de remplacement des slashs dans les liens
  var replaceSlashs = function(string){
    Logger.info('replaceSlashs');
    return string.replace('/', '\\');
  }

  // TODO: Remplacer la string template qui arrive dans la fonction compileTemplate par un objet template
  // Fonction privée qui permet de compiler un template avec une liste d'argument
  var compileTemplate = function(template, args){
    Logger.info('compileTemplate');
    var numberOfArgsCorrect = false;

    var _templateFile = parseTemplate(rootFolder+ '\\'+replaceSlashs(template.templateUrl));
    if(typeof(template) ==='object'){
      if(template.name === 'folder'){
        _templateFile = replaceFolderName(_templateFile, args[0]);
        return _templateFile;
      }
      else{
        if(args !== 'undefined'
          && args instanceof Array
          && template.params.length === args.length){
          args.forEach(function(arg){
            _templateFile = replaceDynamically(_templateFile, arg, false);
          });
          return _templateFile;
        }
        else{
          return _templateFile;
        }
      }
    }
    else {
      return null;
    }
  }

  var replaceFolderName = function(obj, arg){
    obj.comp.$.name = arg.value;
    return obj;
  }

  // Fonction privée qui permet de remplacer dynamiquement les parametres dans un template
  var replaceDynamically = function(obj, arg, valid){
    Logger.info('replaceDynamically');
    if(!valid){
      for(key in obj){
        if(typeof(obj[key]) == 'object' && !(obj[key] instanceof Array)){
          if(obj[key].name === arg.name){
            console.log(obj[key]);
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
  generator.initialization = function(){
    Logger.info('makeFile');
    init();
  };

  // Fonction publique qui permet d'ajouter un composant dans une objet tag
  generator.addTemplate = function(template, args){
    Logger.info('addTemplate');
    var jsonTemplate = {};
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
      console.log(template);
      if(args !== 'undefined')
         jsonTemplate = compileTemplate(template, args);
      else jsonTemplate = compileTemplate(template);
      switch(template.locationTag){
        case "app":
          appTag.addComponent(jsonTemplate);
          break;
        case "links":
          console.log("links");
          break;
        default:
          break;
      }
    }
  };

  // Fonction publique qui permet d'jouter un dossier dans l'app
  generator.addFolder = function(folderName){
    Logger.info('addFolder');
    var folderTemplateConfig;
    var jsonTemplate = {};
    if(templatesAvailable[0].name === "folder"){
      folderTemplateConfig = templatesAvailable[0];
    }else{
      templatesAvailable.forEach(function(template){
        if(template.name === "folder"){
          folderTemplateConfig = template;
        }
      });
    }
    if(folderName === undefined || folderName ==="")
      return;
    else{
      jsonTemplate = compileTemplate(folderTemplateConfig, [{name: "{{value}}", value: folderName}]);
      console.log(jsonTemplate);
    }
    switch(folderTemplateConfig.locationTag){
      case "app":
        appTag.addFolder(jsonTemplate);
        break;
      case "links":
        console.log("links");
        break;
      default:
        break;
    }
  }

  // Fonction publique qui permet de générer du code XML avec tout les templates disponibles.
  generator.generateSAXFile = function(){
    Logger.info('generateSAXFile');
    //console.log(rootTemplate.sedonaApp.app);
    rootTemplate.sedonaApp.app = appTag.generateTag();
    var xml = builder.buildObject(rootTemplate);
    fs.writeFile(__dirname + '\\' + destinationFile, xml, function(err){
      if(err) throw err;
      console.log('File saved!');
    });
  };


  generator.addInput= function(name, type, folder){
    Logger.info('addInput');
    if(name === 'undefined' || name === null){
      name = 'UI1';
    }
    if(type === 'undefined' || type === null){
      Logger.error("Failed to add input");
      return;
    }
    if(folder === 'undefined' || folder === null){
      folder = "app";
    }
    switch(type){
      case "RTD":
            console.log("RTD type");
            break;
      case "DI":
            console.log("DI type");
            break;
      case "pulse":
            console.log("pulse type");
            break;
      case "R":
            console.log("R type");
            break;
      case "A":
            console.log("A type");
            break;
      case "V":
            console.log("V type");
            break;
      default:
            console.log("default");
            break;
    }

  };


  return generator;
};
