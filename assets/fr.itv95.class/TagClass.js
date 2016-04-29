/**
 * Created by Fedora on 10/03/2016.
 */

var Logger = require(__dirname+'\\..\\fr.itv95.logger\\LoggerClass.js')('TagClass');

var TagClass = function(tagName, listOfAttributes, childrens, path){
    Logger.info('Constructeur');
    this.tagName = tagName;
    this.listOfAttributes = (listOfAttributes != undefined && listOfAttributes !=null)?listOfAttributes: new Array;
    this.childrens = (childrens != undefined && childrens !== null)?childrens:new Array;
    this.path = (path !== undefined)?path:null;
};

TagClass.prototype.getTagName = function(){
    Logger.info('getTagName');
    return this.tagName;
};

TagClass.prototype.setTagName = function(tag){
    Logger.info('setTagName');
    this.tagName = tagName;
};

TagClass.prototype.getListOfAttributes = function(){
    Logger.info('getListOfAttributes');
    return this.listOfAttributes;
};

TagClass.prototype.setListOfAttributes = function(listOfAttributes){
    Logger.info('setListOfAttributes');
    this.listOfAttributes = listOfAttributes;
};

TagClass.prototype.addAttribute = function(attribute){
    Logger.info('addAttribute');
    this.listOfAttributes.push(attribute);
};

TagClass.prototype.getChildrens = function(){
    Logger.info('getChildrens');
    return this.childrens;
};

TagClass.prototype.setChildrens = function(childrens){
    Logger.info('setChildrens');
    this.childrens = childrens;
};

TagClass.prototype.addChildren = function(children){
    Logger.info('addChildren');
    this.childrens.push(children);
};

TagClass.prototype.getPath = function(){
    Logger.info('getPath');
    return this.path;
};

TagClass.prototype.setPath = function(path){
    Logger.info('setPath');
    this.path = path;
};

TagClass.prototype.generateTag = function(){
    Logger.info('generateTag');
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