'use strict';

const video = document.querySelector('video');
const btnCamera = document.querySelector('#btnCamera');
const btnRecord = document.querySelector('#btnRecord');
const btnRepeat = document.querySelector('#btnRepeat');
const btnPlay = document.querySelector('#btnPlay');
const progressPlay = document.querySelector('#progressPlay');
const progressFile = document.querySelector('#progressFile');
const title = document.querySelector('#title');
const gif = document.querySelector('#gif');
const lblTimer = document.querySelector('#timer');

const apiUpload = 'https://upload.giphy.com/v1/gifs';

let cameraStream,
	recorder,
	blob,
	flag = 'record';

document.getElementById('arrow').addEventListener('click', () => (document.location.href = '/src/html/'));
document.getElementById('logo').addEventListener('click', () => (document.location.href = '/src/html/'));
btnRecord.addEventListener('click', () => dynamicFunctionality());
btnRepeat.addEventListener('click', () => {
	location.reload();
	recordVideo();
});

//! Funcionalidad secuencial del btn 'Grabar'.
function dynamicFunctionality() {
	switch (flag) {
		case 'record':
			flag = 'stop';
			recordVideo();
			lblTimer.classList.toggle('visible');
			setInterval(() => {
				let time = luxon.DateTime.fromSeconds(video.currentTime).toFormat('00:mm:ss:S');
				lblTimer.innerHTML = time;
			}, 500);
			btnRecord.innerHTML = 'Listo';
			btnRecord.classList.toggle('btnReady');
			btnCamera.classList.toggle('btnRecord');
			title.innerHTML = 'Capturando Tu Gifo';
			break;
		case 'stop':
			flag = 'preview';
			stopRecording();
			stopCamera();
			btnRecord.classList.toggle('btnReady');
			btnCamera.classList.toggle('btnRecord');
			btnCamera.style.display = 'none';
			title.innerHTML = 'Vista Previa';
			btnRecord.innerHTML = 'Subir Gifo';
			btnRepeat.classList.toggle('visible');
			progressPlay.classList.toggle('visible');
			btnPlay.classList.toggle('visible');
			break;
		case 'preview':
			flag = 'upload';
			upload(blob);
			document.querySelector('.container-video').style.display = 'none';
			document.querySelector('.container-uploading').style.display = 'flex';
			title.innerHTML = 'Subiendo Gifo';
			btnRecord.innerHTML = 'Cancelar';
			btnRepeat.classList.toggle('visible');
			progressPlay.classList.toggle('visible');
			progressFile.classList.toggle('visible');
			btnPlay.classList.toggle('visible');
			lblTimer.classList.toggle('visible');
			break;
	}
}

function persistenceTheme() {
	if (localStorage.theme != undefined) {
		document.documentElement.dataset.theme = localStorage.getItem('theme');
		if (localStorage.getItem('theme') == 'light') {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', '../../img/gifOF_logo.png');
		} else {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', '../../img/gifOF_logo_dark.png');
		}
	}
}

function startCamera() {
	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then(function(stream) {
			cameraStream = stream;
			video.srcObject = cameraStream;
			video.play();
		})
		.catch(() => alert('Necesitas una cámara para continuar.'));
}

function stopCamera() {
	cameraStream.getTracks().forEach(track => track.stop());
}

function recordVideo() {
	recorder = createGifRecorder(cameraStream);
	recorder.startRecording();
	video.style.display = 'block';
	gif.style.display = 'none';
}

function stopRecording() {
	recorder.stopRecording(showRecordedGif);
	video.style.display = 'none';
	gif.style.display = 'block';
}

function showRecordedGif() {
	blob = recorder.getBlob();
	gif.src = URL.createObjectURL(blob);
	recorder.destroy();
	recorder = null;
}

function createGifRecorder(stream) {
	return RecordRTC(stream, {
		type: 'gif',
		frameRate: 1,
		quality: 10,
		width: 360,
		hidden: 240,
		onGifRecordingStarted: () => console.log('started')
	});
}

async function upload(blob) {
	const formData = new FormData();
	formData.append('file', blob, 'myGif.gif');
	await fetch(`${apiUpload}?api_key=${apiKey}`, {
		method: 'post',
		body: formData
	})
		.then(res => res.json())
		.then(resParsed => {
			const uploadedGifoId = resParsed.data.id;
			localStorage.setItem('lastUpload', uploadedGifoId);
			saveGifoInLocalStorage(uploadedGifoId);
		});
	localStorage.setItem('newGifos', false);
	localStorage.setItem('hasUploaded', true);
	document.location.href = '/src/html/misgifos.html';
}

//! Guarda IDs separados por , en un solo key
function saveGifoInLocalStorage(gifoID) {
	let savedGifs = localStorage.getItem('myGifos');
	if (savedGifs != null) localStorage.setItem('myGifos', `${savedGifs},${gifoID}`);
	else localStorage.setItem('myGifos', gifoID);
}

persistenceTheme();
startCamera();
