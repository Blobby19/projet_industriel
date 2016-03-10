/**
 * Created by Fedora on 10/03/2016.
 *
 *
 */

var TagClass = require('./TagClass');

var KitTagClass = function(name, checksum){
    TagClass.call(this, "kit");
    this.name = name;
    this.checksum = checksum;
};

KitTagClass.prototype = Object.create(TagClass.prototype);
KitTagClass.prototype.constructor = KitTagClass;

KitTagClass.prototype.name = "";
KitTagClass.prototype.checksum = "";

KitTagClass.prototype = new TagClass("kit");

KitTagClass.prototype.getName = function(){
    return this.name;
};

KitTagClass.prototype.setName = function(name){
    this.name = name;
};

KitTagClass.prototype.getChecksum = function(){
    return this.checksum;
};

KitTagClass.prototype.setChecksum = function(checksum){
    this.checksum = checksum;
};

module.exports = KitTagClass;