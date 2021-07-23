const clearButton = document.querySelector(".clear");
const strokeWeight = document.querySelector(".stroke-weight");
const colorPicker = document.querySelector(".color-picker");


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);

clearButton.addEventListener("click", clearCanvas);


function start (e) {

    isDrawing = true;
    draw(e);
}

function draw ({clientX: x, clientY: y}) {

    if(!isDrawing) return;

    ctx.lineWidth = strokeWeight.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorPicker.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stop() {

    isDrawing = false;

    ctx.beginPath();
    
}



function clearCanvas (){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}




window.addEventListener("resize", resize);


function resize () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();