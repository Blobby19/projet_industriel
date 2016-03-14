/**
 * Created by Fedora on 10/03/2016.
 *
 *
 */

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

module.exports = KitTagClass;