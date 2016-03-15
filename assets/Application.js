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
var Application = function(appName, jsonProperties){
    Logger.info("Creation de l'application");
    this.compId = 0;
    this.sedonaApp = new SedonaAppTagClass();
    this.schemaTag = this.sedonaApp.getSchemaTag();
    this.appTag = this.sedonaApp.getAppTag();
    this.linksTag = this.sedonaApp.getLinksTag();
    this.createApp(appName);
    this.createService();
    this.createApplication(__dirname+"\\..\\templates\\template_input.js");
    var tag = this.sedonaApp.generateTag();
    console.log(tag);
};

/**
 * Ajoute les paramètres de l'application
 * @param appName
 */
Application.prototype.createApp = function(appName){
    Logger.info("createApp");
    var deviceNameProp = new PropTagClass("deviceName", "SCC410");
    var appNameProp = new PropTagClass("appName", appName);
    var scanPeriod = new PropTagClass("scanPeriod", "100");
    this.appTag.addChildren(deviceNameProp);
    this.appTag.addChildren(appNameProp);
    this.appTag.addChildren(scanPeriod);
};

/**
 * Ajoute les différents services indispensables
 */
Application.prototype.createService = function(){
    Logger.info("createService");
    var service = new CompTagClass("service", "sys::Folder", ++this.compId);
    var platService = new CompTagClass("plat", "SysMikPlatScc41xm::SccPlatformService", ++this.compId);
    var userService = new CompTagClass("users", "sys::User", ++this.compId);
    userService.addChildren(new PropTagClass("cred", "hE49ksThgAeLkWB3NUU1NWeDO54="));
    userService.addChildren(new PropTagClass("perm", "2147483647"));
    userService.addChildren(new PropTagClass("prov", "255"));
    var soxService = new CompTagClass("sox", "sox::SoxService", ++this.compId);
    service.addChildren(platService);
    service.addChildren(userService);
    service.addChildren(soxService);
    this.appTag.addChildren(service);
};

/**
 * Permet de rajouter un service (ex. ModBus)
 */
Application.prototype.addService = function(){
    //TODO: Prévoir l'ajout de services
};

/**
 * Ajoute tout les éléments de la CTA
 * @param jsonProperties
 */
Application.prototype.createApplication = function(jsonProperties){
    //TODO: le jsonProperties doit contenir tout les templates à utiliser. Actuellement ne contient qu'un seul template
    Logger.info("createApplication");
    var file = JSON.parse(fs.readFileSync(jsonProperties));
    var appFolder = new CompTagClass("App", "sys::Folder", ++this.compId);
    var template = new TemplateClass(file.name, file.description, file.objects, this.compId);
    appFolder.addChildren(template);
    this.appTag.addChildren(appFolder);
};

/**
 * Permet d'ajouter un template dans le AppTag
 */
Application.prototype.addChildrenToAppTag = function(){
    //TODO: Prévoir l'ajout d'un template dans le AppTag
};

//TODO: Prévoir l'ajout des links et des kits

module.exports = Application;