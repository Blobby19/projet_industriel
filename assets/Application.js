/**
 * Created by Fedora on 14/03/2016.
 */

var Logger = require(__dirname+'\\fr.itv95.logger\\LoggerClass.js')('Application');

var SedonaAppTagClass = require(__dirname+'\\fr.itv95.class\\SedonaAppTagClass.js');
var CompTagClass = require(__dirname+'\\fr.itv95.class\\CompTagClass.js');
var PropTagClass = require(__dirname+'\\fr.itv95.class\\PropTagClass.js');
var LinkTagClass = require(__dirname+'\\fr.itv95.class\\LinkTagClass.js');
var KitTagClass = require(__dirname+'\\fr.itv95.class\\KitTagClass.js');
var TagClass = require(__dirname+'\\fr.itv95.class\\TagClass.js');

var TemplateClass = require(__dirname+'\\fr.itv95.template\\TemplateClass.js');

var fs = require('fs');

/**
 * Constructeur de la classe
 * @param appName
 * @param jsonProperties
 * @constructor
 */
var Application = function(){
    Logger.info("Creation de l'application");
    try{
        this.compId = 0;
        this.sedonaApp = new SedonaAppTagClass();
        this.linksArray = new Array();
        this.kits = new Array();
        this.templates = new Array();
    }
    catch(ex){
        Logger.error(ex.message);
    }
};

/**
 * Ajoute les paramètres de l'application
 * @param appName
 */
Application.prototype.createApp = function(appName, deviceName){
    Logger.info("createApp");
    var deviceNameProp = new PropTagClass("deviceName", deviceName);
    var appNameProp = new PropTagClass("appName", appName);
    var scanPeriod = new PropTagClass("scanPeriod", "100");
    this.sedonaApp.appTag.addChildren(deviceNameProp);
    this.sedonaApp.appTag.addChildren(appNameProp);
    this.sedonaApp.appTag.addChildren(scanPeriod);
};

/**
 * Ajoute les différents services indispensables
 */
Application.prototype.createService = function(){
    Logger.info("createService");
    var service = new CompTagClass("service", "sys::Folder", ++this.compId);
    var platService = new CompTagClass("plat", "SysMikPlatScc41xm::SccPlatformService", ++this.compId);
    var userService = new CompTagClass("users", "sys::UserService", ++this.compId);
    var user = new CompTagClass("admin", "sys::User", ++this.compId);
    user.addChildren(new PropTagClass("cred", "hE49ksThgAeLkWB3NUU1NWeDO54="));
    user.addChildren(new PropTagClass("perm", "2147483647"));
    user.addChildren(new PropTagClass("prov", "255"));
    userService.addChildren(user);
    var soxService = new CompTagClass("sox", "sox::SoxService", ++this.compId);
    service.addChildren(platService);
    service.addChildren(userService);
    service.addChildren(soxService);
    this.sedonaApp.appTag.addChildren(service);
};

/**
 * Permet de créer un dossier dans le sax
 * @param name
 * @returns {*|Object}
 */
Application.prototype.createFolder = function(name){
    if(name !== undefined){
        return new CompTagClass(name, "sys::Folder", ++this.compId);
    }
};

/**
 * Create Input Folder and inputs variables
 * @param inputs
 */
Application.prototype.addInputsFolder = function(inputs){
    var folder = this.createFolder("Inputs");
    var self = this;
    if(inputs instanceof Array){
        inputs.forEach(function(input){
            var channel = null;
            var object = null;

            if(input.channel === "")
                channel = new PropTagClass("channel", 0);
            else
                channel = new PropTagClass("channel", input.channel);

            if(input.type === 'analog')
                object = new CompTagClass(input.name, "SysMikPlatScc41xm::IoAI", ++self.compId);
            else
                object = new CompTagClass(input.name, "SysMikPlatScc41xm::IoDI", ++self.compId);
            object.addChildren(channel);
            folder.addChildren(object);
        });
    }
    this.sedonaApp.appTag.addChildren(folder);
};

/**
 * Create Output Folder and outputs variables
 * @param outputs
 */
Application.prototype.addOutputsFolder = function(outputs){
    var folder = this.createFolder('Outputs');
    var self = this;
    if(outputs instanceof Array){
        outputs.forEach(function(output){
            var channel = null;
            var object = null;

            if(output.channel === "")
                channel = new PropTagClass("channel", 0);
            else
                channel = new PropTagClass("channel", output.channel);

            if(output.type === 'analog')
                object = new CompTagClass(output.name, "SysMikPlatScc41xm::IoAO", ++self.compId);
            else
                object = new CompTagClass(output.name, "SysMikPlatScc41xm::IoDO", ++self.compId);

            object.addChildren(channel);
            folder.addChildren(object);
        });
    }
    this.sedonaApp.appTag.addChildren(folder);
};

