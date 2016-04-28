/**
 * Created by Fedora on 10/03/2016.
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('TagClass');

var TagClass = function(tagName, listOfAttributes, childrens, parent){
    this.tagName = tagName;
    this.listOfAttributes = (listOfAttributes != undefined)?listOfAttributes: new Array;
    this.childrens = (childrens != undefined)?childrens:new Array;
    this.parent = (parent!= undefined)?parent:null;
};

TagClass.prototype.getTagName = function(){
    return this.tagName;
};

TagClass.prototype.setTagName = function(tag){
    this.tagName = tagName;
};

TagClass.prototype.getListOfAttributes = function(){
    return this.listOfAttributes;
};

TagClass.prototype.setListOfAttributes = function(listOfAttributes){
    this.listOfAttributes = listOfAttributes;
};

TagClass.prototype.addAttribute = function(attribute){
    this.listOfAttributes.push(attribute);
};

TagClass.prototype.getChildrens = function(){
    return this.childrens;
};

TagClass.prototype.setChildrens = function(childrens){
    this.childrens = childrens;
};

TagClass.prototype.addChildren = function(children){
    if(children instanceof TagClass){
        children.setParent(this);
    }

    this.childrens.push(children);
};

TagClass.prototype.getParent = function(){
    return this.parent;
};

TagClass.prototype.setParent = function(parent){
    this.parent = parent;
};

TagClass.prototype.generateTag = function(){
    try{
        var startTag = "<"+this.tagName+">\n";
        var inTag = "";
        if(this.childrens != undefined || this.childrens.length>0){
            for(key in this.childrens){
                if(this.childrens[key] instanceof TagClass)
                    inTag += this.childrens[key].generateTag();
            }
        }

        var stopTag = "</"+this.tagName+">\n";
        var tag = startTag+inTag+stopTag;
        return tag;
    }
    catch(ex){
        Logger.error(ex.message);
        return;
    }
};

module.exports = TagClass;