'use strict';

document.getElementById('arrow').addEventListener('click', () => (document.location.href = './index.html'));
document.getElementById('logo').addEventListener('click', () => (document.location.href = './index.html'));
document.getElementById('btnCancelar').addEventListener('click', () => (document.location.href = './index.html'));
document.getElementById('btnComenzar').addEventListener('click', () => (document.location.href = './html/upload.html'));
document.getElementById('btnReady').addEventListener('click', () => document.location.reload());
const btnCopyLink = document.getElementById('btnCopyLink');

const sectionCrearGifos = document.querySelector('.crearGifos');
const sectionGifoSubido = document.querySelector('.gifoSubido');
const iframe = document.querySelector('iframe');
const btnDownload = document.querySelector('#btnDownloadGifo');

if (localStorage.newGifos == 'true') {
	sectionCrearGifos.style.display = 'block';
	sectionGifoSubido.style.display = 'none';
} else if (localStorage.hasUploaded == 'true') {
	sectionCrearGifos.style.display = 'none';
	sectionGifoSubido.style.display = 'block';
	localStorage.hasUploaded = false;
} else {
	sectionCrearGifos.style.display = 'none';
	sectionGifoSubido.style.display = 'none';
}

async function fetchLastGif() {
	if (localStorage.getItem('lastUpload') != null) {
		await fetch(`https://api.giphy.com/v1/gifs/${localStorage.getItem('lastUpload')}?api_key=${apiKey}`)
			.then(res => res.json())
			.then(res => {
				iframe.setAttribute('src', res.data.embed_url);
				btnDownload.setAttribute('href', res.data.url);
				btnCopyLink.addEventListener('click', () => {
					let input = document.createElement('input');
					input.setAttribute('value', res.data.url);
					document.body.appendChild(input);
					input.select();
					document.execCommand('copy');
					document.body.removeChild(input);
					alert('Enlace copiado al portapapeles!');
				});
			})
			.catch(err => console.log(err));
	}
}

function persistenceTheme() {
	if (localStorage.getItem('theme') != null) {
		document.documentElement.dataset.theme = localStorage.getItem('theme');
		if (localStorage.getItem('theme') == 'light') {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', './img/gifOF_logo.png');
		} else {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', './img/gifOF_logo_dark.png');
		}
	}
}

function newGridBoxSugerencias(gif) {
	let newGridBox = document.createElement('div');
	let gifTitle = gif.title.split(' ');
	gifTitle.pop();
	gifTitle = gifTitle.join('');
	newGridBox.className = 'grid-box';
	newGridBox.innerHTML = `
					<div class="topBar">
						<h2 class="topBar-text">#${gifTitle}</h2>
						<img src="./img/close.svg" />
					</div>
					<div class="grid-gif">
						<img class="gifSugerencia" src="${gif.images.downsized.url}" />
					</div>
					<button class="grid-btn" type="button">Ver más</button>
				`;
	document.getElementById('gridSugerencias').appendChild(newGridBox);
}

function loadMyGifos() {
	if (localStorage.myGifos != undefined) {
		const sectionMisGifos = document.getElementById('container-resultados');
		sectionMisGifos.style.display = 'block';
		fetch(`${apiGet}?api_key=${apiKey}&ids=${localStorage.getItem('myGifos')}`)
			.then(res => res.json())
			.then(resParsed => resParsed.data.map(gif => newGridBoxBusqueda(gif)))
			.catch(error => console.log(error));
	}
}

function newGridBoxBusqueda(gif) {
	let newGridBox = document.createElement('div');
	newGridBox.className = 'grid-box';
	newGridBox.innerHTML = `
		<img class='gif' src='${gif.images.downsized.url}' />
	`;
	document.getElementById('myGrid').appendChild(newGridBox);
}

function menuDesplegableOnClick() {
	const linkGifos = document.getElementById('menuDesplegable');
	linkGifos.classList.toggle('active');
}

function clearGifs() {
	const grid = document.getElementById('myGrid');
	let child = grid.lastElementChild;
	while (child) {
		grid.removeChild(child);
		child = grid.lastElementChild;
	}
}

persistenceTheme();
fetchLastGif();
loadMyGifos();
