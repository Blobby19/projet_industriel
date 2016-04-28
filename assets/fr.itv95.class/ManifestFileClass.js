/**
 * Created by Luc on 28/04/2016.
 */

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('ManifestFileClass');
var fs = require('fs');

var ManifestFileClass = function(){
    this.file = __dirname+"\\..\\fr.itv95.db\\manifest.xml";
};

ManifestFileClass.prototype.generate = function(filePath){
    Logger.info('generate');
    try{
        var file = fs.readFileSync(this.file);
        var directoryexist = fs.accessSync(filePath+"/meta-inf", fs.F_OK);
        console.log('generate');
        console.log(directoryexist);
    }
    catch(ex){
        Logger.error(ex.message);
        if(ex.code == 'ENOENT')
            fs.mkdirSync(filePath+"/meta-inf");
    }
    finally{
        fs.writeFileSync(filePath+"/meta-inf/manifest.xml", file);
    }
};

module.exports = ManifestFileClass;