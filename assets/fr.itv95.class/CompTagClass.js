/**
 * Created by Fedora on 10/03/2016.
 *
 * Classe g�n�rique pour tout les components Sedona
 */

var TagClass = require('./TagClass');

var CompTagClass = function(name, type){
    TagClass.call(this, "comp");
    if(name.length > 7){
        //TODO: V�rifie si le name est sup�rieur � 7 caract�res.
    }
    else
        this.name = name;

    if(type === undefined || type === null){
        //TODO: L�che exception si non d�clar�
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