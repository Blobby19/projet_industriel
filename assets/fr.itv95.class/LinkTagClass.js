/**
 * Created by Fedora on 10/03/2016.
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('LinkTagClass');
var TagClass = require('./TagClass');

/**
 * Constructeur de l'objet LinkTagClass
 * @param from
 * @param to
 * @constructor
 */
var LinkTagClass = function(from, to){
    TagClass.call(this, "link");
    //TODO: Vérifie si l'ID de from existe.
    //TODO: Vérifie si l'ID de to existe.
    this.from = from;
    this.to = to;
};

LinkTagClass.prototype = Object.create(TagClass.prototype);
LinkTagClass.prototype.constructor = LinkTagClass;

LinkTagClass.prototype = new TagClass("links");

/**
 * getFrom
 * @returns {*}
 */
LinkTagClass.prototype.getFrom = function(){
    return this.from;
};

/**
 * setFrom
 * @param from
 */
LinkTagClass.prototype.setFrom = function(from){
    //TODO: Vérifie si l'ID de from existe.
    this.from = from;
};

/**
 * getTo
 * @returns {*}
 */
LinkTagClass.prototype.getTo = function(){
    return this.to;
};

/**
 * setTo
 * @param to
 */
LinkTagClass.prototype.setTo = function(to){
    //TODO: Vérifie si l'ID de to existe.
    this.to = to;
};

module.exports = LinkTagClass;