/**
 * Created by Fedora on 11/03/2016.
 */


var ManifestClass = function(name, description, vendor, version, hasNatives, checksum, depends, types){
    this.name = name;
    this.description = description;
    this.vendor = vendor;
    this.version = version;
    this.hasNatives = hasNatives;
    this.checksum = checksum;
    this.listOfDependencies = ((depends!==undefined && depends!== null && depends instanceof Array) && depends.length>0)?depends:new Array;
    this.listOfTypes = ((types!==undefined && types!==null && types instanceof Array) && types.length>0)?types:new Array;
};

ManifestClass.prototype.getName = function(){
    return this.name;
};

ManifestClass.prototype.setName = function(name){
    this.name = name;
};

ManifestClass.prototype.getDescription = function(){
    return this.description;
};

ManifestClass.prototype.setDescription = function(description){
    this.description = description;
};

ManifestClass.prototype.getVendor = function(){
    return this.vendor;
};

ManifestClass.prototype.setVendor = function(vendor){
    this.vendor = vendor;
};

ManifestClass.prototype.getHasNatives = function(){
    return this.hasNatives;
};

ManifestClass.prototype.setHasNatives = function(hasNatives){
    this.hasNatives = hasNatives;
};

ManifestClass.prototype.getChecksum = function(){
    return this.checksum;
};

ManifestClass.prototype.setChecksum = function(checksum){
    this.checksum = checksum;
};

ManifestClass.prototype.getDependances = function(){
    return this.listOfDependencies;
};

ManifestClass.prototype.setDependencies = function(dependencies){
    this.listOfDependencies = dependencies;
};

ManifestClass.prototype.addDependancy = function(dependancy){
    this.listOfDependencies.push(dependancy);
};

ManifestClass.prototype.getTypes = function(){
    return this.listOfTypes;
};

ManifestClass.prototype.setTypes = function(types){
    this.listOfTypes = types;
};

ManifestClass.prototype.addType = function(type){
    this.listOfTypes.push(type);
};

module.exports = ManifestClass;