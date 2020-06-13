import { blazonEmoji as describe } from './emoji'

// via https://en.wikipedia.org/wiki/Blazon and
// https://heraldry.sca.org/armory/bruce.html
export default function blazon (state) {
	const { colors, design, divisions, ordinaries, charge, altCharge, chargeCount } = state

	const colorA = colors[0]
	const colorB = colors[1]

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

				case 'party per pale indented':
					setCharges(6, 4)
					d = `Per pale indented ${colorB} and ${colorA}, `;
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
					d = `Per bend ${colorA} and ${colorB}, `
					if (chargeCount === 1) {
						d += `overtop ${describe(charge)}`
					} else {
						d += `in chief ${describe(charge, charges)}`
						if (chargeCount > 3) {
							d += `, in base ${describe(altCharge, altCharges)}`
						}
					}
					break


				case 'party per bend':
					setCharges(6, 4)
					d = `Per fess ${colorA} and ${colorB}, `
					if (chargeCount === 1) {
						d += `overtop ${describe(charge)}`
					} else if (chargeCount === 2) {
						d += `in dexter ${describe(charge)}, in sinister ${describe(altCharge)}`
					} else {
						d += `overtop ${describe(charge)}, `
						+ `in dexter ${describe(charge)}, in sinister ${describe(altCharge)}`
					}
					break

				case 'party per fess embattled':
					setCharges(6, 4)
					d = `Per fess embattled ${colorA} and ${colorB}, `
					if (chargeCount === 1) {
						d += `overtop ${describe(charge)}`
					} else {
						d += `in chief ${describe(charge, charges)}`
						if (chargeCount > 3) {
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

				case 'party per chevron':
					setCharges(4, 4)
					if (chargeCount === 1) {
						// This could be blazoned differently, but most emoji render as the central, primary charge
						d = `${colorB}, ${describe(charge)} above a chevron ${colorA}`
					} else {
						d = `Per chevron ${colorA} and ${colorB}, ${describe(charge, charges)} per fess`
						if (chargeCount > 3) {
							d += `, in chevron ${describe(altCharge)}`
						}
					}
					break
				// no default
			}
			blazon = `${d}`
		} else if (design === 'ordered') {
			let d = (ordinaries == 'gyronny') ? '' : `${colorA}, `
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
					setCharges(2, 1)
					if (chargeCount === 1) {
						d += `a bend sinister ${colorB}, overall ${describe(charge)}`
					}
					if (chargeCount > 2) {
						d += `a bend sinister ${colorB} between ${describe(charge)} and ${describe(altCharge)}`
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
				case 'pile':
					setCharges(2, 1)
					d += `in a pile ${colorB} ${describe(charge, 1)}`
					if (chargeCount > 1) {
						d += `, in chief ${describe(altCharge, altCharges)}`
					}

					break
				case 'gyronny':
					setCharges(1, 1)
					d += `Gyronny ${colorB} and ${colorA}, ${describe(charge, 1)}`

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
