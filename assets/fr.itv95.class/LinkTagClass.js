/**
 * Created by Fedora on 10/03/2016.
 */

var TagClass = require('./TagClass');

var LinkTagClass = function(from, to){
    TagClass.call(this, "link");
    //TODO: Vérifie si l'ID de from existe.
    //TODO: Vérifie si l'ID de to existe.
    this.from = from;
    this.to = to;
};

LinkTagClass.prototype = Object.create(TagClass.prototype);
LinkTagClass.prototype.constructor = LinkTagClass;

LinkTagClass.prototype.from = "";
LinkTagClass.prototype.to = "";

LinkTagClass.prototype = new TagClass("links");

LinkTagClass.prototype.getFrom = function(){
    return this.from;
};

LinkTagClass.prototype.setFrom = function(from){
    //TODO: Vérifie si l'ID de from existe.
    this.from = from;
};

LinkTagClass.prototype.getTo = function(){
    return this.to;
};

LinkTagClass.prototype.setTo = function(to){
    //TODO: Vérifie si l'ID de to existe.
    this.to = to;
};

module.exports = LinkTagClass;