import 'babel-polyfill';

document.addEventListener("DOMContentLoaded",() => {

	if (document.querySelector('.game')) {
		setTimeout(() => {
			alert('game under construction, you SOB');
		}, 5000)
	}

});
