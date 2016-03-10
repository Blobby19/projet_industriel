/**
 * Created by Fedora on 10/03/2016.
 *
 * Classe générique pour tout les components Sedona
 */

var TagClass = require('./TagClass');

var CompTagClass = function(name, type){
    TagClass.call(this, "comp");
    if(name.length > 7){
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
};

CompTagClass.prototype = Object.create(TagClass.prototype);
CompTagClass.prototype.constructor = CompTagClass;

CompTagClass.prototype = new TagClass("comp");

module.exports = CompTagClass;