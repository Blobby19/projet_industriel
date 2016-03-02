'use strict';

var socket = io.connect();

var canvas = $('#canvas')[0];
// var ductStraight = new ImageBAS("duct_straight", 108, 80, "/img/cta/Ducts/Straight.png");
// var doubleCanvas = new DoubleCanvas(canvas);
// doubleCanvas.addImageBAS(ductStraight);
// doubleCanvas.drawDucts();

$('#temperature').click(function(){
  if(this.checked) $("#div_temp").removeClass("hide");
  else $("#div_temp").addClass("hide");
});

$('#pression').click(function(){
  if(this.checked) $("#div_press").removeClass("hide");
  else $("#div_press").addClass("hide");
});

$('#hygro').click(function(){
  if(this.checked) $("#div_hygro").removeClass("hide");
  else $("#div_hygro").addClass("hide");
});
