import React from 'react';
import { Charge } from './escutcheon';

// this function computes where changes may go, given the design
export default function Charges({ state, count = 1, alt }) {
	let placedCharges = []; // array of <Charges />
	let maxCharges = 0; // some designs have a maximum count
	let chargeSize = 140; // default for 1 charge
	let placements = []; // [] store of possible X/Y values to charges
	let isPlain = false; // is the shield an open field?

	const { shape, design, divisions, ordinaries, charge, colors } = state;

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
		}

		return a
	}

	// test if the designs have no partitions, given what's enabled
	if (design === 'divided' && divisions === '') { isPlain = true }
	if (design === 'ordered' && ordinaries === '') { isPlain = true }

	if (isPlain) {
		maxCharges = 1
		placements = [
			// central
			[{x:300, y:360, size: 200}]
		]
	} else {
		// the field has a design on it

		if (design === 'divided') {
			switch (divisions) {
				// divides along the middle
				case 'party per pale':
					placements = [
						// central
						[{x:300, y:360, size: 300}],
						// distrubuted horizontal
						[{x:160, y:360}, {x:440, y:360}],
						[ // three along dexter
							{x:440, y:160, size: 90},
							{x:440, y:350, size: 90},
							{x:440, y:540, size: 90}
						],
						[ // ante + large on sinister
							{x:440, y:160, size: 90},
							{x:440, y:330, size: 90},
							{x:440, y:500, size: 90},
							{x:160, y:360, size: 190, useAlt: true}
						],
						[ // ante + 2 large on sinister
							{x:440, y:160, size: 90},
							{x:440, y:330, size: 90},
							{x:440, y:500, size: 90},
							{x:160, y:250, size: 150, useAlt: true},
							{x:160, y:470, size: 150, useAlt: true}
						],
						[ // 2 columns mirrored
							{x:440, y:160, size: 90},
							{x:440, y:330, size: 90},
							{x:440, y:500, size: 90},
							{x:160, y:160, size: 90, useAlt: true},
							{x:160, y:330, size: 90, useAlt: true},
							{x:160, y:500, size: 90, useAlt: true}
						]
					]
					if (shape === 'swiss') { // too skinny
						placements[5] = adjustX(placements[5], 'in', 25)
					}
					maxCharges = 6
				break;

				// divides horizontally
				case 'party per fess':
					placements = [
						// central
						[{x:300, y:390, size: 300}],
						// distrubuted horizontal overtop
						[{x:160, y:200}, {x:440, y:200}],
						// distrubuted horizontal overtop x3
						[{x:130, y:200}, {x:300, y:200}, {x:470, y:200}],
						// ante + large bottom
						[
							{x:130, y:200},
							{x:300, y:200},
							{x:470, y:200},
							{x:300, y:520, size: 200, useAlt: true},
						]
					]
					if (shape === 'papal') {
						chargeSize = 120
					}
					maxCharges = 4
				break;

				// divides into quarters
				case 'party per quartely':
					placements = [
						// top left
						[{x:160, y:200}],
						// top left x 2
						[
							{x:120, y:180, size: 60},
							{x:200, y:240, size: 60}
						],
						// top left x 3
						[
							{x:110, y:120, size: 60},
							{x:210, y:200, size: 60},
							{x:110, y:280, size: 60},
						],
						// top left x 4
						[
							{x:110, y:140, size: 60},
							{x:210, y:140, size: 60},
							{x:210, y:240, size: 60},
							{x:110, y:240, size: 60},
						],
						// ante + alt
						[
							{x:110, y:140, size: 60},
							{x:210, y:140, size: 60},
							{x:210, y:240, size: 60},
							{x:110, y:240, size: 60},
							{x:450, y:230, size: 150, useAlt: true},
						],
					]
					maxCharges = 5
					if (shape === 'papal') {
						placements[4] = adjustX(placements[4], 'in', 15)
					}
				break;
				default: console.log('No division specified')
			}
		}

		if (design === 'ordered') {
			switch (ordinaries) {
				// large cross, little room for othe things
				case 'cross':
					placements = [[{x:300, y:360}]]
					maxCharges = 1
				break;

				// bar across the top
				case 'fess':
					placements = [
						// central
						[{x:300, y:370}],
						// distrubuted horizontal
						[{x:160, y:360}, {x:440, y:360}],
						// three zig-zag
						[
							{x:160, y:340},
							{x:440, y:340},
							{x:300, y:530}
						],
						[
							{x:160, y:105, size: 90},
							{x:440, y:105, size: 90},
							{x:300, y:105, size: 90},
							{x:300, y:430, size: 260, useAlt: true}
						]
					]
					if (shape === 'swiss') {
						placements[3] = adjustX(placements[3], '', 0, 0.7)
					}
					maxCharges = 4
				break;

				// line dividing the sides
				case 'pale':
					placements = [
						// central
						[{x:300, y:360}],
						[ // two vertically distributed
							{x:300, y:260},
							{x:300, y:450}
						],
						[ // three along pale
							{x:300, y:170},
							{x:300, y:360},
							{x:300, y:550}
						]
					]
					chargeSize = 130
					maxCharges = 3
				break;

				// sash
				case 'bend':
					placements = [
						[{x:300, y:360, size: 160}],
						[
							{x:140, y:160},
							{x:440, y:560, useAlt: true}
						]
					]
					if (shape === 'swiss') {
						placements[1] = adjustX(placements[1], 'in', 80)
					}
					chargeSize = 100
					maxCharges = 2
				break;

				// same but reversed
				case 'bend-sinister':
					placements = [
						[{x:300, y:360, size: 160}],
						[
							{x:440, y:160, size: 120},
							{x:190, y:530, useAlt: true}
						]
					]
					chargeSize = 100
					maxCharges = 2
					if (shape === 'swiss') {
						maxCharges = 1 // few options look good
					}
				break;

				// like a larger fess
				case 'chief':
					placements = [
						[{x:300, y:340, size: 160}],
						// distrubuted horizontal
						[{x:160, y:200}, {x:440, y:200}],
						// three horizontal
						[
							{x:130, y:180, size: 100},
							{x:300, y:180, size: 100},
							{x:470, y:180, size: 100}
						],
						// Ante + larger
						[ {x:130, y:180, size: 100},
							{x:300, y:180, size: 100},
							{x:470, y:180, size: 100},
							{x:300, y:530, size: 200, useAlt: true}
						],
						// Ante + larger x2
						[ {x:130, y:180, size: 100},
							{x:300, y:180, size: 100},
							{x:470, y:180, size: 100},
							{x:200, y:500, size: 140, useAlt: true},
							{x:400, y:500, size: 140, useAlt: true}
						],
						// five across fess, large lower
						[ {x:130, y:130, size: 90},
							{x:300, y:130, size: 90},
							{x:470, y:130, size: 90},
							{x:215, y:250, size: 90},
							{x:390, y:250, size: 90},
							{x:300, y:530, size: 200, useAlt: true}
						]
					]
					maxCharges = 6
				break;
				default: console.log('No ordinary specified');
			}
		}
	}

	// determine the final number of charges to place
	const computedCount = Math.min(count, maxCharges);

	for (let i = 0; i < computedCount; i++) {
		let c;
		// allow for alternate charges in some designs
		if (placements[ computedCount - 1 ][i].useAlt && alt) {
			c = alt
		} else {
			c = charge
		}

		placedCharges[i] =
		<Charge
			size={ placements[ computedCount - 1 ][i].size || chargeSize }
			x={ placements[ computedCount - 1 ][i].x }
			y={ placements[ computedCount - 1 ][i].y }
			charge={ c }
			key={i}
			colors={ colors }
		/>
	}

	return <g>{ placedCharges }</g>
}
