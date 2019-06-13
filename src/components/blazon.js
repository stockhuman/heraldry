import { blazonEmoji as describe } from './emoji'
import { match } from './colors'

export default function blazon (state) {
	const { colors, design, divisions, ordinaries, charge, altCharge, chargeCount } = state

	const colorA = match(colors[0]).name
	const colorB = match(colors[1]).name
	const colorC = match(colors[2]).name || colorA

	let plain = false // no divisions or ordinaries on field
	let variation = '' // variations of the field
	let charges = 0 // number of regular charges
	let altCharges = 0 // number of alternate charges
	let blazon = '' // the description of the field et al.

	// sets the number of charges and alts given the chargecount
	// and a point where alternate charges start
	const setCharges = (max, altsAfter) => {
		let c = 0, a = 0, i = 1, m = Math.min(max, chargeCount)
		while (i <= m) {
			if (i < altsAfter) c++ // increment charges
			else a++ // increment alternate charges
			i++ // don't hang the browser :P
		}
		charges = c
		altCharges = a
	}


	if (design === 'divided' && divisions === '') { plain = true }
	if (design === 'ordered' && ordinaries === '') { plain = true }

	/**
	 * NOTE: disabled semees to improve on historical accuracy, design
	 */
	// if (seme) {
	// 	switch (seme) {
	// 		case 'barry-dancetty': variation = `barry dancetty ${colorC}`; break
	// 		case 'masoned': variation = `masoned ${colorC}`; break
	// 		case 'fleur-de-lys': variation = `semé-de-lys Or`; break
	// 		// no default
	// 	}
	// }

	// determine field
	if (plain) {
		blazon = `${variation ? variation : colorA}, ${describe(charge, 1)}`
	} else {
		if (design === 'divided') {
			let d = ''
			switch (divisions) {
				case 'party per pale':
					setCharges(6, 4)
					d = `Per pale ${colorB} and ${colorA}, `;
					if (chargeCount === 1) {
						d += `overtop ${describe(charge, 1)}`
					} else {
						d += `in sinister ${describe(charge, charges)}`
						if (chargeCount > 3) {
							d += `, in dexter ${describe(altCharge, altCharges)}`
						}
					}
					break

				case 'party per fess':
					setCharges(4, 4)
					d = `Per fess ${colorA} and ${colorB}, `
					if (chargeCount === 1) {
						d += `overtop ${describe(charge, 1)}`
					} else {
						d += `in chief ${describe(charge, charges)}`
						if (chargeCount > 3) {
							d += `, in base ${describe(altCharge, 1)}`
						}
					}
					break

				case 'party per quartely':
					setCharges(5, 5)
					d = `Quarterly, I ${colorA}, ${describe(charge, charges)},`
					if (chargeCount > 4) {
						d += ` II ${colorB}, ${describe(altCharge, altCharges)},`
						d += ` III ${colorB}, IV ${colorA}`
					} else {
						d += ` II and III ${colorB}, IV ${colorA}`
					}
					break
				// no default
			}
			blazon = `${d}`
		} else if (design === 'ordered') {
			let d = ''
			switch (divisions) {
				case 'party per pale':
					setCharges(6, 4)
					d = `Per pale ${colorB} and ${colorA}, `;
					if (chargeCount === 1) {
						d += `overtop ${describe(charge, 1)}`
					} else {
						d += `in sinister ${describe(charge, charges)}`
						if (chargeCount > 4) {
							d += `, in dexter ${describe(altCharge, altCharges)}`
						}
					}
					break
				case 'bend': break
				case 'bend-sinister': break
				case 'pale': break
				case 'fess': break
				case 'cross': break
				case 'saltire': break
				case 'chief': break
				// no default
			}
			blazon = `${d}`
		}
	}

	blazon = blazon.replace(/(\s)+/g, ' ') // catch double spaces

	console.log(blazon, {chargeCount, charges, altCharges, state})
}