/**
 * Add Template to appTag
 * @param name
 */
Application.prototype.addTemplate = function(template){
    var folder = this.createFolder(template.folder_name);
    var file = JSON.parse(fs.readFileSync(__dirname+'\\..\\templates\\'+template.name+'.json'));
    var templateObject = new TemplateClass(file.name, file.description, file.objects.childrens, file.objects.links, this.compId);
    templateObject.generateTemplate(folder);
    folder.addChildren(templateObject);
    this.sedonaApp.appTag.addChildren(folder);
    this.templates.push(templateObject);
};

/**
 * Retourne tout les types utilisés
 * @param obj
 * @returns {*}
 */
Application.prototype.getAllManifestsDependancies = function(obj){
    var self = this;
    //TODO: Finir cette fonction récursive
    if(typeof(obj)==='object' && obj.type !== undefined){
        var kit = obj.type.replace(/::.+/gi, '');
        var present = false;
        for(var i = 0; i<this.kits.length; i++){
            if(kit === this.kits[i]){
                present = false;
                break;
            }
            present = true;
        }
        if(present || this.kits.length == 0) this.kits.push(kit);
    }
    for(key in obj){
        if(key === 'path' || key === 'parent') continue;
        if(typeof(obj[key])=== 'object'){
            if(obj[key].length === undefined){
                if(obj[key].tagName === 'prop'){
                    return;
                }
                else if(obj[key].tagName ==='comp'){
                }
                else{
                    this.getAllManifestsDependancies(obj[key]);
                }
            }
            else{
                if(obj[key].length>0){
                    obj[key].forEach(function(obj){
                        self.getAllManifestsDependancies(obj);
                    });
                    return;

                }
            }
        }
        else if(typeof(obj[key])==='string') {
            continue;
        }
        else return obj;
    }
    return;

};

/**
 * Permet de générer tous les path de chaque objet
 * @param obj
 * @param parentPath
 */
Application.prototype.updateAllPathsInAppTag = function(obj, parentPath){
    Logger.info('updateAllPathsInAppTag');
    if(parentPath === undefined) parentPath=obj.getPath();
    if(obj instanceof TagClass){
        if(obj.getPath()!== '/') parentPath = (parentPath!='/')?((obj.getTagName()!=='comp')?(parentPath+'.'+obj.getName()):(parentPath+'/'+obj.getName())):(parentPath+obj.getName());
        obj.setPath(parentPath);
        if(obj.childrens.length>0){
            for(var children in obj.childrens){
                this.updateAllPathsInAppTag(obj.childrens[children], parentPath);
            }
        }
    }
    return;
};

/**
 * Retourne un tableau avec tout les kitTags nécessaires.
 * @returns {Array}
 */
Application.prototype.makeAllKitTags = function(){
    var kitTags = new Array();
    var manifestKitTag = new Array();
    var self = this;
    if(this.kits.length>0){
        var manifests = fs.readdirSync(__dirname+'//fr.itv95.db//');
        if(manifests.length>0){
            manifests.forEach(function(manifest){
                var nomManifest = manifest.replace(/.json/gi, '');
                self.kits.forEach(function(kit){
                   if(kit === nomManifest){
                       var contentManifest = JSON.parse(fs.readFileSync(__dirname+'//fr.itv95.db//'+manifest));
                       kitTags.push(new KitTagClass(contentManifest.name, contentManifest.checksum));
                   }
                });
            });
        }
    }
    return {kitTags: kitTags, manifestKitTag: manifestKitTag};
};

/**
 * Génère le programme sax
 */
Application.prototype.generateProgram = function(){
    var self = this;
    this.getAllManifestsDependancies(this.sedonaApp);
    var kitTagsObjects = this.makeAllKitTags();
    kitTagsObjects.kitTags.forEach(function(kit){
        self.sedonaApp.schemaTag.addChildren(kit);
    });
    kitTagsObjects.manifestKitTag.forEach(function(kit){
        self.sedonaSCode.addKit(kit);
    });
    this.updateAllPathsInAppTag(this.sedonaApp.appTag);
    console.log(this.sedonaApp.appTag.childrens[6]);
    var dest = 'C:\/Users\/Luc\/WebstormProjects\/CTAMaker\/app\/result';
    fs.writeFileSync(dest+'\/testLuc.sax', this.sedonaApp.generateTag());
};

module.exports = Application;