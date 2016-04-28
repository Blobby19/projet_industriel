/**
 * Created by Fedora on 10/03/2016.
 *
 *
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('KitTagClass');
var TagClass = require('./TagClass');

/**
 * Constructeur de la classe KitTagClass
 * @param name
 * @param checksum
 * @constructor
 */
var KitTagClass = function(name, checksum){
    TagClass.call(this, "kit");
    this.name = name;
    this.checksum = checksum;
};

KitTagClass.prototype = Object.create(TagClass.prototype);
KitTagClass.prototype.constructor = KitTagClass;

KitTagClass.prototype = new TagClass("kit");

/**
 * getName
 * @returns {*}
 */
KitTagClass.prototype.getName = function(){
    return this.name;
};

/**
 * setName
 * @param name
 */
KitTagClass.prototype.setName = function(name){
    this.name = name;
};

/**
 * getChecksum
 * @returns {*}
 */
KitTagClass.prototype.getChecksum = function(){
    return this.checksum;
};

/**
 * setChecksum
 * @param checksum
 */
KitTagClass.prototype.setChecksum = function(checksum){
    this.checksum = checksum;
};

KitTagClass.prototype.generateTag = function(){
    try{
        var string = "<kit ";
        if(this.name!=null && this.name!="")
            string+="name=\""+this.name+"\" ";
        if(this.checksum!=null && this.checksum!="")
            string+="checksum=\""+this.checksum+"\"";
        else string+="checksum=\"0\"";
        string+="/>\n";
        return string;
    }
    catch(ex){
        Logger.error(ex.message);
    }
};

module.exports = KitTagClass;