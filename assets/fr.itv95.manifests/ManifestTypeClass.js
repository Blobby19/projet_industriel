/**
 * Created by Fedora on 11/03/2016.
 */

var ManifestTypeClass = function(name, base, sizeof, id) {
    this.name = name;
    this.base = base;
    this.sizeof = sizeof;
    this.id = id;
    this.listOfSlots = (slots!=undefined && slot != null)?slots:new Array;
};


ManifestTypeClass.prototype.getName = function(){
    return this.name;
};

ManifestTypeClass.prototype.setName = function(name){
    this.name = name;
};

ManifestTypeClass.prototype.getBase = function(){
    return this.base;
};

ManifestTypeClass.prototype.setBase = function(base){
    this.base = base;
};

ManifestTypeClass.prototype.getSizeof = function(){
    return this.sizeof;
};

ManifestTypeClass.prototype.setSizeof = function(sizeof){
    this.sizeof = sizeof;
};

ManifestTypeClass.prototype.getId = function(){
    return this.id;
};

ManifestTypeClass.prototype.setId = function(id){
    this.id = id;
};

ManifestTypeClass.prototype.getSlots = function(){
    return this.listOfSlots;
};

ManifestTypeClass.prototype.setSlots = function(slots){
    this.listOfSlots = slots;
};

ManifestTypeClass.prototype.addSlot = function(slot){
    this.listOfSlots.push(slot);
};

module.exports = ManifestTypeClass;