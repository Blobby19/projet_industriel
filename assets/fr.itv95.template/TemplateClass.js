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
var TemplateClass = function(name, description, objects, compId){
    this.name = name;
    this.description = description;
    this.objects = objects;
    this.compId = compId;
    var test = this.generateTemplate(this.objects);
    return test;

};

/**
 * Permet de g�n�rer le template en version XML � placer dans le AppTag du fichier sax
 * @param objects
 * @returns Retourne un objet CompTagClass qui poss�de tous ses PropagClass
 */
TemplateClass.prototype.generateTemplate = function(objects){
    Logger.info("generateTemplate");
    try{
        var thisComp = null;
        //On v�rifie que le 'objects' soit un tableau
        if(objects instanceof Array && objects.length>0){
            //On regarde tout ce que contient le tableau 'objects'
            for(var i = 0; i<objects.length; i++){
                if(objects[i].type !== undefined && objects[i].type!== ""){
                    //On cr�er le CompTagClass
                    thisComp = this.makeComp(objects[i]);
                }
                if(objects[i].childrens !== undefined && objects[i].childrens.length>0){
                    for(var j = 0; j<objects[i].childrens.length; j++)
                        thisComp.addChildren(this.generateTemplate(objects[i].childrens[j]));
                }
            }
        }
        //Si 'objects' n'est pas un tableau alors on cr�er directement le CompTagClass
        else{
            if(objects.type !== undefined && objects.type !== ""){
                console.log(objects);
                thisComp = this.makeComp(objects);
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
 * Permet de g�n�rer les CompTagClass en fonction du manifest
 * @param object
 * @returns CompTagClass
 */
TemplateClass.prototype.makeComp = function(object){
    Logger.info("makeComp");
    try{
        // Cr�er le CompTagClass de l'objet
        var thisComp = new CompTagClass(object.name, object.type, ++this.compId);
        // On r�cup�re les PropTagClass de l'objet gr�ce au manifest associ�
        console.log(object);
        var thisSlots = this.findObjectSlotsInManifests(object.type, object);
        if(thisSlots instanceof Array && thisSlots.length>0){
            //On parcours tout les slots de l'objet
            for(var i = 0; i<thisSlots.length; i++){
                var value;
                if(thisSlots[i]._default !== undefined) value=thisSlots[i]._default;
                //TODO: Pr�voir l'utilisation de la fonction makeProp
                //Si le slot possede le flag 'c' alors on le prend
                if(thisSlots[i].flags !== undefined && thisSlots[i].flags.match(/c/))
                    thisComp.addChildren(new PropTagClass(thisSlots[i].name, value));
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
 * Permet de Cr�er le PropTagClass de l'objet
 */
TemplateClass.prototype.makeProp = function(){
    Logger.info("makeProp");
    //TODO: Pr�voir la cr�ation du PropTagClass gr�ce � cette fonction
};

/**
 * Permet de cr�er les liens associ�s au objets pr�sent dans le template
 */
TemplateClass.prototype.makeLink = function(){
    Logger.info("makeLink");
};

/**
 * Permet de r�cup�rer les slots disponibles dans les objets
 * @param manifestName Nom du manifest
 * @param object
 * @returns Tableau de slots
 */
TemplateClass.prototype.findObjectSlotsInManifests = function(manifestName, object){
    Logger.info("findObjectInManifests");
    try{
        var retour;
        //Regex pour la premi�re partie du nom du manifest
        var regex = /(.+)::/gi;
        var fileName = manifestName.match(regex);
        if(fileName.length>0)
            fileName = fileName[0].replace("::", "");

        //Regex pour la seconde partie du nom qui correspond � l'objet du manifest
        var regex2 = /::(.+)/gi;
        var objectName = manifestName.match(regex2);
        if(objectName.length>0)
            objectName = objectName[0].replace("::", "");

        // On va lire le manifest correspondant
        var file = fs.readFileSync(__dirname+'\\..\\fr.itv95.db\\'+fileName+'.json');
        if(file !== null)
            file = JSON.parse(file);

        // On v�rifie qu'il existe des objets � l'int�rieur du manifest
        if(file.listOfTypes !== undefined
            && file.listOfTypes instanceof Array
            && file.listOfTypes.length>0){
            // On parcours tous les types disponibles jusqu'� trouver l'objet qui nous int�resse
            for(var i = 0; i<file.listOfTypes.length; i++){
                if(file.listOfTypes[i].name === objectName){
                    if(file.listOfTypes[i].listOfSlots.length>0){
                        // Lorsqu'on a trouv� l'objet on r�cup�re les slots disponibles dans celui-ci.
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