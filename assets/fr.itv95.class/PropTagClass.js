/**
 * Created by Fedora on 10/03/2016.
 */

var TagClass = require('./TagClass');

/**
 * Constructeur de la classe PropTagClass
 * @param name
 * @param val
 * @constructor
 */
var PropTagClass = function(name, val){
    TagClass.call(this, "prop");
    this.name = name;

    this.val = val;
};

PropTagClass.prototype = Object.create(TagClass.prototype);
PropTagClass.prototype.constructor = PropTagClass;

PropTagClass.prototype = new TagClass("prop");

/**
 * getName
 * @returns {*}
 */
PropTagClass.prototype.getName = function(){
    return this.name;
};

/**
 * setName
 * @param name
 */
PropTagClass.prototype.setName = function(name){
    this.name = name;
};

/**
 * getVal
 * @returns {*}
 */
PropTagClass.prototype.getVal = function(){
    return this.val;
};

/**
 * setVal
 * @param val
 */
PropTagClass.prototype.setVal = function(val){
    this.val = val;
};

/**
 * Permet de g�n�rer le tag de l'objet
 * @returns {string}
 */
PropTagClass.prototype.generateTag = function(){
    var string = "<prop ";
    if(this.name!=null && this.name!="")
        string+="name=\""+this.name+"\" ";
    if(this.val!=null && this.val!="")
        string+="val=\""+this.val+"\"";
    string+="/>\n";
    return string;
};

module.exports = PropTagClass;