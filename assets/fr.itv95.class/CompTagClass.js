/**
 * Created by Fedora on 10/03/2016.
 *
 * Classe générique pour tout les components Sedona
 */

var TagClass = require('./TagClass');
var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('CompTagClass');

/**
 * Constructeur de la classe
 * @param name
 * @param type
 * @param id
 * @constructor
 */
var CompTagClass = function(name, type, id){
    Logger.info("Creation CompTagClass");
    TagClass.call(this, "comp");
    if(name.length < 0){
        //TODO: Vérifie si le name est supérieur à 7 caractères.
    }
    else
        this.name = name;

    if(type === undefined || type === null){
        //TODO: Lâche exception si non déclaré
    }
    else
    {
        this.type = type;
    }

    this.id = id;
};

CompTagClass.prototype = Object.create(TagClass.prototype);
CompTagClass.prototype.constructor = CompTagClass;

CompTagClass.prototype = new TagClass("comp");

/**
 * getName
 * @returns {*}
 */
CompTagClass.prototype.getName = function(){
    return this.name;
};

/**
 * setName
 * @param name
 */
CompTagClass.prototype.setName = function(name){
    this.name = name;
};

/**
 * getType
 * @returns {*}
 */
CompTagClass.prototype.getType = function(){
    return this.type;
};

/**
 * setType
 * @param type
 */
CompTagClass.prototype.setType = function(type){
    this.type = type;
};

/**
 * Permet de générer le tag de l'objet comp
 * @returns {string}
 */
CompTagClass.prototype.generateTag = function(){
    Logger.info("generateTag");
    try{
        var startTag = "<comp ";
        if(this.name!=null && this.name != "")
            startTag+="name=\""+this.name+"\" ";
        if(this.type!=null && this.type!="")
            startTag+="type=\""+this.type+"\" ";
        if(this.id!=null && this.id!="")
            startTag+="id=\""+this.id+"\"";
        startTag+=">\n";
        var inTag = "";
        if(this.childrens != undefined || this.childrens.length>0){
            for(key in this.childrens){
                if(this.childrens[key] instanceof TagClass)
                    inTag += this.childrens[key].generateTag();
            }
        }

        var stopTag = "</"+this.tagName+">\n";
        var tag = startTag+inTag+stopTag;
        return tag;
    }
    catch(ex){
        Logger.error(ex.message);
        return;
    }
};

module.exports = CompTagClass;