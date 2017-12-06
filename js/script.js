"use strict";
var ctx, canvas;
var loaded = 0, h = 0, w = 0;
var url1 = "https://media-cdn.tripadvisor.com/media/photo-s/02/91/0a/02/overcast-but-still-gorgeous.jpg";
var url2 = "https://pixabay.com/p-1207345/?no_redirect";

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-80;
}

function make_base()
{
    var base_image = new Image();
    base_image.src = url1;
    base_image.setAttribute('crossOrigin', '');
    base_image.onload = function(){
	let x1 = canvas.width/2 - (this.width/2);
	let y1 = canvas.height/2 - (this.height/2);
	ctx.drawImage(base_image, x1, y1);
	//startRaining(this.width, this.height, x1, y1);
	imageData(this.width, this.height, x1, y1);
    }
}

function startRaining(w, h, x1, y1) {
    setInterval(() => imageData(w, h, x1, y1), 50); 
}

function imageData(w, h, x1, y1) {
    var imgd = ctx.getImageData(x1, y1, w, h);
    var pix = imgd.data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
	pix[i] = 0;
	pix[i+1] = pix[i+1];
	pix[i+2] = pix[i+2];
	if (Math.random() > 0.8)
	    pix[i+3] = Math.floor(Math.random()*80) + 175;
	else
	    pix[i+3] = 255;
    }

    ctx.putImageData(imgd, x1, y1);
}

// next use setInterval function to watch pixels slowly change
// then work on sampling pixels from 9 spots and making the 
// color palette

init();
make_base();
