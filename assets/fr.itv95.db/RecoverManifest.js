/**
 * Created by Fedora on 14/03/2016.
 */

var fs = require('fs');
var ManifestClass = require(__dirname+'\\..\\fr.itv95.manifests\\ManifestClass.js');

var Logger = require(__dirname+'\\..\\fr.itv95.logger\\LoggerClass.js')('RecoverManifest');

var RecoverManifest = function(){
    Logger.info('RecoverManifest');
    try{
        var retour = new Array;
        var files = fs.readdirSync(__dirname);
        for(var i = 0; i<files.length; i++){
            if(files !== "RecoverManifest") {
                var file = fs.readFileSync(__dirname + "\\" + files[i]);
            }
        }
    }
    catch(ex) {
        Logger.error(ex.message);
    }
};

module.exports = RecoverManifest;