'use strict';

document.getElementById('arrow').addEventListener('click', () => (document.location.href = '/src/html'));
document.getElementById('logo').addEventListener('click', () => (document.location.href = '/src/html'));
document.getElementById('btnCancelar').addEventListener('click', () => (document.location.href = '/src/html'));
document.getElementById('btnComenzar').addEventListener('click', () => (document.location.href = '/src/html/upload.html'));

const sectionCrearGifos = document.querySelector('.crearGifos');
const sectionGifoSubido = document.querySelector('.gifoSubido');

const apiGet = 'https://api.giphy.com/v1/gifs';

if (localStorage.newGifos == 'true') {
	sectionCrearGifos.style.display = 'block';
} else if (localStorage.hasUploaded == 'true') {
	sectionGifoSubido.style.display = 'block';
	localStorage.hasUploaded = false;
} else {
	sectionCrearGifos.style.display = 'none';
	sectionGifoSubido.style.display = 'none';
}

function persistenceTheme() {
	if (localStorage.getItem('theme') != null) {
		document.documentElement.dataset.theme = localStorage.getItem('theme');
		if (localStorage.getItem('theme') == 'light') {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', '/img/gifOF_logo.png');
			// const lupa = document.getElementById('lupa');
			// lupa.style.backgroundImage = 'url(../img/lupa_inactive.svg)';
		} else {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', '/img/gifOF_logo_dark.png');
			// const lupa = document.getElementById('lupa');
			// lupa.style.backgroundImage = 'url(../img/combined_shape.svg)';
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
						<img src="img/close.svg" />
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
loadMyGifos();
