/**
 * Created by Fedora on 11/03/2016.
 */

var ManifestSlotClass = function(name, id, _default, flags, type, facets){
    this.name = name;
    this.id = id;
    this._default = _default;
    this.flags = flags;
    this.type = type;
    //this.listOfFacets = (facets!=undefined&&facets!=null)?facets:new Array;
};

ManifestSlotClass.prototype.getName = function(){
    return this.name;
};

ManifestSlotClass.prototype.setName = function(name){
    this.name = name;
};

ManifestSlotClass.prototype.getId = function(){
    return this.id;
};

ManifestSlotClass.prototype.setId = function(id){
    this.id = id;
};

ManifestSlotClass.prototype.getDefault = function(){
    return this._default;
};

ManifestSlotClass.prototype.setDefault = function(_default){
    this._default = _default;
};

ManifestSlotClass.prototype.getFlags = function(){
    return this.flags;
};

ManifestSlotClass.prototype.setFlags = function(flags){
    this.flags = flags;
};

ManifestSlotClass.prototype.getType = function(){
    return this.type;
};

ManifestSlotClass.prototype.setType = function(type){
    this.type = type;
};

ManifestSlotClass.prototype.getFacets = function(){
    return this.listOfFacets;
};

ManifestSlotClass.prototype.setFacets = function(facets){
    this.listOfFacets = facets;
};

ManifestSlotClass.prototype.addFacet = function(facet){
    this.listOfFacets.push(facet);
};

module.exports = ManifestSlotClass;