/**
 * Created by Fedora on 11/03/2016.
 */

var ManifestFacetClass = function(type, name, val){
    this.type = type;
    this.name = name;
    this.val = val;
};

ManifestFacetClass.prototype.getType = function(){
    return this.type;
};

ManifestFacetClass.prototype.setType = function(type){
    this.type = type;
};

ManifestFacetClass.prototype.getName = function(){
    return this.name;
};

ManifestFacetClass.prototype.setName = function(name){
    this.name = name;
};

ManifestFacetClass.prototype.getVal = function(){
    return this.val;
};

ManifestFacetClass.prototype.setVal = function(val){
    this.val = val;
};

module.exports = ManifestFacetClass;

