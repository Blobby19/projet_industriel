/*
* Class tag xml
* TagClass.js
* Author: Luc Viala
*/

var Logger = require('./logger')('TagClass');


module.exports = {MainTag: MainTag, FolderTag: FolderTag};

MainTag.prototype.name = "";
MainTag.prototype.raw = new Array();
MainTag.prototype.folders = new Array();
MainTag.prototype.components = new Array();

function MainTag(name){
  this.name = name;
};

MainTag.prototype.setRaw = function(raw){
  Logger.info('setRaw()');
  this.raw = raw;
};

MainTag.prototype.getRaw = function(){
  Logger.info('getRaw()');
  return this.raw;
};

MainTag.prototype.setComponents = function(components){
  this.components = components;
};

MainTag.prototype.getComponents = function(){
  return this.components;
}

MainTag.prototype.addComponent = function(component, args){
  Logger.info('addComponent');
  this.components.push(component);
};

MainTag.prototype.generateTag = function(){
  Logger.info('MainTag generateTag');
  //TODO: Genere le tag en fonction des templates qui se trouvent à l'intérieur

  for(var i = 0; i<this.components.length; i++)
    this.raw.push(this.components[i]);
  for(var i = 0; i<this.folders.length; i++)
    this.raw.push(this.folders[i].getRaw());

  return this.raw;
};

MainTag.prototype.setFolders = function(folders){
  this.folders = folders;
};

MainTag.prototype.getFolders = function(){
  return this.folders;
};

MainTag.prototype.addFolder = function(folder){
  Logger.info('addFolder');
  this.folders.push(new FolderTag(folder));
};

FolderTag.prototype.name = "";
FolderTag.prototype.raw = [];
FolderTag.prototype.components = new Array();

function FolderTag(folder){
  this.raw = folder;
}

FolderTag.prototype.setRaw =function(raw){
  this.raw = raw;
};

FolderTag.prototype.getRaw = function(){
  return this.raw;
};

FolderTag.prototype.setName = function(name){
  this.name = name;
};

FolderTag.prototype.getName = function(){
  return this.name;
};

FolderTag.prototype.setComponents = function(components){
  this.components = components;
};

FolderTag.prototype.getComponents = function(){
  return this.components;
};

FolderTag.prototype.addComponent = function(component){
  Logger.info('FolderTag.addComponent');
  this.components.push(component);
};

FolderTag.prototype.generateTag = function(){
  for(var i = 0; i<this.components.length; i++)
    this.raw.push(this.components[i]);
  return this.raw;
};