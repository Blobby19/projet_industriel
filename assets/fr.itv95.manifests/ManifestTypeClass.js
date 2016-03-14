/**
 * Created by Fedora on 11/03/2016.
 */

var ManifestSlotClass = require(__dirname+'\\ManifestSlotClass.js');

var ManifestTypeClass = function(name, base, sizeof, id, slots) {
    this.name = name;
    this.base = base;
    this.sizeof = sizeof;
    this.id = id;
    //console.log(slots);
    this.listOfSlots = this.makeSlots(slots);
    //this.listOfSlots = (slots!=undefined && slot != null)?slots:new Array;
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

ManifestTypeClass.prototype.makeSlots = function(slots){
    var retour = new Array;
    if(slots!=undefined && slots.length>0){
        for(var i = 0; i<slots.length; i++){
            var thisSlot = new ManifestSlotClass(
                slots[0].attr.name,
                slots[0].attr.id,
                slots[0].attr.default != undefined ? slots[0].attr.default : undefined,
                slots[0].attr.flags != undefined ? slots[0].attr.flags : undefined,
                slots[0].attr.type
            );
            retour.push(thisSlot);
        }
    }
    return retour;
};

module.exports = ManifestTypeClass;