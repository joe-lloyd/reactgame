import { Sprite } from 'react-game-kit';
import React, { Component, PropTypes } from 'react';

/**
 * @class App
 *
 * @description
 * This is the main entry to the react app, sets up event
 * listeners and other things that are needed for the
 * rest of the game
 *
 */
export default class Game extends Component {

	static contextTypes = {
		loop: PropTypes.object,
	};

	static propTypes = {
		keys: PropTypes.object
	};

	/**
	 * @constructor
	 * @param props
	 */
	constructor (props) {
		super();

		this.state = {
			facing: 0,
			isMoving: false,
			steps: [0, 0, 0, 0]
		};
	}

	/**
	 * @description
	 * React Lifecycle Method
	 * Sets up event listeners when the component is mounted to the DOM
	 *
	 */
	componentDidMount () {
		this.context.loop.subscribe(this.update);
		console.log(this.props.keys)
	}

	/**
	 * @description
	 * React Lifecycle Method
	 * removes event listeners when the component is gone
	 *
	 */
	componentWillUnmount() {
		this.context.loop.unsubscribe(this.update);
	}

	/**
	 * @description
	 * React Render Method
	 *
	 * @returns {XML}
	 */
	render () {
		return (
			<Sprite repeat={this.state.isMoving}
					scale={0.4}
					offset={[0, 10]}
					state={this.state.facing}
					steps={this.state.steps}
					tileHeight={2400/4}
					tileWidth={1841/4}
					src="./sprites/test2.png" />
		);
	}

	update = () => {
		this.checkKeys();
	};

	checkKeys = () => {
		const { keys } = this.props;

		if (keys.isDown(keys.SPACE)) {
			this.setState({facing: 0, isMoving: true, steps: [3, 3, 3, 3]})
		} else {
			this.setState({isMoving: false});
		}

		if (keys.isDown(keys.LEFT)) {
			this.setState({facing: 2, isMoving: true, steps: [3, 3, 3, 3]})
		} else {
			this.setState({isMoving: false});
		}

		if (keys.isDown(keys.RIGHT)) {
			this.setState({facing: 1, isMoving: true, steps: [3, 3, 3, 3]})
		} else {
			this.setState({isMoving: false});
		}

		if (keys.isDown(keys.UP)) {
			this.setState({facing: 3, isMoving: true, steps: [3, 3, 3, 3]})
		} else {
			this.setState({isMoving: false});
		}
	}
}