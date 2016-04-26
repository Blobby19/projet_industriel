/**
 * Created by Fedora on 14/03/2016.
 */

var Logger = require(__dirname+'\\fr.itv95.logger\\LoggerClass.js')('Application');

var SedonaAppTagClass = require(__dirname+'\\fr.itv95.class\\SedonaAppTagClass.js');
var CompTagClass = require(__dirname+'\\fr.itv95.class\\CompTagClass.js');
var PropTagClass = require(__dirname+'\\fr.itv95.class\\PropTagClass.js');
var LinkTagClass = require(__dirname+'\\fr.itv95.class\\LinkTagClass.js');
var KitTagClass = require(__dirname+'\\fr.itv95.class\\KitTagClass.js');

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
        /*console.log(configuration);
        this.createApp(configuration.configuration[0].application_name, configuration.configuration[0].device_name);
        this.createService();
        if(configuration.inputs.length>0 && configuration.outputs.length>0){
            this.createApplication(configuration.inputs, configuration.outputs, templates);
            //this.createApplication(__dirname+"\\..\\templates\\template_regulation.json");
        }
        var tag = this.sedonaApp.generateTag();
        console.log(tag);*/
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
    //console.log(file.objects.childrens);
    var templateObject = new TemplateClass(file.name, file.description, file.objects.childrens, file.objects.links, this.compId);
    templateObject.generateTemplate(folder);
    folder.addChildren(templateObject);
    this.sedonaApp.appTag.addChildren(folder);
    console.log(this.sedonaApp.generateTag());
};

Application.prototype.generateProgram = function(){
    var file = "";
    file+="<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";
    this.getAllManifestsDependancies(this.sedonaApp);

};

/**
 * Retourne tout les types utilisés
 * @param obj
 * @returns {*}
 */
Application.prototype.getAllManifestsDependancies = function(obj){
    //TODO: Finir cette fonction récursive
    var kits = Array();
    for(key in obj){
        console.log(typeof(obj[key]));
        if(obj[key] instanceof Object){
            if(obj[key].type !== undefined){
                console.log(obj[key].type);
                var kit = obj[key].type.replace(/::.+/gi, '');
                var present = false;
                for(var i = 0; i<kits.length; i++){
                    if(kit===kits[i]){
                        present = false;
                        break;
                    }
                    present = true;
                }
                if(present || kits.length == 0) kits.push(kit);
                console.log(kits);
                return;
            }
            else{
                this.getAllManifestsDependancies(obj[key]);
            }
        }
        else if(obj[key] instanceof Array){
            this.getAllManifestsDependancies(obj[key]);
        }
        else if(obj[key] instanceof Function){
            return;
        }
        /*if(obj[key] instanceof Object && !(obj[key] instanceof Array)){
            console.log(obj[key]);
        }
        else if((obj[key] instanceof Array)) {
            obj[key].forEach(function(obj){
                obj = replaceDynamically(obj, arg, valid);
            });
        }
        else return obj;*/
    }
    return obj;

};

module.exports = Application;