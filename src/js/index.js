'use strict';

const api = 'https://api.giphy.com/v1/gifs/';
const sug1 = document.querySelector('#sug1');
const sug2 = document.querySelector('#sug2');
const sug3 = document.querySelector('#sug3');
const txtSearch = document.querySelector('#buscar_rec');
const popupDesplegable = document.querySelector('#popupDesplegable');
const menuDesplegable = document.querySelector('#menuDesplegable');

let spaceIndex = 0,
	cont = 0;

document.getElementById('btnElegirTema').addEventListener('click', menuDesplegableOnClick);
document.getElementById('opcionLight').addEventListener('click', lightTheme);
document.getElementById('opcionDark').addEventListener('click', darkTheme);
document.getElementById('logo').addEventListener('click', () => (document.location.href = '/src/html'));
document.getElementById('crearGifos').addEventListener('click', () => {
	localStorage.setItem('newGifos', true);
	document.location.href = '/src/html/misgifos.html';
	localStorage.setItem('hasUploaded', false);
});
document.getElementById('misGifos').addEventListener('click', () => {
	localStorage.setItem('newGifos', false);
	localStorage.setItem('hasUploaded', false);
	document.location.href = '/src/html/misgifos.html';
});

sug1.addEventListener('mousedown', () => busqueda(`'${sug1.innerHTML}'`), true);
sug2.addEventListener('mousedown', () => busqueda(`'${sug2.innerHTML}'`), true);
sug3.addEventListener('mousedown', () => busqueda(`'${sug3.innerHTML}'`), true);

txtSearch.addEventListener('click', () => (txtSearch.value = ''));

document.getElementById('busqueda').addEventListener('click', () => {
	if (txtSearch.value.length != 0) busqueda(txtSearch.value);
});

txtSearch.addEventListener('blur', () => inputBuscarOnBlur());

txtSearch.addEventListener('keyup', e => {
	if (e.keyCode == 32) {
		inputBuscarOnKeyUp();
		inputBuscarOnClick();
	}
	if (e.key == 'Enter') {
		busqueda(txtSearch.value);
		popupDesplegable.classList.remove('active');
	}
});

function persistenceTheme() {
	if (localStorage.theme != undefined) {
		document.documentElement.dataset.theme = localStorage.getItem('theme');
		if (localStorage.getItem('theme') == 'light') {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', '../../img/gifOF_logo.png');
			const lupa = document.getElementById('lupa');
			lupa.style.backgroundImage = 'url(/img/lupa_inactive.svg)';
		} else {
			const logo = document.getElementById('logo');
			logo.setAttribute('src', '../../img/gifOF_logo_dark.png');
			const lupa = document.getElementById('lupa');
			lupa.style.backgroundImage = 'url(/img/combined_shape.svg)';
		}
	}
}

function sugerencias() {
	if (localStorage.lastSearch != undefined) {
		const sectionSugerencias = document.getElementById('sugerencias');
		sectionSugerencias.style.display = 'block';
		const found = fetch(`${api}search?api_key=${apiKey}&limit=4&q=${localStorage.getItem('lastSearch')}`)
			.then(response => response.json())
			.then(parsedResponse => parsedResponse.data.map(gif => newGridBoxSugerencias(gif)))
			.catch(error => console.log(error));
		return found;
	}
}

function tendencias() {
	const found = fetch(`${api}trending?api_key=${apiKey}&limit=12`)
		.then(response => response.json())
		.then(parsedResponse => parsedResponse.data.map(gif => newGridBoxTendencias(gif)))
		.catch(error => console.log(error));
	return found;
}

//! Carga palabras tipeadas en btns bajo cuadro de búsqueda
function inputBuscarOnKeyUp() {
	let valueBuscar = document.getElementById('buscar_rec').value;
	let anySpace = valueBuscar.includes(' ', spaceIndex);
	if (spaceIndex != 0 && cont == 2) {
		sug3.style.display = 'block';
		sug3.innerHTML = valueBuscar;
		return;
	}
	if (spaceIndex != 0 && cont == 1) {
		sug2.style.display = 'block';
		let stringSplit = valueBuscar.split(' ');
		sug2.innerHTML = stringSplit[0] + ' ' + stringSplit[1];
		spaceIndex = valueBuscar.length;
		cont++;
		return;
	}
	if (anySpace && spaceIndex == 0) {
		sug1.innerHTML = valueBuscar;
		sug1.style.display = 'block';
		spaceIndex = valueBuscar.length;
		cont++;
	}
}

