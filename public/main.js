var socket = io.connect('http://localhost:4000');


var circle = document.getElementsByClassName('circle')[0];
var send = document.getElementsByClassName('send')[0];
var anim = document.getElementsByClassName("anim")[0];

var timing = 3;

function resetStyle() {
    anim.style.transition = "none";
    anim.style.left = -100 + 'px';
}

function moveCircle() {
    var windowBorderRight = window.innerWidth;
    console.log(windowBorderRight);
    anim.style.transition = "all " + timing + "s linear";
    anim.style.left = windowBorderRight + 'px';
    console.log(circle.offsetLeft);

    var checkCirclePos = setInterval(() => {
        console.log(circle.offsetLeft);
        var offsetRight = circle.offsetLeft + 100;
        if (offsetRight >= windowBorderRight) {
            socket.emit('moveStart');
            clearInterval(checkCirclePos);
            resetStyle();

        }
    
    }, 100);

}

send.addEventListener('click', function () {
    moveCircle();
});

socket.on('moveStart', function () {
    moveCircle();
    anim.style.transition = "all " + timing + "s linear";
    anim.style.left = windowBorderRight + 'px';
});