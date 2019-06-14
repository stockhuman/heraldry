import React, { Component } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import { Shape, Divisions, Ordinaries, Seme } from './components/escutcheon'
import { heraldicColors as colors } from './components/colors'
import Charges from './components/charge'
import emoji from './components/emoji'
import blazon from './components/blazon'

export default class Generator extends Component {

	constructor (props) {
		super(props)
		this.state = {
			shape: 'spanish',
			design: 'ordered',
			divisions: '',
			ordinaries: 'chief',
			seme: '',
			chargeCount: 4,
			charge: emoji('recommended'),
			altCharge: emoji('alt'),
			colors: ['#56e39f', '#f4f4f4', '#0f0f0f'],
			emojiSource: 'recommended',
			description: ''
		}
		this.randomise = this.randomise.bind(this)
	}

	componentDidMount() {
		document.addEventListener('keydown', this.randomise)
		document.addEventListener('click', this.randomise)
		window.addEventListener('touchstart', this.randomise)
		this.randomise()
  }

  componentWillUnmount() {
		document.removeEventListener('keydown', this.randomise)
		document.removeEventListener('click', this.randomise)
		window.removeEventListener('touchstart', this.randomise)
	}

	randomise (event) {
		// catch the 's' key / two finger tap and save instead of randomising
		if (event && ((event.touches && event.touches.length === 2) || event.key === 's')) {
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
				'pale',
				'bend',
				'bend-sinister',
				'chief',
				'saltire'
			]
			const designs = ['ordered', 'divided']
			const patterns = [
				'', // disabled semees for now
				// 'fleur-de-lys',
				// 'barry-dancetty',
				// 'masoned',
				// 'lozengy'
			]

			let state = {
				shape: random(shapes),
				design: random(designs),
				divisions: random(divisions),
				ordinaries: random(ordinaries),
				seme: random(patterns),
				chargeCount: Math.max(1, Math.floor(Math.random() * 10)),
				charge: emoji(this.state.emojiSource),
				altCharge: emoji('alt'),
				colors: colors()
			}

			this.setState({ ...state, description: blazon(state)})
		}
	}

	async save () {
		const svg = document.getElementsByTagName('svg')[0]

		await saveSvgAsPng(svg, `eschucheon_${Date.now()}.png`)
	}

	render () {
		const {
			shape,
			chargeCount,
			altCharge,
			colors,
			seme,
			divisions,
			ordinaries,
			design,
			description
		} = this.state

		return (
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" id="shield"
			 viewBox="0 0 603 704" enableBackground="new 0 0 603 704" data-description={description}>
				<clipPath id="escutcheon"><use xlinkHref="#clipMain"/></clipPath>
				<use clipPath="url(#shieldPath)" />

				<defs>
					<Shape type={shape} />
					<Seme type={seme} colors={colors} />
				</defs>

				{ design === 'ordered'
					? <Ordinaries type={ordinaries} colors={colors} pattern={seme} />
					: <Divisions type={divisions} colors={colors} pattern={seme} />
				}
				<Charges state={this.state} count={chargeCount} alt={altCharge}/>
			</svg>
		)
	}
}
