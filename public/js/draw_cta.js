'use strict';

var ImageBAS = function(name, width, height, src){

  this.name = name;
  this.width = width;
  this.height = height;
  this.src = src;

}

var DoubleCanvas = function(canvas){

  this.listOfObject = new Array();
  this.canvas = canvas;
  this.addImageBAS = function(image){
    this.listOfObject.push(image);
  }

  this.drawDucts = function(){
    var context = this.canvas.getContext('2d');
    for(var i=0; i<this.listOfObject.length; i++){
      var _image = new Image();
      _image.src=this.listOfObject[i].src;
      context.drawImage(_image, 10, 10, this.listOfObject[i].width, this.listOfObject[i].height);
    }
  }

}
