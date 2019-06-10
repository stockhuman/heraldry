import React, { Component } from 'react'
import { saveSvgAsPng } from 'save-svg-as-png'

import { Shape, Divisions, Ordinaries, Seme } from './components/escutcheon'
import Charges from './components/charge'
import emoji from './components/emoji'
import colors from './components/colors'

export default class Generator extends Component {

	constructor (props) {
		super(props)
		this.state = {
			shape: '',
			design: 'divided',
			divisions: '',
			ordinaries: '',
			seme: 'fleur-de-lys',
			chargeCount: 2,
			charge: emoji('recommended'),
			colors: ['#2c6', '#ddd', '#c61'],
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
		} else if (event.key === 'd') {
			this.describe()
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

	async save () {
		const svg = document.getElementsByTagName('svg')[0]

		await saveSvgAsPng(svg, `eschucheon_${Date.now()}.png`)
	}

	describe() {
		// via https://en.wikipedia.org/wiki/Blazon
		const { colors, design, divisions, ordinaries, seme, charge } = this.state
		let isPlain = false // plain field
		let variation = ''
		let blazon

		if (design === 'divided' && divisions === '') { isPlain = true }
		if (design === 'ordered' && ordinaries === '') { isPlain = true }

		if (seme) {
			switch (seme) {
				case 'masoned': variation = ` masoned ${colors[2]}`; break
				case 'fleur-de-lys': variation = ` semé-de-lys Or and ${colors[1]}`; break
				default: variation = ` semé of ${seme} ${colors[2]} and ${colors[1]}`
			}
		}

		if (isPlain) {
			blazon = `${colors[0]}${variation}, ${charge}`
		} else {
			if (design === 'divided') {
				blazon = `${divisions} ${colors[0]} and ${colors[1]}, `
			} else {
				blazon = `${colors[0]}${variation}, ${ordinaries}`
			}
		}
		console.log(blazon)
	}

	render () {
		const { shape, chargeCount, colors, seme, divisions, ordinaries, design, description } = this.state
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
					? <Ordinaries type={ordinaries} colors={colors} />
					: <Divisions type={divisions} colors={colors} pattern={seme}/>
				}
				<Charges state={this.state} count={chargeCount} alt={emoji('alt')}/>
			</svg>
		)
	}
}
