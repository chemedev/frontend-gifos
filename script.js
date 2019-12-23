'use strict';

let theme = document.getElementsByClassName('light');

let gif = [];
const divGif = document.getElementById('1gif');

function toggle() {
	const linkGifos = document.getElementById('menuDesplegable');
	linkGifos.classList.toggle('active');
}

function lightTheme() {
	const theme = document.getElementsByClassName('dark');
	const logo = document.getElementById('logo');
	const lupa = document.getElementById('lupa');
	logo.setAttribute('src', 'img/gifOF_logo.png');
	lupa.style.backgroundImage = 'url(../img/lupa_inactive.svg)';

	// for (let item of theme) item.classList.replace('dark', 'light');
	for (let i = theme.length - 1; i >= 0; i--)
		theme[i].classList.replace('dark', 'light');
}

function darkTheme() {
	const theme = document.getElementsByClassName('light');
	const logo = document.getElementById('logo');
	const lupa = document.getElementById('lupa');
	logo.setAttribute('src', 'img/gifOF_logo_dark.png');
	lupa.style.backgroundImage = 'url(../img/lupa_dark.svg)';

	// for (let item of theme) item.classList.replace('light', 'dark');
	for (let i = theme.length - 1; i >= 0; i--)
		theme[i].classList.replace('light', 'dark');
}

function sugerencias() {
	const found = fetch(
		'https://api.giphy.com/v1/gifs/random?' +
			'api_key=tE63cJMHJADHunmLcQ6AoRy8BkwkOAuu'
	)
		.then(response => {
			return response.json();
		})
		.then(data => {
			sugerencia = data;
			return data;
		})
		.catch(error => {
			return error;
		});
	return found;
}

function getSearchResults() {
	let search = document.getElementById('buscar_rec').value;
	const found = fetch(
		'https://api.giphy.com/v1/gifs/search?' +
			'api_key=tE63cJMHJADHunmLcQ6AoRy8BkwkOAuu' +
			'&q=' +
			search
	)
		.then(response => {
			return response.json();
		})
		.then(data => {
			gif = data.data[0].images.original.url;
			divGif.setAttribute('src', gif);
			return data;
		})
		.catch(error => {
			return error;
		});
	return found;
}

var sugerencia = sugerencias();

// divGif.style.width = '100%';
// divGif.style.height = '90%';
// divGif.style.backgroundRepeat = 'no-repeat';

// function getStreamAndRecord() {
// 	navigator.mediaDevices
// 		.getUserMedia({
// 			audio: false,

// 			video: {
// 				height: { max: 480 }
// 			}
// 		})

// 		.then(function(stream) {
// 			video.srcObject = stream;

// 			video.play();
// 		});
// }
