/**
 * Created by Luc on 28/04/2016.
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('SCodeDependTagClass');
var TagClass = require('./TagClass');

var SCodeDependTagClass = function(name, version){
    TagClass.call(this, "depend");
    this.name = name;
    this.version = version;
};

SCodeDependTagClass.prototype = Object.create(TagClass.prototype);
SCodeDependTagClass.prototype.constructor = SCodeDependTagClass;

SCodeDependTagClass.prototype.generateTag = function(){
    Logger.info('generateTag');
    var startTag = "<depend ";
    var inTag = "on=\""+this.name+" "+this.version+"\"";
    var stopTag = "/>\n";
    return startTag+inTag+stopTag;
};

module.exports = SCodeDependTagClass;