/******************************************
* Snow Effect Script- By Altan d.o.o. (snow@altan.hr, http://www.altan.hr/snow/index.html)
* Visit Dynamic Drive (http://www.dynamicdrive.com/) for full source code
* Modified Dec 31st, 02' by DD. This notice must stay intact for use
* Modified Dec 06, 2009 by David Hall. Robotification.com
******************************************/


//Configure below to change URL path to the snow image
var snowsrc = "images/snow_sm1.gif"
// Configure below to change number of snow to render
var no = 20;
var doc_width = 800;
var doc_height = 600;
// coordinate and position variables
var dx = [];
var xp = [];
var yp = [];
// amplitude and step variables
var am = [];
var stx = [];
var sty = [];

function StartSnow() {
    //get window size
    doc_width = document.body.clientWidth;
    doc_height = document.body.clientHeight;

    for (var i = 0; i < no; ++i) {
        dx[i] = 0;                        // set coordinate variables
        xp[i] = Math.random() * (doc_width - 50);  // set position variables
        yp[i] = Math.random() * doc_height;
        am[i] = Math.random() * 20;         // set amplitude variables
        stx[i] = 0.02 + Math.random() / 10; // set step variables
        sty[i] = 0.7 + Math.random();     // set step variables
 
        var flake = document.createElement("img");
        flake.id = "dot" + i;
        flake.style.position = "absolute";
        flake.style.top = 15;
        flake.style.left = 15;
        flake.src = snowsrc;
        flake.setAttribute('border', '0');
        document.body.appendChild(flake);
    }
    Snow();
}

function Snow() {  // IE and NS6 main animation function
    //get window size
    doc_width = document.body.clientWidth;
    doc_height = document.body.clientHeight;
    
    for (var i = 0; i < no; ++i) {  // iterate for every dot
        yp[i] += sty[i];
        if (yp[i] > doc_height - 50) {
            xp[i] = Math.random() * (doc_width - am[i] - 30);
            yp[i] = 0;
            stx[i] = 0.02 + Math.random() / 10;
            sty[i] = 0.7 + Math.random();
            //doc_width = document.body.clientWidth;
            //doc_height = document.body.clientHeight;
        }
        dx[i] += stx[i];
        var flake = document.getElementById("dot" + i);
        flake.style.top = Math.round( yp[i]);
        flake.style.left = Math.round(xp[i] + am[i] * Math.sin(dx[i]));
        flake.style.zIndex = 100;
    }
    setTimeout("Snow()", 15);
}