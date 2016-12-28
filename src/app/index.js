import { Loop, Stage, World, Body, Sprite, KeyListener } from 'react-game-kit';
import React, { Component } from 'react';
import Game from './game';

/**
 * @class App
 *
 * @description
 * This is the main entry to the react app, sets up event
 * listeners and other things that are needed for the
 * rest of the game
 *
 */
export default class App extends Component {

	/**
	 * @constructor
	 * @param props
	 */
	constructor (props) {
		super();

		this.state = {
			facing: 0
		};

		this.keyListener = new KeyListener();
	}

	/**
	 * @description
	 * React Lifecycle Method
	 * Sets up event listeners when the component is mounted to the DOM
	 *
	 */
	componentDidMount () {
		this.keyListener.subscribe([
			this.keyListener.LEFT,
			this.keyListener.RIGHT,
			this.keyListener.UP,
			this.keyListener.SPACE
		]);
	}

	/**
	 * @description
	 * React Lifecycle Method
	 * removes event listeners when the component is gone
	 *
	 */
	componentWillUnmount() {
		this.keyListener.unsubscribe();
	}

	/**
	 * @description
	 * React Render Method
	 *
	 * @returns {XML}
	 */
	render () {
		return (
			<Loop>
				<Stage>
					<Game keys={this.keyListener} />
				</Stage>
			</Loop>
		);
	}
}