// Interactive Christmas script - Robotification.com

var imgCurrent = null;
var mpos = [];
var windowSize = [];
var menuVisible = false;
var imgList = [
        "0_santa32c4.gif",
        "ani-houseA.gif",
        "candle21a.gif",
        "christmas08.gif",
        "christmas18.gif",
        "christmas38.gif",
        "christmas46.gif",
        "christmas48.gif",
        "CHRISTREE021z.GIF",
        "ctree.gif",
        "ctree_5a.gif",
        "dovey.gif",
        "dressed-snowman.gif",
        "fancy-stocking.gif",
        "filled-stocking.gif",
        "Gifts-01-june.gif",
        "Gifts1.gif",
        "gingerbread02.gif",
        "greetings.gif",
        "house-A.gif",
        "house-B.gif",
        "house-C.gif",
        "house-D.gif",
        "house-E.gif",
        "house-F.gif",
        "house-O.gif",
        "lamp_n_tree.gif",
        "lchain.gif",
        "lighted-minitree.gif",
        "lights06.gif",
        "lodge-sleigh_sm.gif",
        "merry.gif",
        "merry2.gif",
        "mini-tree.gif",
        "mouse.jpg",
        "new1.gif",
        "new2.gif",
        "ornament01.gif",
        "puppy-stocking.gif",
        "Santa-07-june.gif",
        "santahat-mailbox.gif",
        "short_treelg.gif",
        "snowcaptree120605.gif",
        "snowcaptreetiny120605.gif",
        "snowdome.gif",
        "snow_sm1.gif",
        "tree.gif",
        "village-light.gif",
        "xmas004.gif",
        "xmas007.gif",
        "xmas008.gif",
        "xmas011.gif",
        "xmas012.gif",
        "xmas013.gif",
        "xmas017.gif",
        "xmas019.gif",
        "xmas023.gif",
        "xmascat.gif"
    ];


function Start() {
    
    // fix menu z index
    document.getElementById("menu").style.zIndex = 1000;
    
    // get inner reference  
    var menu = document.getElementById("menu");

    for (var item in imgList) {
        var imgName = imgList[item];
        
        var img = document.createElement('img');
        
        img.setAttribute('class', "menuItem");
        img.onmousedown = function() { SetImg(this.src) };
        img.onload = function() {
            var img = this;
            if (window.event == undefined) { // for non IE
                img.style.maxHeight = "50px";
                img.style.maxWidth = "200px";
            } else {//for ie fix the images up
                var ratio = img.width / img.height;

                img.height = Math.min(img.height, 50);
                img.width = Math.min(img.height * ratio, 200);
            }
            img.style.backgroundColor = "#FFFFFF";
            img.style.margin = "8px";
            img.style.padding = "5px"
        }        
        img.src = "images/" + imgName;
        
        menu.appendChild(img);

    }

    //capture mouse events
    document.onmousemove = processEvent;  // start capturing    
    
}


function processEvent(e) { // catches and processes the mousemove event
    //determine window dimensions
    windowSize[0] = document.body.clientHeight;
    windowSize[1] = document.body.clientWidth;

    // get mouse position
    if (window.event == undefined) { // for non IE
        mpos[0] = e.pageY;
        mpos[1] = e.pageX;
    } else { //for IE
        mpos[0] = window.event.y ;
        mpos[1] = window.event.x ;
    }
    // move image or menu if neccesary
    MoveImg(mpos[0], mpos[1]);
    MenuCheck(mpos[0], mpos[1]);
}

function SetImg(imgSrc) {
    if (imgCurrent != null) {
        document.removeChild(imgCurrent);
    }
    imgCurrent = document.createElement('img');
    imgCurrent.src = imgSrc;
    imgCurrent.setAttribute('class', "placed");
    imgCurrent.onclick = function() { StampImg(); };
    imgCurrent.style.position = "absolute";
    imgCurrent.style.zIndex = 1001;
    document.body.appendChild(imgCurrent);
    MoveImg(mpos[0], mpos[1]);
}

function MoveImg(x, y) {
    if (imgCurrent != null) {
        var imgElement = imgCurrent;
        imgElement.style.top = Math.round(Math.min(x -(imgCurrent.height / 2), windowSize[0] - imgCurrent.height));
        imgElement.style.left = Math.round(Math.min(y - (imgCurrent.width / 2), windowSize[1] - imgCurrent.width));
    }
}

function MenuCheck(x,y) {
    var menu = document.getElementById("menu");
    if (menuVisible) {
        // if in bottom 30% hide menu
        if (x > (windowSize[0]*0.7)){
            menu.style.top = "-100%";
            menuVisible = false;
        }
    } else {
        // if in top 5% show menu and clear selection    
        if (x < (windowSize[0]*0.05)) {
            ClearImg();
            menu.style.top = 0;
            menuVisible = true;
        }
    }
}

function ClearImg() {
    if (imgCurrent != null) {
        document.body.removeChild(imgCurrent);
        imgCurrent = null;
    }
}

function StampImg() {
    if (imgCurrent != null) {
        imgCurrent.style.zIndex = 10;
        imgCurrent = null;
        document.getElementById("menu").style.zIndex = 1000;
    }
    //remove messsage after a few seconds
    setTimeout(function() { document.getElementById("message").style.display = "none"; }, 2000)
}