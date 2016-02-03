/*
* Class tag xml
* TagClass.js
* Author: Luc Viala
*/

var Logger = require('./logger')('TagClass');
var builder = require('./XMLBuilderClass');


module.exports = MainTag;

var raw, name = "";
var templates = new Array();

function MainTag(name){
  this.name = name;
};

MainTag.prototype.setRaw = function(raw){
  raw = raw;
};

MainTag.prototype.getRaw = function(){
  return raw;
};

MainTag.prototype.setTemplates = function(templates){
  templates = templates;
};

MainTag.prototype.getTemplates = function(){
  return templates;
}

MainTag.prototype.addTemplate = function(template, args){
  Logger.info('addTemplate');
  templates.push(template);
};

MainTag.prototype.generateTag = function(){
  //TODO: Genere le tag en fonction des templates qui se trouvent à l'intérieur
};
