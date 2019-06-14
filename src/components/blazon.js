import { blazonEmoji as describe } from './emoji'
import { match } from './colors'

// via https://en.wikipedia.org/wiki/Blazon and
// https://heraldry.sca.org/armory/bruce.html
export default function blazon (state) {
	const { colors, design, divisions, ordinaries, charge, altCharge, chargeCount } = state

	const colorA = match(colors[0]).name
	const colorB = match(colors[1]).name

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
		blazon = `${variation ? variation : colorA}, ${describe(charge)}`
	} else {
		if (design === 'divided') {
			let d = ''
			switch (divisions) {
				case 'party per pale':
					setCharges(6, 4)
					d = `Per pale ${colorB} and ${colorA}, `;
					if (chargeCount === 1) {
						d += `overtop ${describe(charge)}`
					} else {
						d += `in sinister ${describe(charge, charges)}`
						if (chargeCount > 3) {
							d += `, in dexter ${describe(altCharge, altCharges)}`
						}
					}
					break

				case 'party per fess':
					setCharges(7, 4)
					d = `Per fess ${colorA} and ${colorB}, `
					if (chargeCount === 1) {
						d += `overtop ${describe(charge)}`
					} else {
						d += `in chief ${describe(charge, chargeCount === 6 ? 2 : charges)}`
						if (chargeCount > 6) {
							d += ` and ${describe(altCharge, 3)} in alterny`
						} else if (chargeCount > 3) {
							d += `, in base ${describe(altCharge, altCharges)}`
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
			let d = `${colorA}, `
			switch (ordinaries) {
				case 'saltire':
					d += `a saltire ${colorB} charged with ${describe(charge)}`;
					break
				case 'bend':
					if (chargeCount === 1) {
						d += `a bend ${colorB}, overall ${describe(charge)}`
					}
					if (chargeCount === 2) {
						d += `a bend ${colorB} between ${describe(altCharge)} and ${describe(charge)}`
					}
					if (chargeCount >= 3) {
						d += `in a bend ${colorB}, ${describe(charge, 3)}`
					}
					break
				case 'bend-sinister':
					if (chargeCount === 1) {
						d += `a bend ${colorB}, overall ${describe(charge)}`
					}
					if (chargeCount >= 2) {
						d += `a bend ${colorB} between ${describe(charge)} and ${describe(altCharge)}`
					}
					break
				case 'pale':
					setCharges(3, 9)
					d += `in a pale ${colorB}, ${describe(charge, charges)}`
					break
				case 'cross':
					d += `a cross ${colorB}, ${describe(charge)}`
					break
				case 'chief':
					setCharges(4, 4)
					let reversedDesign = chargeCount >= 4 ? true : false
					d += `${describe(reversedDesign ? altCharge : charge, reversedDesign ? altCharges : charges)}`
					if (chargeCount <= 3) {
						d += `, a chief ${colorB}`
					} else {
						d += `, in chief ${describe(charge, 3)}`
					}
					break
				// no default
			}
			blazon = `${d}`
		}
	}

	// capitalizes first letter and trims double spaces
	const prep = string => {
		string = string.replace(/(\s)+/g, ' ') // catch double spaces
		if (string.length > 280) { console.warn('String too long for twitter!') }
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	return prep(blazon)
}
