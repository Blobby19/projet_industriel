/**
 * Created by Luc on 28/04/2016.
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('SedonaSCodeTagClass');
var TagClass = require('./TagClass');

var SCodeDependTagClass = require(__dirname+'//SCodeDependTagClass.js');

var SedonaSCodeTagClass = function(){
    TagClass.call(this, "sedonaCode");
    this.endian = "little";
    this.blockSize = 4;
    this.refSize = 4;
    this.main = "sys::Sys.main";
    this.debug = true;
    this.test = true;
    this.kits = new Array();
    this.kits.push(new SCodeDependTagClass("inet", "1.2.28"));
};

SedonaSCodeTagClass.prototype = Object.create(TagClass.prototype);
SedonaSCodeTagClass.prototype.constructor = SedonaSCodeTagClass;

SedonaSCodeTagClass.prototype.addKit = function(kit){
    this.kits.push(kit);
};

SedonaSCodeTagClass.prototype.generateTag = function(){
    Logger.info('generateTag');
    try{
        var startTag = "<"+this.tagName+"\n";
        startTag += "endian=\""+this.endian+"\"\n";
        startTag += "blockSize=\""+this.blockSize+"\"\n";
        startTag += "refSize=\""+this.refSize+"\"\n";
        startTag += "main=\""+this.main+"\"\n";
        startTag += "debug=\""+this.debug+"\"\n";
        startTag += "test=\""+this.test+"\">\n";
        var inTag ="";
        for(kit in this.kits)
            inTag += this.kits[kit].generateTag();
        var stopTag = "</"+this.tagName+">";
        return startTag+inTag+stopTag;
    }
    catch(ex){
        Logger.error(ex.message);
    }
};

module.exports = SedonaSCodeTagClass;