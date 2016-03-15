/**
 * Created by Fedora on 11/03/2016.
 */

var Logger = require(__dirname+"\\..\\fr.itv95.logger\\LoggerClass.js")("ManifestClass");
var ManifestTypeClass = require(__dirname+'\\ManifestTypeCLass.js');

var fs = require('fs');

var ManifestClass = function(name, description, vendor, version, hasNatives, checksum, depends, types){
    this.name = name;
    this.description = description;
    this.vendor = vendor;
    this.version = version;
    this.hasNatives = hasNatives;
    this.checksum = checksum;
    this.listOfDependencies = ((depends!==undefined && depends!== null && depends instanceof Array) && depends.length>0)?depends:new Array;
    //On sait que les données que l'on reçoit dans types ne sont pas bon donc on les convertis
    this.listOfTypes = this.makeTypes(types);
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

ManifestClass.prototype.makeTypes = function(types){
    try{
        var retour = new Array;
        if(types != undefined){
            //fs.writeFileSync(__dirname+"\\test.json", JSON.stringify(types));
            for(var i =0; i<types.length; i++){
                var thisType = new ManifestTypeClass(
                    types[i].attr.name,
                    types[i].attr.base,
                    types[i].attr.sizeof,
                    types[i].attr.id,
                    (types[i].slot!=undefined)?types[i].slot:undefined);
                retour.push(thisType);
            }
        }
        return retour;
    }
    catch(ex){
        Logger.error(ex.message);
        return;
    }
};

module.exports = ManifestClass;