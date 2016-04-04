/**
 * Created by Luc on 04/04/2016.
 */


var expect = require('chai').expect;
var TagClass = require(__dirname+'/../../assets/fr.itv95.class/TagClass.js');
var CompTagClass = require(__dirname+'/../../assets/fr.itv95.class/CompTagClass.js');
var PropTagClass = require(__dirname+'/../../assets/fr.itv95.class/PropTagClass.js');
var SedonaAppTagClass = require(__dirname+'/../../assets/fr.itv95.class/SedonaAppTagClass.js');

var compTag = null;
var propTag = null;
var sedonaAppTag = null;

describe('Test Tags Class', function(){
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
});