function newGridBoxSugerencias(gif) {
	let newGridBox = document.createElement('div');
	let gifTitle = gif.title.split(' ');
	gifTitle.pop();
	const gifTitleBusqueda = gifTitle.join(' ');
	gifTitle = gifTitle.join('');
	newGridBox.className = 'grid-box';
	newGridBox.id = gif.id;
	newGridBox.innerHTML = `
					<div class="topBar">
						<h2 class="topBar-text">#${gifTitle}</h2>
						<img src="../../img/close.svg" class="btnClose" onclick="removeGif('${newGridBox.id}')" />
					</div>
					<div class="grid-gif">
						<img class="gifSugerencia" src="${gif.images.downsized.url}" />
					</div>
					<button class="grid-btn" type="button" onclick="busqueda('${gifTitleBusqueda}')">Ver más</button>
				`;
	document.getElementById('gridSugerencias').appendChild(newGridBox);
}

function newGridBoxTendencias(gif) {
	let newGridBox = document.createElement('div');
	newGridBox.className = 'grid-box';
	newGridBox.innerHTML = `
		<img class='gif' src='${gif.images.downsized.url}' />
	`;
	document.getElementById('gridTendencias').appendChild(newGridBox);
}

function busqueda(search) {
	clearGifs();
	localStorage.setItem('lastSearch', search);
	const btnsBuscar = document.getElementById('buscar-ejemplos');
	const sectionResultados = document.getElementById('resultados');
	const sectionTendencias = document.getElementById('tendencias');
	const sectionSugerencias = document.getElementById('sugerencias');
	document.querySelector('#titleBusqueda').innerHTML = search;
	txtSearch.value = '';
	const found = fetch(`${api}search?api_key=${apiKey}&limit=12&q=${search}`)
		.then(response => response.json())
		.then(parsedResponse => parsedResponse.data.map(gif => newGridBoxBusqueda(gif)))
		.catch(error => console.log(error));
	btnsBuscar.style.display = 'block';
	sectionResultados.style.display = 'block';
	sectionTendencias.style.display = 'none';
	sectionSugerencias.style.display = 'none';
	document.getElementById('buscar_rec').value = '';
	return found;
}

//! Cierra gif de sugs con close.svg.
function removeGif(gif) {
	document.getElementById(gif).remove();
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
	menuDesplegable.classList.toggle('active');
}

function inputBuscarOnClick() {
	const dataset = document.documentElement.dataset.theme == 'light'; //!OPTIMIZAR
	if (sug1.style.innerHTML != '') {
		popupDesplegable.classList.add('active');
	}
	const lupa = document.getElementById('lupa');
	lupa.style.backgroundImage = 'url(/img/lupa.svg)';
	if (dataset) lupa.style.backgroundImage = 'url(/img/lupa.svg)';
	else lupa.style.backgroundImage = 'url(/img/lupa_dark.svg)';
	const btnBuscar = document.querySelector('.btn-buscar');
	btnBuscar.classList.add('input');
}

function inputBuscarOnBlur() {
	const dataset = document.documentElement.dataset.theme == 'light'; //!OPTIMIZAR
	popupDesplegable.classList.remove('active');
	const lupa = document.getElementById('lupa');
	if (dataset == true) lupa.style.backgroundImage = 'url(/img/lupa_inactive.svg)';
	else lupa.style.backgroundImage = 'url(/img/combined_shape.svg)';
	const btnBuscar = document.querySelector('.btn-buscar');
	btnBuscar.classList.remove('input');
	sug1.style.display = 'none';
	sug2.style.display = 'none';
	sug3.style.display = 'none';
	sug1.innerHTML = '';
	sug3.innerHTML = '';
	sug2.innerHTML = '';
	spaceIndex = 0;
	cont = 0;
}

//! Limpia la última búsqueda
function clearGifs() {
	const grid = document.getElementById('myGrid');
	let child = grid.lastElementChild;
	while (child) {
		grid.removeChild(child);
		child = grid.lastElementChild;
	}
}

//! Comprobamos el tema elegido en LclStrg y load de sugs/trends
persistenceTheme();
sugerencias();
tendencias();
