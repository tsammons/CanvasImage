// next use setInterval function to watch pixels slowly change
// then work on sampling pixels from 9 spots and making the 
// color palette
"use strict";
var ctx, canvas;
var loaded = 0, width, height, x1, y1;
var url1 = "https://media-cdn.tripadvisor.com/media/photo-s/02/91/0a/02/overcast-but-still-gorgeous.jpg";


function init() {
    document.addEventListener("click", printMousePos);
    canvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-80;
}

function make_base()
{
    var base_image = new Image();
    base_image.src = url1 + '?' + new Date().getTime();
    base_image.setAttribute('crossOrigin', '');

    base_image.onload = function(){
        width = this.width;
        height = this.height;
	    x1 = canvas.width/2 - (width/2);
	    y1 = canvas.height/2 - (height/2);
	    ctx.drawImage(base_image, x1, y1);
	    imageData(width, height, x1, y1);
    }
}

function startRaining(w, h, x, y) {
    setInterval(() => imageData(w, h, x, y), 50); 
}

function imageData(w, h, x, y) {
    var imgd = ctx.getImageData(x, y, w, h);
    var pix = imgd.data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
	pix[i] = pix[i]; //0;
	pix[i+1] = pix[i+1];
	pix[i+2] = pix[i+2];
	if (Math.random() > 1)
	    pix[i+3] = Math.floor(Math.random()*80) + 175;
	else
	    pix[i+3] = 255;
    }

    ctx.putImageData(imgd, x, y);
}

function printColor(xclick, yclick) {
    var imgd = ctx.getImageData(x1, y1, width, height);
    var pix = imgd.data;

    var xpix = xclick - x1;
    var ypix = yclick - y1;
    var index = (((ypix+1) * width) + (xpix - (width/2)))*4;
   
    document.body.style.backgroundColor = "rgba(" + [pix[index], pix[index+1], pix[index+2], pix[index+3]].join(',') + ")";
    ctx.putImageData(imgd, x1, y1);
}

function printMousePos(event) {
    printColor(event.clientX, event.clientY);
  }

init();
make_base();
