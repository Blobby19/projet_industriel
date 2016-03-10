/**
 * Created by Fedora on 10/03/2016.
 *
 * Classe Principale du programme Sedona
 */

var TagClass = require('./TagClass');

var SedonaAppTagClass = function(){
    TagClass.call(this, "sedonaApp");
    this.schemaTag = new TagClass("schema");
    this.appTag = new TagClass("app");
    this.linksTag = new TagClass("links");
};

SedonaAppTagClass.prototype = Object.create(TagClass.prototype);
SedonaAppTagClass.prototype.constructor = SedonaAppTagClass;

SedonaAppTagClass.prototype.getSchemaTag = function(){
    return this.schemaTag;
};

SedonaAppTagClass.prototype.setSchemaTag = function(schemaTag){
    this.schemaTag = schemaTag;
};

SedonaAppTagClass.prototype.getAppTag = function(){
    return this.appTag;
};

SedonaAppTagClass.prototype.setAppTag = function(appTag){
    this.appTag = appTag;
};

SedonaAppTagClass.prototype.getLinksTag = function(){
    return this.linksTag;
};

SedonaAppTagClass.prototype.setLinksTag = function(linksTag){
    this.linksTag = linksTag;
};

SedonaAppTagClass.prototype.generateTag = function(){
    var startTag = "<"+this.tagName+">\n";
    var inTag = "";
    inTag += this.schemaTag.generateTag();
    inTag += this.appTag.generateTag();
    inTag += this.linksTag.generateTag();
    var stopTag = "</"+this.tagName+">";
    return startTag+inTag+stopTag;
}

module.exports = SedonaAppTagClass;