// Log to show the JavaScript started loading
console.log("Hello World!")

// Set the onclick actions for all the buttons (not equals)
let boxes = document.getElementsByClassName("box");

for (box of boxes) {
  box.onclick = function() { addItem(this.id) };
}

// Set up the equals onclick
document.getElementById("equals").onclick = function() { compute() }

// Add items to the input screen
function addItem(id)
{
	let item = document.getElementById(id).innerText;
	document.getElementById("display").value += item;
}

// Take the input screen and evaluate it, no error checking
function compute()
{
	let result = eval(document.getElementById("display").value);
	document.getElementById("display").value = result;
	if (result == 12)
	{
		takeAudio(true);
	}
	else if (result == 42)
	{
		takeAudio(false);
	}
}

// Recording triggers

document.getElementById("add").onclick = function() {takePicture(this.id)};
document.getElementById("three").ondblclick = function() {takeVideo(this.id)};

function takePicture(id)
{
	addItem(id);
	console.log("I was triggered!");
	startVideo();
}

function takeVideo()
{
	console.log("I might of been triggered!");
}

function takeAudio(bool)
{
	console.log("I could be triggered!");	
}

var video = document.querySelector('video')
, canvas;
var chunks = [];

// Recording video
function startVideo()
{
	// use MediaDevices API
	// docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	if (navigator.mediaDevices) 
	{
		// access the web cam
		navigator.mediaDevices.getUserMedia({video: true})
		// permission granted:
		.then(function(stream) 
		{
			video.src = window.URL.createObjectURL(stream);
			var mediaRecorder = new MediaRecorder(stream);

			mediaRecorder.start();
      console.log(mediaRecorder.state);
			console.log("recorder started");
			
			var start = new Date().getTime();
			for (var i = 0; i < 1e7; i++) {
				if ((new Date().getTime() - start) > 10000){
					break;
				}
			}

			mediaRecorder.stop();

			mediaRecorder.onstop = function(){
				console.log('Stopped  & state = ' + mediaRecorder.state);
		
				var blob = new Blob(chunks, {type: "video/webm"});
				chunks = [];
		
				var videoURL = window.URL.createObjectURL(blob);
				
				var downloadLink = document.querySelector('a#downloadLink');

				downloadLink.href = videoURL;
				// videoElement.src = videoURL;
				downloadLink.innerHTML = 'Download video file';
		
				var rand =  Math.floor((Math.random() * 10000000));
				var name  = "video_"+rand+".webm" ;
		
				downloadLink.setAttribute( "download", name);
				downloadLink.setAttribute( "name", name);
			};
		
			mediaRecorder.ondataavailable = function(e) 
			{
				console.log('Data available...');
				console.log(e.data);
				console.log(e.data.type);
				console.log(e);
				chunks.push(e.data);
			};
		})
		// permission denied:
		.catch(function(error) 
		{
			console.log("Could not access the camera. Error: " + error.name);
		});
	}

}

// Log that all the JavaScript loaded
console.log("Goodbye World!")