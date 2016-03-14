/**
 * Created by Fedora on 10/03/2016.
 *
 * Classe générique pour tout les components Sedona
 */

var TagClass = require('./TagClass');

var CompTagClass = function(name, type, id){
    TagClass.call(this, "comp");
    if(name.length < 0){
        //TODO: Vérifie si le name est supérieur à 7 caractères.
    }
    else
        this.name = name;

    if(type === undefined || type === null){
        //TODO: Lâche exception si non déclaré
    }
    else
    {
        this.type = type;
    }

    this.id = id;
};

CompTagClass.prototype = Object.create(TagClass.prototype);
CompTagClass.prototype.constructor = CompTagClass;

CompTagClass.prototype = new TagClass("comp");

CompTagClass.prototype.getName = function(){
    return this.name;
};

CompTagClass.prototype.setName = function(name){
    this.name = name;
};

CompTagClass.prototype.getType = function(){
    return this.type;
};

CompTagClass.prototype.setType = function(type){
    this.type = type;
};

CompTagClass.prototype.generateTag = function(){
    var startTag = "<comp ";
    if(this.name!=null && this.name != "")
        startTag+="name=\""+this.name+"\" ";
    if(this.type!=null && this.type!="")
        startTag+="type=\""+this.type+"\" ";
    if(this.id!=null && this.id!="")
        startTag+="id=\""+this.id+"\"";
    startTag+=">\n";
    var inTag = "";
    if(this.childrens != undefined || this.childrens.length>0){
        for(key in this.childrens){
            console.log(this.childrens[key]);
            if(this.childrens[key] instanceof TagClass)
                inTag += this.childrens[key].generateTag();
        }
    }

    var stopTag = "</"+this.tagName+">\n";
    var tag = startTag+inTag+stopTag;
    return tag;
};

module.exports = CompTagClass;