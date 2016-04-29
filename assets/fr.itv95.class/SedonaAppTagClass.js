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
    Logger.info('Constructeur');
    TagClass.call(this, "sedonaApp");
    this.schemaTag = new TagClass("schema");
    this.appTag = new TagClass("app", null, null, "/");
    this.linksTag = new TagClass("links");


};

SedonaAppTagClass.prototype = Object.create(TagClass.prototype);
SedonaAppTagClass.prototype.constructor = SedonaAppTagClass;

/**
 * getSchemaTag
 * @returns {TagClass|exports|module.exports|*}
 */
SedonaAppTagClass.prototype.getSchemaTag = function(){
    Logger.info('getSchemaTag');
    return this.schemaTag;
};

/**
 * setSchemaTag
 * @param schemaTag
 */
SedonaAppTagClass.prototype.setSchemaTag = function(schemaTag){
    Logger.info('setSchemaTag');
    this.schemaTag = schemaTag;
};

/**
 * getAppTag
 * @returns {TagClass|exports|module.exports|*}
 */
SedonaAppTagClass.prototype.getAppTag = function(){
    Logger.info('getAppTag');
    return this.appTag;
};

/**
 * setAppTag
 * @param appTag
 */
SedonaAppTagClass.prototype.setAppTag = function(appTag){
    Logger.info('setAppTag');
    this.appTag = appTag;
};

/**
 * getLinksTag
 * @returns {TagClass|exports|module.exports|*}
 */
SedonaAppTagClass.prototype.getLinksTag = function(){
    Logger.info('getLinksTag');
    return this.linksTag;

};

/**
 * setLinksTag
 * @param linksTag
 */
SedonaAppTagClass.prototype.setLinksTag = function(linksTag){
    Logger.info('setLinksTag');
    this.linksTag = linksTag;
};

/**
 * Permet de générer le tag de la classe SedonaAppTagClass
 * @returns {string}
 */
SedonaAppTagClass.prototype.generateTag = function(){
    Logger.info('generateTag');
    try{
        var startTag = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n";
        startTag += "<"+this.tagName+">\n";
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
};

module.exports = SedonaAppTagClass;