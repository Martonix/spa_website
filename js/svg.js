"use strict";


/*

var progress = document.querySelector(".progress"),
        text = document.querySelector("textarea"),
        counter = document.getElementById("counter");


var pathLength = progress.getAttribute("r") * 2 * Math.PI,
    tweetLenght = 40,
    warnZ = Math.floor(tweetLenght * (3/4)),
    dangZ = tweetLenght;


   var len = text.value.length,
        per = len / tweetLenght;
        console.log(len);




progress.style.strokeDasharray = pathLength + "px";
progress.style.strokeDashoffset = pathLength + "px";



text.addEventListener("input" , function(e){

   
        console.log(len);
    //handle progress
        if(len <= tweetLenght){
            let newOffset = pathLength - ( pathLength * per) + "px";
                        
            progress.style.strokeDashoffset = newOffset;
            //color handler 
            color();
           
        }
        
            //counter handler 
            counterFunc();

        
});



function counterFunc() {
    counter.textContent = tweetLenght - len; 
    counter.classList.toggle("danger", len >= tweetLenght);
}

function color() {
    progress.classList.toggle("warn", len > warnZ && len < dangZ);
    progress.classList.toggle("danger", len >= dangZ);
    progress.classList.toggle("tragedy", len == tweetLenght);

}
*/