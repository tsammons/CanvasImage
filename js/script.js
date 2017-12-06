// next use setInterval function to watch pixels slowly change
// then work on sampling pixels from 9 spots and making the 
// color palette
"use strict";
var ctx, canvas;
var loaded = 0, width, height, x1, y1;
var url1 = "https://media-cdn.tripadvisor.com/media/photo-s/02/91/0a/02/overcast-but-still-gorgeous.jpg";
var url2 = "https://t4.ftcdn.net/jpg/01/83/13/45/500_F_183134585_y9rh5hQkT5gC2ujaes7kK8aamZ2nSwaH.jpg";
var url3 = "http://www.media4.hw-static.com/wp-content/uploads/the-hangover-movie-stills_5641023-400x305.jpeg";
var url4 = "https://stampsy-eu-1.s3.amazonaws.com/uploads/05/23/2015/user/21233/e1ce0a07-4151-4663-8f68-3c8d74da1dc4.jpg";

function init() {
    document.addEventListener("click", printMousePos);
    canvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    make_base();
};

function make_base()
{
    var base_image = new Image();
    base_image.src = url4 + '?' + new Date().getTime();
    base_image.setAttribute('crossOrigin', '');

    base_image.onload = function(){
        width = this.width;
        height = this.height;
	    x1 = Math.floor(canvas.width/2) - Math.floor(width/2);
	    y1 = Math.floor(canvas.height/2) - Math.floor(height/2);
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
	pix[i] = pix[i];
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
    if (xclick < x1 || xclick > x1+width || yclick < y1 || yclick > y1+height)
        return;

    var imgd = ctx.getImageData(x1, y1, width, height);
    var pix = imgd.data;
    var xpix = xclick - x1;
    var ypix = yclick - y1;
    //var index = ((width*ypix)+xpix)*4;
   
    //document.body.style.backgroundColor = "rgba(" + [pix[index], pix[index+1], pix[index+2], pix[index+3]].join(',') + ")";
}

function printMousePos(event) {
    //printColor(event.clientX, event.clientY);
  }

init();
make_base();
