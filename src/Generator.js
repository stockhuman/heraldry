import React, { Component } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import { Shape, Divisions, Ordinaries, Seme } from './components/escutcheon'
import Charges from './components/charge'
import emoji from './components/emoji'
import colors from './components/colors'

import { sanitizeEmoji } from './components/util/strings'

export default class Generator extends Component {

	constructor (props) {
		super(props)
		this.state = {
			shape: 'swiss',
			design: 'divided',
			divisions: 'party per pale',
			ordinaries: 'chief',
			seme: 'fleur-de-lys',
			chargeCount: 6,
			charge: emoji('recommended'),
			colors: ['#2c6', '#ddd', '#c61'],
			emojiSource: 'recommended'
		}
		this.randomise = this.randomise.bind(this)
	}

	componentDidMount() {
		document.addEventListener('keydown', this.randomise)
		document.addEventListener('click', this.randomise)
		window.addEventListener('touchstart', this.randomise)
  }

  componentWillUnmount() {
		document.removeEventListener('keydown', this.randomise)
		document.removeEventListener('click', this.randomise)
		window.removeEventListener('touchstart', this.randomise)
  }

	randomise (event) {
		// catch the 's' key / two finger tap and save instead of randomising
		if ((event.touches && event.touches.length === 2) || event.key === 's') {
			this.save()
		} else {
			const random = arr => arr[Math.floor(Math.random() * arr.length)]

			const shapes = [
				'', // default, old french
				'swiss',
				'french',
				'papal',
				'spanish'
			]
			const divisions = [
				'', // default, solid field
				'party per pale',
				'party per fess',
				'party per quartely'
			]
			const ordinaries = [
				'', // default, solid field
				'cross',
				'fess',
				'pale',
				'bend',
				'bend-sinister',
				'chief'
			]
			const designs = ['ordered', 'divided']
			const patterns = [
				'',
				'fleur-de-lys',
				'star',
				'chevron',
				'masoned',
				'lozengy'
			]

			this.setState({
				shape: random(shapes),
				design: random(designs),
				divisions: random(divisions),
				ordinaries: random(ordinaries),
				seme: random(patterns),
				chargeCount: Math.max(1, Math.floor(Math.random() * 10)),
				charge: emoji(this.state.emojiSource),
				colors: colors()
			})
		}
	}

	save () {
		// Clone the node to alter it in place without damaging the react app
		const svg = document.getElementsByTagName('svg')[0].cloneNode(true)

		// convert UTF-16 emojis into escaped characters
		svg.outerHTML = sanitizeEmoji(svg.outerHTML)
		saveSvgAsPng(svg, `eschucheon_${Date.now()}.png`)
	}

	render () {
		const { shape, chargeCount, colors, seme, divisions, ordinaries, design } = this.state
		return (
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" id="shield"
			 viewBox="0 0 603 704" enableBackground="new 0 0 603 704">
				<clipPath id="escutcheon"><use xlinkHref="#clipMain"/></clipPath>
				<use clipPath="url(#shieldPath)" />

				<defs>
					<Shape type={shape} />
					<Seme type={seme} colors={colors} />
				</defs>

				{ design === 'ordered'
					? <Ordinaries type={ordinaries} colors={colors} />
					: <Divisions type={divisions} colors={colors} pattern={seme}/>
				}
				<Charges state={this.state} count={chargeCount} alt={emoji('alt')}/>
			</svg>
		)
	}
}
