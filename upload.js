let video = document.querySelector('video');

function comenzar() {
	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then(function(stream) {
			video.srcObject = stream;
			video.onloadmetadata = function(e) {
				video.play();
			};
		})
		.catch(function(err) {
			console.log(err.name + ': ' + err.message);
		});
}
