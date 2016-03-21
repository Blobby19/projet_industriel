/**
 * Created by Fedora on 10/03/2016.
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('PropTagClass');
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
 * Permet de générer le tag de l'objet
 * @returns {string}
 */
PropTagClass.prototype.generateTag = function(){
    try{
        var string = "<prop ";
        if(this.name!=null && this.name!="")
            string+="name=\""+this.name+"\" ";
        if(this.val!=null && this.val!="")
            string+="val=\""+this.val+"\"";
        string+="/>\n";
        return string;
    }
    catch(ex.message){
        Logger.error(ex.message);
    }
};

module.exports = PropTagClass;