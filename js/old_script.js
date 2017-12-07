// next use setInterval function to watch pixels slowly change
// then work on sampling pixels from 9 spots and making the 
// color palette
"use strict";
var ctx, canvas;
var colorArray = [];
var numberOfPalettes = 12;
var loaded = 0, width, height, x1, y1;
var url1 = "https://media-cdn.tripadvisor.com/media/photo-s/02/91/0a/02/overcast-but-still-gorgeous.jpg";
var url2 = "https://t4.ftcdn.net/jpg/01/83/13/45/500_F_183134585_y9rh5hQkT5gC2ujaes7kK8aamZ2nSwaH.jpg";
var url3 = "http://www.media4.hw-static.com/wp-content/uploads/the-hangover-movie-stills_5641023-400x305.jpeg";
var url4 = "https://stampsy-eu-1.s3.amazonaws.com/uploads/05/23/2015/user/21233/e1ce0a07-4151-4663-8f68-3c8d74da1dc4.jpg";
var url5 = "https://media-cdn.tripadvisor.com/media/photo-s/07/5f/79/dd/john-hancock-center.jpg";
var url6 = "https://media-cdn.tripadvisor.com/media/photo-s/02/60/63/96/chicago-from-the-john.jpg";
var url7 = "https://media-cdn.tripadvisor.com/media/photo-s/0a/12/7f/24/rainbow-mountain-day.jpg";
var url8 = "https://media-cdn.tripadvisor.com/media/photo-s/01/34/49/8e/the-candelabra-off-the.jpg";
var url9 = "https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/bd/cancun.jpg";
var url10 = "https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/ad/bangkok.jpg";
var url11 = "https://media-cdn.tripadvisor.com/media/photo-s/09/76/bf/88/amara-bangkok.jpg";
var url12 = "https://media-cdn.tripadvisor.com/media/photo-s/01/31/34/10/tsim-sha-tsui-waterfront.jpg";
var url13 = "https://media-cdn.tripadvisor.com/media/photo-s/09/34/53/e5/oriental-pearl-tower.jpg";

function init() {
    document.addEventListener("click", printMousePos);
    canvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-100;
}

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    make_base();
};

function make_base()
{
    var base_image = new Image();
    base_image.src = url13 + '?' + new Date().getTime();
    base_image.setAttribute('crossOrigin', '');

    base_image.onload = function(){
        width = this.width;
        height = this.height;
	    x1 = Math.floor(canvas.width/2) - Math.floor(width/2);
	    y1 = canvas.height - height; //Math.floor(canvas.height/2) - Math.floor(height/2);
	    ctx.drawImage(base_image, x1, y1);
        imageData(width, height, x1, y1);
        setSwatchWidth();
    }
}

function startRaining(w, h, x, y) {
    setInterval(() => imageData(w, h, x, y), 50); 
}

function setSwatchWidth() {
    for (var i = 0; i < numberOfPalettes; i++) {
        let newWidth = Math.floor((width - ((numberOfPalettes-1)*3))/numberOfPalettes).toString() + "px";
        document.getElementById(i.toString()).style.width = newWidth;
    }
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

function randomlyPopulate() {
    for (var i = 0; i < numberOfPalettes; i++) {
        let x = Math.floor(Math.random()*width)+x1;
        let y = Math.floor(Math.random()*height)+y1;
        printColor(x, y);
    }
}

function printColor(xclick, yclick) {
    if (xclick < x1 || xclick > x1+width || yclick < y1 || yclick > y1+height)
        return;

    var imgd = ctx.getImageData(x1, y1, width, height);
    var pix = imgd.data;
    var xpix = xclick - x1;
    var ypix = yclick - y1;
    var index = ((width*ypix)+xpix)*4;
    let rgba = "#" + 
        ("0" + pix[index  ].toString(16)).slice(-2) + 
        ("0" + pix[index+1].toString(16)).slice(-2) +
        ("0" + pix[index+2].toString(16)).slice(-2);
   
    //document.body.style.backgroundColor = rgba;
    addColor(rgba);
    console.log(rgba);
}

function addColor(color) {
    colorArray.push(color);
    //colorArray.sort();
    fillColorPalettes();
}

function fillColorPalettes() {
    let max = numberOfPalettes;
    if (numberOfPalettes > colorArray.length)
        max = colorArray.length;

    for (var i = 0; i < max; i++) {
        document.getElementById(i.toString()).style.backgroundColor = colorArray[i];
        //let newWidth = Math.floor((width - ((numberOfPalettes-1)*3))/numberOfPalettes).toString() + "px";
        //document.getElementById(i.toString()).style.width = newWidth;
    }
}

function printMousePos(event) {
    //printColor(event.clientX, event.clientY);ß
    randomlyPopulate();
  }

init();
make_base();
