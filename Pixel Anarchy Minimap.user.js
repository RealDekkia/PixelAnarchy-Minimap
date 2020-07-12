// ==UserScript==
// @name         Pixel Anarchy Minimap
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Displays a Minimap of pixelanarchy.online in the top right of the screen.
// @author       /u/Dekkia
// @match        https://pixelanarchy.online/
// @grant        none
// ==/UserScript==

(function() {

    const divider = 20;

    var css = `
#customMinimap{
    display: block;
    background-color: black;
    position: absolute;
    right: 0px;
    margin-top: 30px;
    opacity: 0.80;
    border: 3px solid black;
    overflow: hidden;
}
#customMinimap:hover{
    opacity: 1;
}

#miniCanvasMarker{
    width: 50px;
    height: 50px;
    display: block;
    background-color: RGBA(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
}
    `;
    var style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    var canvas = document.getElementById("myCanvas");

    var map = document.createElement("div");
    map.id = "customMinimap";
    map.style.width = (canvas.width / divider) + "px";
    map.style.height = (canvas.height / divider) + "px";

    var miniCanvas = document.createElement("canvas");
    var context = miniCanvas.getContext('2d');

    miniCanvas.id = "miniCanvas";
    miniCanvas.width = canvas.width;
    miniCanvas.height = canvas.height;
    miniCanvas.style.width = (canvas.width / divider) + "px";
    miniCanvas.style.height = (canvas.height / divider) + "px";

    const reloadCanvas = function(){
        context.drawImage(canvas, 0, 0);
    };
    setTimeout(function(){reloadCanvas();},1000);

    miniCanvas.addEventListener('click', function() {
        reloadCanvas();
    }, false);

    var minCanvasMarker = document.createElement("div");
    minCanvasMarker.id = "miniCanvasMarker";

    canvas.addEventListener("mousemove",function(event){
        //console.log(event);
        minCanvasMarker.style.marginLeft = (event.offsetX / divider) - 25 + "px";
        minCanvasMarker.style.marginTop = (event.offsetY / divider) - 25 + "px";
    })

    document.body.appendChild(map);
    map.appendChild(miniCanvas);
    map.appendChild(minCanvasMarker);
})();
















