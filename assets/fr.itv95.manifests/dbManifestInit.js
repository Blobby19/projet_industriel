/**
 * Created by Fedora on 11/03/2016.
 */

var fs = require('fs');

var xml2js = require('xml2js');

var Logger = require('..\\fr.itv95.logger\\LoggerClass.js')('dbManifest');

var dbManifestInit = function(srcDir, destDir){
    this.srcDir = (srcDir!=null && srcDir!="")?srcDir:"C:\\Users\\Fedora\\Documents\\Developpement\\projet_industriel\\manifests";
    this.destDir = (destDir!=null && destDir!="")?destDir:"C:\\Users\\Fedora\\Documents\\Developpement\\projet_industriel\\app\\assets\\fr.itv95.db";
    this.parseManifests();
};

dbManifestInit.prototype.parseManifests = function(){
    Logger.info("parseManifests");
    try{
        if(verifyDir(this.srcDir)){
            var dirs = getDirectoriesInDirectory(this.srcDir);
            for(var i = 0; i<dirs.length; i++){
                var files = getFilesInDirectory(dirs[i]);
            }
        }
    }
    catch(e){
        Logger.error(ex.message);
        return;
    }

};

var verifyDir = function(url){
    Logger.info("verifyDir");
    try{
        var status = fs.statSync(url);
        if(status.isDirectory())
            return true;
        else return false;
    }
    catch(ex){
        Logger.error(ex.message);
        return false;
    }
};

var getDirectoriesInDirectory = function(url){
    Logger.info("getDirectoriesInDirectory");
    var retour = new Array;
    try{
        var pseudoDirs = fs.readdirSync(url);
        for(var i = 0; i<pseudoDirs.length; i++){
            var string = url + "\\"+pseudoDirs[i];
            if(verifyDir(string)){
                retour.push(string);
            }
        }
        return retour;
    }
    catch(ex){
        Logger.error(ex.message);
    }
};

var verifyFile = function(url){
    Logger.info("verifyFile");
    try{
        var status = fs.statSync(url);
        if(status.isFile())
            return true;
        else return false;
    }
    catch(ex){
        Logger.error(ex.message);
        return false;
    }
};

var getFilesInDirectory = function(url){
    Logger.info("getFilesInDirectory");
    var retour = new Array;
    try{
        var pseudoFiles = fs.readdirSync(url);
        for(var i = 0; i<pseudoFiles.length; i++){
            var string = url + "\\" + pseudoFiles[i];
            if(verifyFile(string))
                retour.push(string);
        }
        return retour;
    }
    catch(ex){
        Logger.error(ex.message);
        return null;
    }
};

module.exports = dbManifestInit;