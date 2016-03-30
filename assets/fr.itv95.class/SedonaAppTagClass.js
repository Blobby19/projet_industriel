/**
 * Created by Fedora on 10/03/2016.
 *
 * Classe Principale du programme Sedona
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('SedonaAppTagClass');
var TagClass = require('./TagClass');

/**
 * Constructeur de la classe SedonaAppTagClass
 * @constructor
 */
var SedonaAppTagClass = function(){
    TagClass.call(this, "sedonaApp");
    this.schemaTag = new TagClass("schema");
    this.appTag = new TagClass("app");
    this.linksTag = new TagClass("links");
};

SedonaAppTagClass.prototype = Object.create(TagClass.prototype);
SedonaAppTagClass.prototype.constructor = SedonaAppTagClass;

/**
 * getSchemaTag
 * @returns {TagClass|exports|module.exports|*}
 */
SedonaAppTagClass.prototype.getSchemaTag = function(){
    return this.schemaTag;
};

/**
 * setSchemaTag
 * @param schemaTag
 */
SedonaAppTagClass.prototype.setSchemaTag = function(schemaTag){
    this.schemaTag = schemaTag;
};

/**
 * getAppTag
 * @returns {TagClass|exports|module.exports|*}
 */
SedonaAppTagClass.prototype.getAppTag = function(){
    return this.appTag;
};

/**
 * setAppTag
 * @param appTag
 */
SedonaAppTagClass.prototype.setAppTag = function(appTag){
    this.appTag = appTag;
};

/**
 * getLinksTag
 * @returns {TagClass|exports|module.exports|*}
 */
SedonaAppTagClass.prototype.getLinksTag = function(){
    return this.linksTag;
};

/**
 * setLinksTag
 * @param linksTag
 */
SedonaAppTagClass.prototype.setLinksTag = function(linksTag){
    this.linksTag = linksTag;
};

/**
 * Permet de générer le tag de la classe SedonaAppTagClass
 * @returns {string}
 */
SedonaAppTagClass.prototype.generateTag = function(){
    try{
        var startTag = "<"+this.tagName+">\n";
        var inTag = "";
        inTag += this.schemaTag.generateTag();
        inTag += this.appTag.generateTag();
        inTag += this.linksTag.generateTag();
        var stopTag = "</"+this.tagName+">";
        return startTag+inTag+stopTag;
    }
    catch(ex){
        Logger.error(ex.message);
        return;
    }
}

module.exports = SedonaAppTagClass;