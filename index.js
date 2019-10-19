var mainCanvas = document.querySelector("#myCanvas");
var mainContext = mainCanvas.getContext("2d");
mainCanvas.width = 600;
mainCanvas.height = 600;

var startBtn = document.querySelector("#startBtn");
var stopBtn = document.querySelector("#stopBtn");
var clearBtn = document.querySelector("#clearBtn");

var throttleSlider = document.querySelector("#throttleSlider");
var throttleValueLabel = document.querySelector("#throttleValue");

var animationID;

startBtn.addEventListener("click", () => {
	drawSomething();
});

stopBtn.addEventListener("click", () => {
	cancelAnimationFrame(animationID);
});

clearBtn.addEventListener("click", () => {
	mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
});
 
var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

var angle = 0;

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
 

//The maximum is inclusive and the minimum is inclusive 
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

let x = getRandomIntInclusive(0,mainCanvas.width);
let y = getRandomIntInclusive(0,mainCanvas.height);

let lastStamp = 0;
let maxFPS = throttleSlider.value;
throttleValueLabel.innerHTML = maxFPS + " fps";

throttleSlider.oninput = () => {
				maxFPS = throttleSlider.value;
				throttleValueLabel.innerHTML = maxFPS + "fps";
			};

let hue = 0;
let sat = 0;

function drawSomething(timeStamp) {

		let timeStep = 1000 / maxFPS;
	
		animationID = requestAnimationFrame(drawSomething);
			
		if (timeStamp - lastStamp < timeStep) {
			return;
		}
		
		lastStamp = timeStamp;
    
    // mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
     
    mainContext.beginPath();
     
		hue = getRandomIntInclusive(0,359);
		sat = getRandomIntInclusive(0,100);
    mainContext.strokeStyle = 'hsl(' + hue + ',' + sat + '%, 50%)';
    mainContext.lineWidth = 8;
	
    mainContext.moveTo(x,y);
		x = getRandomIntInclusive(0,mainCanvas.width);
		y = getRandomIntInclusive(0,mainCanvas.height);
		mainContext.lineTo(x,y);
    mainContext.stroke();
		mainContext.closePath();
		
}
