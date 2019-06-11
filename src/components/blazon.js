import { blazonEmoji } from './emoji'
import { match } from './colors'

export default function blazon (state) {
	const { colors, design, divisions, ordinaries, seme, charge, chargeCount } = state

	let isPlain = false // plain field
	let variation = ''
	let blazon

	if (design === 'divided' && divisions === '') { isPlain = true }
	if (design === 'ordered' && ordinaries === '') { isPlain = true }

	if (seme) {
		switch (seme) {
			case 'barry-dancetty': variation = ` barry dancetty`; break
			case 'masoned': variation = ` masoned ${colors[2]}`; break
			case 'fleur-de-lys': variation = ` semé-de-lys Or and ${colors[1]}`; break
			default: variation = ` semé of ${seme} ${colors[2]} and ${colors[1]}`
		}
	}

	// if (isPlain) {
	// 	blazon = `${match(colors[0]).name}${variation}, ${blazonEmoji(charge, chargeCount)}`
	// } else {
	// 	if (design === 'divided') {
	// 		blazon = `${divisions} ${colors[0]} and ${colors[1]}, `
	// 	} else {
	// 		blazon = `${colors[0]}${variation}, ${ordinaries}`
	// 	}
	// }

	blazon = `${match(colors[0]).name}, ${blazonEmoji(charge)}`
	console.log(blazon)
}
