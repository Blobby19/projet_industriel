/**
 * Created by Fedora on 14/03/2016.
 */

var fs = require('fs');
var ManifestClass = require(__dirname+'\\..\\fr.itv95.manifests\\ManifestClass.js');

var RecoverManifest = function(){
    var retour = new Array;
    var files = fs.readdirSync(__dirname);
    for(var i = 0; i<files.length; i++){
        if(files !== "RecoverManifest")
        var file = fs.readFileSync(folder)
    }
};

module.exports = RecoverManifest;