'use strict';

const apiKey = 'tE63cJMHJADHunmLcQ6AoRy8BkwkOAuu';
const apiGet = 'https://api.giphy.com/v1/gifs';

function lightTheme() {
	document.documentElement.setAttribute('data-theme', 'light');
	localStorage.setItem('theme', 'light');

	const logo = document.getElementById('logo');
	logo.setAttribute('src', '../../img/gifOF_logo.png');
	const lupa = document.getElementById('lupa');
	lupa.style.backgroundImage = 'url(../../img/lupa_inactive.svg)';

	menuDesplegableOnClick();
}

function darkTheme() {
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('theme', 'dark');

	const logo = document.getElementById('logo');
	logo.setAttribute('src', '../../img/gifOF_logo_dark.png');
	const lupa = document.getElementById('lupa');
	lupa.style.backgroundImage = 'url(../../img/combined_shape.svg)';

	menuDesplegableOnClick();
}
