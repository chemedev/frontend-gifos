document.getElementById('btnElegirTema').addEventListener('click', menuDesplegableOnClick);
document.getElementById('opcionLight').addEventListener('click', lightTheme);
document.getElementById('opcionDark').addEventListener('click', darkTheme);
document.getElementById('logo').addEventListener('click', () => (document.location.href = '/'));
document.getElementById('btnCancelar').addEventListener('click', () => (document.location.href = '/'));
document.getElementById('btnComenzar').addEventListener('click', () => (document.location.href = '/upload.html'));

document.getElementById('crearGifos').addEventListener('click', () => (document.location.href = '/misgifos.html'));

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
