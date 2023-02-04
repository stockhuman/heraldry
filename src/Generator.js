import React, { Component } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import { Shape, Divisions, Ordinaries, Seme } from './components/escutcheon'
import { heraldicColors as colors } from './components/colors'
import Charges from './components/charge'
import emoji from './components/emoji'
import blazon from './components/blazon'

export default class Generator extends Component {

	constructor () {
		super()
		this.state = {
			shape: 'french',
			design: 'divided',
			divisions: 'party per bend',
			ordinaries: '',
			seme: '',
			chargeCount: 2,
			charge: emoji('recommended'),
			altCharge: emoji('alt'),
			colors: ['vert', 'argent', 'sable'],
			emojiSource: 'recommended',
			description: ''
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

			const backgrounds = [
				'#69d2e7',
				'#a7dbd8',
				'#e0e4cc',
				'#f38630',
				'#fa6900',
				'#fe4365',
				'#fc9d9a',
				'#f9cdad',
				'#c8c8a9',
				'#83af9b',
			]

			const shapes = [
				'', // default, old french
				'swiss',
				'french',
				'papal',
				'spanish'
			]
			const divisions = [
				'', // default, solid field
				'party per bend',
				'party per pale',
				'party per fess',
				'party per quartely',
				'party per chevron',
				'party per pale indented',
				'party per fess embattled',
			]
			const ordinaries = [
				'', // default, solid field
				'cross',
				'pale',
				'bend',
				'bend-sinister',
				'chief',
				'saltire',
				'pile',
				'gyronny',
			]
			const designs = ['ordered', 'divided']
			const patterns = [
				'', // disabled semees for now
				// 'fleur-de-lys',
				// 'barry-dancetty',
				// 'masoned',
				// 'lozengy'
			]

			// set background color as well, for Twitter
			document.body.style.backgroundColor = random(backgrounds)

			this.setState({
				shape: random(shapes),
				design: random(designs),
				divisions: random(divisions),
				ordinaries: random(ordinaries),
				seme: random(patterns),
				chargeCount: Math.max(1, Math.floor(Math.random() * 10)),
				charge: emoji(this.state.emojiSource),
				altCharge: emoji('alt'),
				colors: colors(),
			})

			// // DEBUG
			// this.setState({
			// 	shape: '',
			// 	design: 'ordered',
			// 	divisions: '',
			// 	ordinaries: 'gyronny',
			// 	chargeCount:  Math.max(1, Math.floor(Math.random() * 6)),
			// 	charge: emoji(this.state.emojiSource),
			// 	altCharge: emoji('alt'),
			// 	colors: colors(),
			// })

			// State must be set to properly blazon
			this.setState({ description: blazon(this.state) })
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
				<filter id="dropshadow" height="130%">
					<feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
					<feOffset dx="0" dy="0" result="offsetblur"/>
					<feComponentTransfer>
						<feFuncA type="linear" slope="0.5"/>
					</feComponentTransfer>
					<feMerge>
						<feMergeNode/>
						<feMergeNode in="SourceGraphic"/>
					</feMerge>
				</filter>
			</svg>
		)
	}
}
