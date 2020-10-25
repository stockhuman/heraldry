import React from 'react'
import { Charge } from './escutcheon'

// this function computes where changes may go, given the design
export default function Charges({ state, count = 1, alt }) {
	let placedCharges = [] // array of <Charges />
	let maxCharges = 0 // some designs have a maximum count
	let chargeSize = 140 // default for 1 charge
	let placements = [] // [] store of possible X/Y values to charges
	let isPlain = false // is the shield an open field?

	const { shape, design, divisions, ordinaries, charge } = state

	// adjusts placement of charges to fit better on varying shields
	const adjustX = (array, direction, adjustment, size = 1) => {
		let a = array

		for (let i = a.length - 1; i >= 0; i--) {
			let e = a[i] // a placement object

			if (direction === 'in') {
				if (e.x < 300) e.x += adjustment
				if (e.x > 300) e.x -= adjustment
			}
			if (direction === 'out') {
				if (e.x < 300) e.x -= adjustment
				if (e.x > 300) e.x += adjustment
			}

			if (e.size) {
				e.size *= size
			}
			a[i] = e
		}

		return a
	}

	const adjustY = (array, direction, adjustment) => {
		let a = array

		for (let i = a.length - 1; i >= 0; i--) {
			let e = a[i] // a placement object

			if (direction === 'in') {
				if (e.y < 350) e.y += adjustment
				if (e.y > 350) e.y -= adjustment
			}
			if (direction === 'out') {
				if (e.y < 350) e.y -= adjustment
				if (e.y > 350) e.y += adjustment
			}
			if (direction === '') {
				e.y += adjustment // adjust all in one direction
			}
			a[i] = e
		}

		return a
	}

	// test if the designs have no partitions, given what's enabled
	if (design === 'divided' && divisions === '') {
		isPlain = true
	}
	if (design === 'ordered' && ordinaries === '') {
		isPlain = true
	}

	if (isPlain) {
		maxCharges = 1
		placements = [
			// central
			[ { x: 301, y: 340, size: 200 } ],
		]
	} else {
		// the field has a design on it
		if (design === 'divided') {
			switch (divisions) {
				// divides along the middle
				case 'party per pale indented':
				case 'party per pale':
					placements = [
						// central
						[ { x: 300, y: 340, size: 300 } ],
						// distrubuted horizontal
						[ { x: 160, y: 360 }, { x: 440, y: 360 } ],
						[
							// three along dexter
							{ x: 440, y: 175, size: 90 },
							{ x: 440, y: 350, size: 90 },
							{ x: 440, y: 525, size: 90 },
						],
						[
							// ante + large on dexter
							{ x: 160, y: 160, size: 90 },
							{ x: 160, y: 330, size: 90 },
							{ x: 160, y: 500, size: 90 },
							{ x: 440, y: 360, size: 190, useAlt: true },
						],
						[
							// ante + 2 large on dexter
							{ x: 160, y: 160, size: 90 },
							{ x: 160, y: 330, size: 90 },
							{ x: 160, y: 500, size: 90 },
							{ x: 430, y: 232, size: 125, useAlt: true },
							{ x: 430, y: 446, size: 125, useAlt: true },
						],
						[
							// 2 columns mirrored
							{ x: 150, y: 160, size: 90 },
							{ x: 150, y: 330, size: 90 },
							{ x: 150, y: 500, size: 90 },
							{ x: 450, y: 160, size: 90, useAlt: true },
							{ x: 450, y: 330, size: 90, useAlt: true },
							{ x: 450, y: 500, size: 90, useAlt: true },
						],
					]
					if (shape === 'swiss' || shape === 'papal') {
						// too skinny
						placements[4] = adjustX(placements[4], 'in', 30)
						placements[5] = adjustX(placements[5], 'in', 30)
					}
					if (shape === 'swiss') {
						// too skinny at tip
						for (let i = 1; i < placements.length; i++) {
							placements[i] = adjustX(placements[i], 'in', 10)
							placements[i] = adjustY(placements[i], 'in', 30)
							placements[i] = adjustY(placements[i], '', -30)
						}
					}
					maxCharges = 6
					break

				case 'party per bend':
					placements = [
						[ { x: 300, y: 335, size: 160 } ],
						[ { x: 440, y: 160 }, { x: 160, y: 490, useAlt: true } ],
						[ { x: 300, y: 335, size: 160 }, { x: 440, y: 160 }, { x: 160, y: 490, useAlt: true } ],
					]
					if (shape === 'swiss') {
						placements[1] = adjustX(placements[1], 'in', 20)
						placements[1] = adjustY(placements[1], '', 10)
					}
					chargeSize = 120
					maxCharges = 3
					break

				// divides horizontally
				case 'party per fess embattled':
				case 'party per fess':
					placements = [
						// central
						[ { x: 300, y: 360, size: 160 } ],
						// distrubuted horizontal in chief
						[ { x: 160, y: 200 }, { x: 440, y: 200 } ],
						// three horizontal
						[ { x: 130, y: 180, size: 100 }, { x: 300, y: 180, size: 100 }, { x: 470, y: 180, size: 100 } ],
						// Ante + larger
						[
							{ x: 130, y: 180, size: 100 },
							{ x: 300, y: 180, size: 100 },
							{ x: 470, y: 180, size: 100 },
							{ x: 300, y: 530, size: 200, useAlt: true },
						],
						// Ante + larger x2
						[
							{ x: 130, y: 180, size: 100 },
							{ x: 300, y: 180, size: 100 },
							{ x: 470, y: 180, size: 100 },
							{ x: 200, y: 500, size: 140, useAlt: true },
							{ x: 400, y: 500, size: 140, useAlt: true },
						],
						// Three across fess, three below it
						[
							{ x: 130, y: 180, size: 100 },
							{ x: 300, y: 180, size: 100 },
							{ x: 470, y: 180, size: 100 },
							{ x: 180, y: 460, size: 100, useAlt: true },
							{ x: 420, y: 460, size: 100, useAlt: true },
							{ x: 300, y: 560, size: 100, useAlt: true },
						],
						// Ante + 1 below
						[
							{ x: 130, y: 180, size: 100 },
							{ x: 300, y: 180, size: 100 },
							{ x: 470, y: 180, size: 100 },
							{ x: 180, y: 490, size: 90, useAlt: true },
							{ x: 420, y: 490, size: 90, useAlt: true },
							{ x: 300, y: 590, size: 90, useAlt: true },
							{ x: 300, y: 390, size: 90, useAlt: true },
						],
					]
					maxCharges = 7
					chargeSize = 100
					if (shape === 'papal') {
						chargeSize = 120
					}
					if (divisions === 'party per fess embattled') {
						maxCharges = 6
						placements[5] = placements[6]
					}
					break

				// divides into quarters
				case 'party per quartely':
					placements = [
						// top left
						[ { x: 160, y: 200 } ],
						// top left x 2
						[ { x: 120, y: 170, size: 80 }, { x: 200, y: 250, size: 80 } ],
						// top left x 3
						[ { x: 110, y: 120, size: 70 }, { x: 210, y: 200, size: 70 }, { x: 110, y: 280, size: 70 } ],
						// top left x 4
						[
							{ x: 110, y: 140, size: 60 },
							{ x: 210, y: 140, size: 60 },
							{ x: 210, y: 240, size: 60 },
							{ x: 110, y: 240, size: 60 },
						],
						// ante + alt
						[
							{ x: 110, y: 140, size: 60 },
							{ x: 210, y: 140, size: 60 },
							{ x: 210, y: 240, size: 60 },
							{ x: 110, y: 240, size: 60 },
							{ x: 450, y: 230, size: 150, useAlt: true },
						],
					]
					maxCharges = 5
					if (shape === 'papal') {
						placements[4] = adjustX(placements[4], 'in', 15)
					}
					if (shape === '') {
						placements[3] = adjustX(placements[3], 'out', 15)
						placements[4] = adjustX(placements[4], 'out', 15)
					}
					break

				// divides horizontally, similarly to per pale
				case 'party per chevron':
					placements = [
						// central
						[ { x: 300, y: 340, size: 200 } ],
						// distrubuted horizontal in chief
						[ { x: 160, y: 200 }, { x: 440, y: 200 } ],
						// three horizontal
						[ { x: 130, y: 180, size: 100 }, { x: 300, y: 180, size: 100 }, { x: 470, y: 180, size: 100 } ],
						// Ante + larger
						[
							{ x: 130, y: 180, size: 100 },
							{ x: 300, y: 180, size: 100 },
							{ x: 470, y: 180, size: 100 },
							{ x: 300, y: 530, size: 120, useAlt: true },
						],
					]
					maxCharges = 4
					chargeSize = 100
					if (shape === 'papal') {
						chargeSize = 120
					}
					break

				default:
					console.log('No division specified')
			}
		}

		if (design === 'ordered') {
			switch (ordinaries) {
				// large cross, little room for othe things
				case 'cross':
					placements = [ [ { x: 300, y: 360 } ] ]
					maxCharges = 1
					break

				// bar across the top
				case 'chief':
					placements = [
						// central
						[ { x: 300, y: 370 } ],
						// distrubuted horizontal
						[ { x: 160, y: 360 }, { x: 440, y: 360 } ],
						// three zig-zag in base
						[ { x: 160, y: 340 }, { x: 440, y: 340 }, { x: 300, y: 530 } ],
						[
							{ x: 160, y: 105, size: 90 },
							{ x: 440, y: 105, size: 90 },
							{ x: 300, y: 105, size: 90 },
							{ x: 300, y: 430, size: 260, useAlt: true },
						],
					]
					if (shape === 'swiss') {
						placements[3] = adjustX(placements[3], '', 0, 0.7)
					}
					maxCharges = 4
					break
				// bar across the top
				case 'fess':
					placements = [
						// central
						[{ x: 300, y: 370, size: 240 }],
						// distrubuted horizontal in chief
						[
							{ x: 160, y: 160 },
							{ x: 440, y: 160 },
						],
						// three horizontal
						[
							{ x: 130, y: 160, size: 100 },
							{ x: 300, y: 160, size: 100 },
							{ x: 470, y: 160, size: 100 },
						],
						// Ante + larger
						[
							{ x: 130, y: 160, size: 100 },
							{ x: 300, y: 160, size: 100 },
							{ x: 470, y: 160, size: 100 },
							{ x: 300, y: 550, size: 200, useAlt: true },
						],
						// Ante + larger x2
						[
							{ x: 130, y: 160, size: 100 },
							{ x: 300, y: 160, size: 100 },
							{ x: 470, y: 160, size: 100 },
							{ x: 200, y: 520, size: 140, useAlt: true },
							{ x: 400, y: 520, size: 140, useAlt: true },
						],
						// Three across fess, three below it
						[
							{ x: 130, y: 160, size: 100 },
							{ x: 300, y: 160, size: 100 },
							{ x: 470, y: 160, size: 100 },
							{ x: 180, y: 460, size: 100, useAlt: true },
							{ x: 420, y: 460, size: 100, useAlt: true },
							{ x: 300, y: 560, size: 100, useAlt: true },
						],
						// Ante + 1 below
						[
							{ x: 130, y: 160, size: 100 },
							{ x: 300, y: 160, size: 100 },
							{ x: 470, y: 160, size: 100 },
							{ x: 180, y: 490, size: 90, useAlt: true },
							{ x: 420, y: 490, size: 90, useAlt: true },
							{ x: 300, y: 590, size: 90, useAlt: true },
							{ x: 300, y: 390, size: 90, useAlt: true },
						],
					]
					maxCharges = 7
					chargeSize = 100
					if (shape === 'papal') {
						chargeSize = 120
					}
					break

				// line dividing the sides
				case 'pale':
					placements = [
						// central
						[ { x: 300, y: 340 } ],
						[
							// two vertically distributed
							{ x: 300, y: 260 },
							{ x: 300, y: 450 },
						],
						[
							// three along pale
							{ x: 300, y: 170 },
							{ x: 300, y: 360 },
							{ x: 300, y: 550 },
						],
					]
					chargeSize = 130
					maxCharges = 3
					break

				// sash
				case 'bend':
					placements = [
						[ { x: 300, y: 345, size: 160 } ],
						[ { x: 440, y: 160 }, { x: 160, y: 490, useAlt: true } ],
						[ { x: 140, y: 170, size: 85 }, { x: 300, y: 325, size: 85 }, { x: 460, y: 490, size: 85 } ],
					]
					if (shape === 'swiss') {
						placements[1] = adjustX(placements[1], 'in', 20)
						placements[1] = adjustY(placements[1], '', 10)
					}
					chargeSize = 100
					maxCharges = 3
					break

				// same but reversed
				case 'bend-sinister':
					placements = [
						[ { x: 300, y: 360, size: 160 } ],
						[ { x: 190, y: 160, size: 120 }, { x: 440, y: 530, useAlt: true } ],
					]
					chargeSize = 100
					maxCharges = 2
					if (shape === 'swiss') {
						maxCharges = 1 // few options look good
					}
					break

				case 'saltire':
					placements = [ [ { x: 300, y: 380, size: 160 } ] ]
					chargeSize = 100
					maxCharges = 1
					break
				case 'gyronny':
					placements = [ [ { x: 300, y: 390, size: 220 } ] ]
					maxCharges = 1
					break
				case 'pile':
					placements = [
						[ { x: 300, y: 340, size: 160 } ],
						[ { x: 300, y: 380 }, { x: 300, y: 130, useAlt: true } ],
						[
							{ x: 300, y: 380, size: 160 },
							{ x: 160, y: 150, useAlt: true },
							{ x: 440, y: 150, useAlt: true },
						],
						[
							{ x: 300, y: 380, size: 160 },
							{ x: 130, y: 130, useAlt: true },
							{ x: 300, y: 130, useAlt: true },
							{ x: 470, y: 130, useAlt: true },
						],
					]
					chargeSize = 100
					maxCharges = 4
					break
				default:
					console.log('No ordinary specified')
			}
		}
	}

	// determine the final number of charges to place
	const computedCount = Math.min(count, maxCharges)

	for (let i = 0; i < computedCount; i++) {
		let c
		// allow for alternate charges in some designs
		if (placements[computedCount - 1][i].useAlt && alt) {
			c = alt
		} else {
			c = charge
		}

		placedCharges[i] = (
			<Charge
				size={placements[computedCount - 1][i].size || chargeSize}
				x={placements[computedCount - 1][i].x}
				y={placements[computedCount - 1][i].y}
				charge={c[0]}
				key={i}
			/>
		)
	}

	return <g>{placedCharges}</g>
}
