'use strict';

const api = 'https://api.giphy.com/v1/gifs/';
const key = 'tE63cJMHJADHunmLcQ6AoRy8BkwkOAuu';

document.getElementById('busqueda').addEventListener('click', busqueda);
document.getElementById('buscar_rec').addEventListener('click', inputBuscarOnClick);
document.getElementById('buscar_rec').addEventListener('blur', inputBuscarOnBlur);
document.getElementById('buscar_rec').addEventListener('keyup', inputBuscarOnKeyUp);
document.getElementById('btnElegirTema').addEventListener('click', menuDesplegableOnClick);
document.getElementById('opcionLight').addEventListener('click', lightTheme);
document.getElementById('opcionDark').addEventListener('click', darkTheme);
document.getElementById('logo').addEventListener('click', link => document.location.href="/")

sugerencias();

function sugerencias() {
	const found = fetch(`${api}trending?api_key=${key}&limit=4`)
		.then(response => response.json())
		.then(parsedResponse => parsedResponse.data.map(gif => newGridBoxSugerencias(gif)))
		.catch(error => console.log(error));
	return found;
}

function newGridBoxSugerencias(gif) {
	let newGridBox = document.createElement('div');
	newGridBox.className = 'grid-box';
	newGridBox.innerHTML = `
					<div class="topBar light">
						<h2 class="topBar-text">${gif.title}</h2>
						<img src="img/close.svg" />
					</div>
					<div class="grid-gif">
						<img class="gifSugerencia" src="${gif.images.original.url}" />
					</div>
					<button class="grid-btn light" type="button">Ver más</button>
				`;
	document.getElementById('gridSugerencias').appendChild(newGridBox);
}

function busqueda() {
	clearGifs();
	const search = document.getElementById('buscar_rec').value;
	const found = fetch(`${api}search?api_key=${key}&limit=12&q=${search}`)
		.then(response => response.json())
		.then(parsedResponse => parsedResponse.data.map(gif => newGridBoxBusqueda(gif)))
		.catch(error => console.log(error));
	return found;
}

function newGridBoxBusqueda(gif) {
	let newGridBox = document.createElement('div');
	newGridBox.className = 'grid-box';
	newGridBox.innerHTML = `
		<img class='gif' src='${gif.images.original.url}' />
	`;
	document.getElementById('myGrid').appendChild(newGridBox);
}

function menuDesplegableOnClick() {
	const linkGifos = document.getElementById('menuDesplegable');
	linkGifos.classList.toggle('active');
}

function inputBuscarOnClick() {
	const txtBuscar = document.body.classList.contains('light'); //!OPTIMIZAR
	const linkGifos = document.getElementById('popupDesplegable');
	linkGifos.classList.add('active');
	const lupa = document.getElementById('lupa');
	lupa.style.backgroundImage = 'url(../img/lupa.svg)';
	if (txtBuscar) lupa.style.backgroundImage = 'url(../img/lupa.svg)';
	else lupa.style.backgroundImage = 'url(../img/lupa_dark.svg)';
	const btnBuscar = document.querySelector('.btn-buscar');
	btnBuscar.classList.add('input');
}

function inputBuscarOnBlur() {
	const txtBuscar = document.body.classList.contains('light'); //!OPTIMIZAR
	const linkGifos = document.getElementById('popupDesplegable');
	linkGifos.classList.remove('active');
	const lupa = document.getElementById('lupa');
	if (txtBuscar == true) lupa.style.backgroundImage = 'url(../img/lupa_inactive.svg)';
	else lupa.style.backgroundImage = 'url(../img/combined_shape.svg)';
	const btnBuscar = document.querySelector('.btn-buscar');
	btnBuscar.classList.remove('input');
}

function inputBuscarOnKeyUp() {}

function lightTheme() {
	document.documentElement.setAttribute('data-theme', 'light');

	const logo = document.getElementById('logo');
	logo.setAttribute('src', 'img/gifOF_logo.png');

	const lupa = document.getElementById('lupa');
	lupa.style.backgroundImage = 'url(../img/lupa_inactive.svg)';

	menuDesplegableOnClick();
}

function darkTheme() {
	document.documentElement.setAttribute('data-theme', 'dark');

	const logo = document.getElementById('logo');
	logo.setAttribute('src', 'img/gifOF_logo_dark.png');

	const lupa = document.getElementById('lupa');
	lupa.style.backgroundImage = 'url(../img/combined_shape.svg)';

	menuDesplegableOnClick();
}

function clearGifs() {
	const grid = document.getElementById('myGrid');
	let child = grid.lastElementChild;
	while (child) {
		grid.removeChild(child);
		child = grid.lastElementChild;
	}
}

//! Define si es un GIF portrait o landscape
// let gifWidth = data.data[i].images.original.width;
// let gifHeight = data.data[i].images.original.height;
//! Falta modificar tamaño en CSS y auto-fit para el GRID
// if (gifWidth / gifHeight < 1.77) {
// 	newGridBox('normal');
// } else {
// 	newGridBox('large');
// }

//! Toma último CHILD del GRID y le asigna GIF (w/o template strings)
// let grid = document.getElementById('myGrid').lastChild;
// grid.firstChild.setAttribute('src', gif);
// grid.firstChild.src = gif;

// appendElements = elements => {
// 	const gifsWrapper = document.querySelector('.gifs-wrapper');
// 	gifsWrapper.innerHTML = '';
// 	elements.map(element => {
// 		const image = document.createElement('img');
// 		image.classList.add('gif-thumb');
// 		image.src = element.images.original.url;
// 		gifsWrapper.append(image);
// 	});
// };

// divGif.style.width = '100%';
// divGif.style.height = '90%';
// divGif.style.backgroundRepeat = 'no-repeat';

// function lightTheme() {
	// const theme = document.querySelectorAll('.dark'); 									//! 1
	// const theme = [...document.getElementsByClassName('dark')]; 				//! 2
	// const theme = Array.from(document.getElementsByClassName('dark'));	//! 3
	// const theme = document.getElementsByClassName('dark');							//! 4
	//! map para recorrer ARRAY (ojo)																				2 3
	// theme.map(element => element.classList.replace('dark', 'light'));
	//! forEach para recorrer NodeList																			1 2 3
	// theme.forEach(element => {
	// 	element.classList.replace('dark', 'light');
	// });
	//! for of para recorrer NodeList																				1 2 3
	// for (let item of theme) item.classList.replace('dark', 'light');
	//! for invertido para recorrer HTML Collection													4
	// for (let i = theme.length - 1; i >= 0; i--)
	// 	theme[i].classList.replace('dark', 'light');
	// menuDesplegableOnClick();
// }