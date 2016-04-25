/**
 * Created by Luc on 04/04/2016.
 */


var expect = require('chai').expect;
var TagClass = require(__dirname+'/../../assets/fr.itv95.class/TagClass.js');
var Application = require(__dirname+'/../../assets/Application.js');
var CompTagClass = require(__dirname+'/../../assets/fr.itv95.class/CompTagClass.js');
var PropTagClass = require(__dirname+'/../../assets/fr.itv95.class/PropTagClass.js');
var SedonaAppTagClass = require(__dirname+'/../../assets/fr.itv95.class/SedonaAppTagClass.js');

var compTag = null;
var propTag = null;
var sedonaAppTag = null;

describe('Test Tags Class', function(){

    var application = null;

    before(function(){
        application = new Application();
        //console.log(application);
    });

    it('create application correctly', function(){
        expect(application).to.not.equal(null);
        expect(application).to.have.property('compId').to.equal(0);
        expect(application).to.deep.property('sedonaApp.tagName').to.equal('sedonaApp');
        expect(application).to.deep.property('sedonaApp.schemaTag.tagName').to.equal('schema');
        expect(application).to.deep.property('sedonaApp.appTag.tagName').to.equal('app');
        expect(application).to.deep.property('sedonaApp.linksTag.tagName').to.equal('links');
    });

    it('create application details', function(){
        expect(application.sedonaApp.appTag).to.not.equal(null);
        expect(application.sedonaApp.appTag.childrens).to.have.property('length');
        var count = application.sedonaApp.appTag.childrens.length;
        application.createApp("Test", "SCC-410M");
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].name').to.equal('deviceName');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].val').to.equal('SCC-410M');
        count++;
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].name').to.equal('appName');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].val').to.equal('Test');
        count++;
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].name').to.equal('scanPeriod');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].val').to.equal('100');
    });

    it('create service and add to appTag correctly', function(){
        expect(application.sedonaApp.appTag).to.not.equal(null);
        expect(application.sedonaApp.appTag.childrens).to.have.property('length');
        var count = application.sedonaApp.appTag.childrens.length;

        application.createService();
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].name').to.equal('service');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].name').to.equal('plat');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].type').to.equal('SysMikPlatScc41xm::SccPlatformService');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].name').to.equal('users');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].type').to.equal('sys::UserService');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].childrens[0].name').to.equal('admin');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].childrens[0].childrens[0].name').to.equal('cred');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].childrens[0].childrens[1].name').to.equal('perm');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].childrens[0].childrens[1].tagName').to.equal('prop');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[2].name').to.equal('sox');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[2].type').to.equal('sox::SoxService');
    });

    it('adding inputs and input folder in appTag', function(){
        var inputs = [{
            "channel":"0",
            "name":"Entree1",
            "type":"analog"
        },{
            "channel":"1",
            "name":"Entree2",
            "type":"digital"
        }];
        expect(application.sedonaApp.appTag).to.not.equal(null);
        expect(application.sedonaApp.appTag.childrens).to.have.property('length');
        var count = application.sedonaApp.appTag.childrens.length;
        application.addInputsFolder(inputs);
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].tagName').to.equal('comp');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].name').to.equal('Inputs');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].name').to.equal('Entree1');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].type').to.equal('SysMikPlatScc41xm::IoAI');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].childrens[0].val').to.equal('0');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].name').to.equal('Entree2');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].type').to.equal('SysMikPlatScc41xm::IoDI');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].childrens[0].val').to.equal('1');
    });

    it('create outputs and output folder in appTag', function(){
        var outputs = [{
           "channel":"0",
           "name":"Sortie1",
           "type":"analog"
       },{
           "channel":"1",
           "name":"Sortie2",
           "type":"digital"
       }];
        expect(application.sedonaApp.appTag).to.not.equal(null);
        expect(application.sedonaApp.appTag.childrens).to.have.property('length');
        var count = application.sedonaApp.appTag.childrens.length;
        application.addOutputsFolder(outputs);
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].tagName').to.equal('comp');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].name').to.equal('Outputs');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].name').to.equal('Sortie1');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].type').to.equal('SysMikPlatScc41xm::IoAO');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].childrens[0].tagName').to.equal('prop');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[0].childrens[0].val').to.equal('0');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].name').to.equal('Sortie2');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].type').to.equal('SysMikPlatScc41xm::IoDO');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].childrens[0].tagName').to.equal('prop');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].childrens[1].childrens[0].val').to.equal('1');
    });

    it('add template to appTag', function(){
        var template = {
                "name":"template_regulation",
                "folder_name":"Hiver"
            };
        expect(application.sedonaApp.appTag).to.not.equal(null);
        expect(application.sedonaApp.appTag.childrens).to.have.property('length');
        var count = application.sedonaApp.appTag.childrens.length;
        application.addTemplate(template);
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].tagName').to.equal('comp');
        expect(application.sedonaApp.appTag).to.deep.property('childrens['+count+'].name').to.equal(template.folder_name);
    });

    /*
    it('create comp tag should return name, type & id', function(){
        compTag = new CompTagClass("input", "sys::User", 0);
        expect(compTag.name).to.equal('input');
        expect(compTag.type).to.equal('sys::User');
        expect(compTag.id).to.equal(0);
    });

    it('create prop tag should return name & val', function(){
        propTag = new PropTagClass("name", "value");
        expect(propTag.name).to.equal('name');
        expect(propTag.val).to.equal('value');
    });

    it('create sedona tag should return schemaTag, appTag & linksTag', function(){
        sedonaAppTag = new SedonaAppTagClass();
        expect((sedonaAppTag.schemaTag instanceof TagClass)).to.equal(true);
        expect((sedonaAppTag.appTag instanceof TagClass)).to.equal(true);
        expect((sedonaAppTag.linksTag instanceof TagClass)).to.equal(true);
    });

    it('add property to component should return array of props', function(){
        expect(compTag).to.not.equal(null);
        compTag.addChildren(propTag);
        expect(compTag.childrens).to.be.a('array').and.have.length(1);
        compTag.addChildren(propTag);
        expect(compTag.childrens).to.be.a('array').and.have.length(2).to.include(propTag);
    });

    it('add component to appTag should retrun array of components & props', function(){
        expect(sedonaAppTag).to.not.equal(null);
        sedonaAppTag.appTag.addChildren(propTag);
        expect(sedonaAppTag.appTag.childrens).to.be.a('array').and.have.length(1);
        sedonaAppTag.appTag.addChildren(compTag);
        expect(sedonaAppTag.appTag.childrens).to.be.a('array').and.have.length(2).to.include(compTag).and.to.include(propTag);
        expect(sedonaAppTag.generateTag()).to.contain('<comp name="input" type="sys::User" >');
        expect(sedonaAppTag.generateTag()).to.contain('<prop name="name" val="value"/>');
    });

    it('verify sedonaAppTag correctly generated', function(){
        expect(sedonaAppTag.generateTag()).to.contain('<comp name="input" type="sys::User" >');
        expect(sedonaAppTag.generateTag()).to.contain('<prop name="name" val="value"/>');
    });
    */

});