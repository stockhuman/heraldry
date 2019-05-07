import React, { Component } from 'react';

import { Shape, Divisions, Ordinaries, Charge } from './components/escutcheon';
import emoji from './components/emoji'
import colors from './components/colors'

export default class Generator extends Component {

	constructor (props) {
		super(props)
		this.state = {
			shape: '',
			design: 'ordinary',
			divisions: 'plain',
			ordinaries: 'bend-sinister',
			charge: emoji('recommended'),
			colors: ['#f4f606', '#d7d0f3']
		}
		this.randomise = this.randomise.bind(this)
	}

	componentDidMount() {
		document.addEventListener('keydown', this.randomise);
  }

  componentWillUnmount() {
		document.removeEventListener('keydown', this.randomise);
  }

	randomise () {
		const shapes = [
			'', // default, old french
			'swiss',
			'french',
			'papal',
			'spanish'
		]
		const divisions = [
			'party per pale',
			'party per fess',
			'plain'
		]
		const ordinaries = [
			'cross',
			'fess',
			'pale',
			'bend',
			'bend-sinister',
			'plain',
			'chief'
		]
		const designs = ['ordinary', 'divided']
		this.setState({
			shape: shapes[Math.floor(Math.random() * shapes.length)],
			design: designs[Math.floor(Math.random() * designs.length)],
			divisions: divisions[Math.floor(Math.random() * divisions.length)],
			ordinaries: ordinaries[Math.floor(Math.random() * ordinaries.length)],
			charge: emoji('recommended'),
			colors: colors()
		})
	}

	render () {
		return (
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" id="shield"
			 viewBox="0 0 603 704" enableBackground="new 0 0 603 704">
				<clipPath id="escutcheon"><use xlinkHref="#clipMain"/></clipPath>
				<use clipPath="url(#shieldPath)" />

				<defs><Shape type={this.state.shape} /></defs>
				{ this.state.design === 'ordinary'
					? <Ordinaries type={this.state.ordinaries} colors={this.state.colors} />
					: <Divisions type={this.state.divisions} colors={this.state.colors} />
				}
				<Charge charge={this.state.charge} color={this.state.colors[2]} />
			</svg>
		)
	}
}
