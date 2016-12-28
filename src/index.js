import 'babel-polyfill';
import App from './app';
import ReactDOM from 'react-dom'
import React, { Component } from 'react';

document.addEventListener("DOMContentLoaded",() => {

	if (document.querySelector('.game')) {
		ReactDOM.render(
			<App />,
			document.querySelector('.game')
		)
	}

});
