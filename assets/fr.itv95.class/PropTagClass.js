/**
 * Created by Fedora on 10/03/2016.
 */

var TagClass = require('./TagClass');

var PropTagClass = function(name, val){
    TagClass.call(this, "prop");
    if(name.length > 7){
        //TODO: Vérifie si le nom est inférieur à 7 caractères
    }
    else
        this.name = name;

    this.val = val;
};

PropTagClass.prototype = Object.create(TagClass.prototype);
PropTagClass.prototype.constructor = PropTagClass;

PropTagClass.prototype = new TagClass("prop");

PropTagClass.prototype.getName = function(){
    return this.name;
};

PropTagClass.prototype.setName = function(name){
    this.name = name;
};

PropTagClass.prototype.getVal = function(){
    return this.val;
};

PropTagClass.prototype.setVal = function(val){
    this.val = val;
};

PropTagClass.prototype.generateTag = function(){
    var string = "<prop ";
    if(this.name!=null && this.name!="")
        string+="name=\""+this.name+"\" ";
    if(this.val!=null && this.val!="")
        string+="val=\""+this.val+"\"";
    string+="/>\n";
    return string;
};

module.exports = PropTagClass;