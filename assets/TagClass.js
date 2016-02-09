/*
* Class tag xml
* TagClass.js
* Author: Luc Viala
*/

var Logger = require('./logger')('TagClass');
var builder = require('./XMLBuilderClass');


module.exports = MainTag;

var name = "";
var raw = [];
var templates = new Array();

function MainTag(name){
  this.name = name;
};

MainTag.prototype.setRaw = function(_raw){
  Logger.info('setRaw()');
  raw = _raw;
};

MainTag.prototype.getRaw = function(){
  Logger.info('getRaw()');
  return raw;
};

MainTag.prototype.setTemplates = function(_templates){
  templates = _templates;
};

MainTag.prototype.getTemplates = function(){
  return templates;
}

MainTag.prototype.addTemplate = function(template, args){
  Logger.info('addTemplate');
  templates.push(template);
};

MainTag.prototype.generateTag = function(){
  Logger.info('generateTag');
  //TODO: Genere le tag en fonction des templates qui se trouvent à l'intérieur
  if(raw instanceof Array){
    templates.forEach(function(template){
      raw.push(template);
    });
  }
  return raw;
};
