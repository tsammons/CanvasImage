"use strict";
var ctx, canvas;
var colorArray = [];
var numberOfPalettes = 12;
var width, height, x1, y1, rand = 1;
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
    document.addEventListener("click", onMouseClick);
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

function onMouseClick(event) {
    /*
    if (rand) {
        //colorArray = [];
        randomlyPopulate();
    } else
        getColor(event.clientX, event.clientY);
    */
}

function make_base() {
    let newURL = url1 + '?' + new Date().getTime();
    var base_image = new Image();
    base_image.src = newURL;
    base_image.setAttribute('crossOrigin', '');

    base_image.onload = function(){
        width = this.width;
        height = this.height;
	    x1 = Math.floor(canvas.width/2) - Math.floor(width/2);
	    y1 = canvas.height - height;
	    ctx.drawImage(base_image, x1, y1);
        setSwatchWidth();
    }
}

function setSwatchWidth() {
    for (var i = 0; i < numberOfPalettes; i++) {
        let newWidth = Math.floor((width - ((numberOfPalettes-1)*3))/numberOfPalettes).toString() + "px";
        document.getElementById(i.toString()).style.width = newWidth;
    }
}

function randomlyPopulate() {
    for (var i = 0; i < numberOfPalettes; i++) {
        let x = Math.floor(Math.random()*width)+x1;
        let y = Math.floor(Math.random()*height)+y1;
        getColor(x, y);
    }
}

function drawTarget(x, y) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(x,y,4,0,2*Math.PI);
    ctx.stroke();
}

function getColor(xclick, yclick) {
    if (xclick < x1 || xclick > x1+width || yclick < y1 || yclick > y1+height)
        return;

    if (colorArray.length == numberOfPalettes)
        clearPalattes();

    //drawTarget(xclick, yclick);
    var imgd = ctx.getImageData(x1, y1, width, height);
    var pix = imgd.data;
    var xpix = xclick - x1;
    var ypix = yclick - y1;
    //var index = ((width*ypix)+xpix)*4;
    let rgba = "#" + 
        ("0" + pix[index  ].toString(16)).slice(-2) + 
        ("0" + pix[index+1].toString(16)).slice(-2) +
        ("0" + pix[index+2].toString(16)).slice(-2);
   
    addColor(rgba);
    console.log(rgba);
}

function addColor(color) {
    colorArray.push(color);
    colorArray.sort();
    fillColorPalettes();
}

function clearPalattes() {
    colorArray = [];
    for (var i = 0; i < numberOfPalettes; i++) {
        document.getElementById(i.toString()).style.backgroundColor = "white";
    }
}

function fillColorPalettes() {
    let max = numberOfPalettes;
    if (numberOfPalettes > colorArray.length)
        max = colorArray.length;

    for (var i = 0; i < max; i++) {
        document.getElementById(i.toString()).style.backgroundColor = colorArray[i];
    }
}

init();
make_base();
