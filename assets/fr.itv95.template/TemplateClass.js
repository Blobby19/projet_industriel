/**
 * Created by Luc on 15/03/2016.
 */

var Logger = require(__dirname+'\\..\\fr.itv95.logger\\LoggerClass.js')("TemplateClass");

var CompTagClass = require(__dirname+"\\..\\fr.itv95.class\\CompTagClass.js");
var PropTagClass = require(__dirname+"\\..\\fr.itv95.class\\PropTagClass.js");

var fs = require('fs');

/**
 * Constructeur de la classe Template
 * @constructor
 */
var TemplateClass = function(name, description, objects, links, compId){
    this.name = name;
    this.description = description;
    this.objects = objects;
    this.links = links;
    this.compId = compId;
};

/**
 * Permet de générer le template en version XML à placer dans le AppTag du fichier sax
 * @param objects
 * @returns Retourne un objet CompTagClass qui possède tous ses PropagClass
 */
TemplateClass.prototype.generateTemplate = function(folder, linksTag){
    Logger.info("generateTemplate");
    var thisComp = null;
    var components = Array();
    try{
        if(this.objects instanceof Array && this.objects.length>0){
            for(var i =0; i<this.objects.length; i++){
                if(this.objects[i].type !== undefined && this.objects[i].type !== ""){
                    thisComp = this.makeComp(this.objects[i]);
                    folder.addChildren(thisComp);
                }
            }
        }
        if(this.links instanceof Array && this.links.length>0){
            for(var i =0; i<this.links.length; i++){

            }
        }
    }
    catch(ex){
        console.log(ex.message);
    }
};

/**
 * Permet de générer les CompTagClass en fonction du manifest
 * @param object
 * @returns CompTagClass
 */
TemplateClass.prototype.makeComp = function(object){
    Logger.info("makeComp");
    try{
        // Créer le CompTagClass de l'objet
        var thisComp = new CompTagClass(object.name, object.type, ++this.compId);
        // On récupère les PropTagClass de l'objet grâce au manifest associé
        var thisSlots = this.findObjectSlotsInManifests(object.type, object);
        if(thisSlots instanceof Array && thisSlots.length>0){
            //On parcours tout les slots de l'objet
            for(var i = 0; i<thisSlots.length; i++){
                var value;
                if(thisSlots[i]._default !== undefined) value=thisSlots[i]._default;
                else if(thisSlots[i].type)
                //TODO: Prévoir l'utilisation de la fonction makeProp
                //Si le slot possede le flag 'c' alors on le prend
                if(thisSlots[i].flags !== undefined && thisSlots[i].flags.match(/c/)) {
                    var prop = this.makeProp(thisSlots[i].name, value);
                    thisComp.addChildren(prop);
                }
            }
        }
        return thisComp;
    }
    catch(ex){
        Logger.error(ex.message);
        return;
    }
};

/**
 * Permet de Créer le PropTagClass de l'objet
 */
TemplateClass.prototype.makeProp = function(name, value){
    Logger.info("makeProp");
    //TODO: Prévoir la création du PropTagClass grâce à cette fonction
    return new PropTagClass(name, value);
};

/**
 * Permet de créer les liens associés au objets présent dans le template
 */
TemplateClass.prototype.makeLinks = function(links){
    Logger.info("makeLinks");
};

/**
 * Permet de récupérer les slots disponibles dans les objets
 * @param manifestName Nom du manifest
 * @param object
 * @returns Tableau de slots
 */
TemplateClass.prototype.findObjectSlotsInManifests = function(manifestName, object){
    Logger.info("findObjectInManifests");
    try{
        var retour;
        //Regex pour la première partie du nom du manifest
        var regex = /(.+)::/gi;
        var fileName = manifestName.match(regex);
        if(fileName.length>0)
            fileName = fileName[0].replace("::", "");

        //Regex pour la seconde partie du nom qui correspond à l'objet du manifest
        var regex2 = /::(.+)/gi;
        var objectName = manifestName.match(regex2);
        if(objectName.length>0)
            objectName = objectName[0].replace("::", "");

        // On va lire le manifest correspondant
        var file = fs.readFileSync(__dirname+'\\..\\fr.itv95.db\\'+fileName+'.json');
        if(file !== null)
            file = JSON.parse(file);

        // On vérifie qu'il existe des objets à l'intérieur du manifest
        if(file.listOfTypes !== undefined
            && file.listOfTypes instanceof Array
            && file.listOfTypes.length>0){
            // On parcours tous les types disponibles jusqu'à trouver l'objet qui nous intéresse
            for(var i = 0; i<file.listOfTypes.length; i++){
                if(file.listOfTypes[i].name === objectName){
                    if(file.listOfTypes[i].listOfSlots.length>0){
                        // Lorsqu'on a trouvé l'objet on récupère les slots disponibles dans celui-ci.
                        retour = file.listOfTypes[i].listOfSlots;
                    }
                    break;
                }
            }
        }
        return retour;
    }
    catch(ex){
        Logger.error(ex.message);
        return;
    }
};

module.exports = TemplateClass;