/**
 * Returns an array with elements:
 * [0] - the emoji in unicode,
 * [1] - a heraldic description, with # as placeholders for plural endings
 * [2] - a boolean denoting that the description is already plural,
 * and does not take an automatic 's' at the end.
 * Words in brackets are to be placed if singular (ie: an avocado)
 * Descriptions have been compiled and adapted from many places.
 *
 * @param {string} subset The subset of all emojis that could be retrieved
 */
export default function emojis (subset = 'all') {
	if (subset === 'all') {
		return null
	} else if (subset === 'recommended') {
		const e = [
			['🌞', 'sun'],
			['💘', 'heart# Gules pierced bendwise sinister Azure'],
 			['💚', 'heart# Vert'],
			['💙', 'heart# Azure'],
			['🖤', 'heart# Sable'],
			['💯', 'one hundred emoji# Gules', true],
			['💣', 'bomb# Sable'],
			['🖐', 'hand# palmate Or'],
			['👌', 'OK Hand# Or'],
			['🤘', 'Sign of the Horns Or', true],
			['🖕', 'Reversed Hand# With Middle Finger Extended Or'],
			['✊', 'Raised Fist Or'],
			['🙏', 'Folded Hands Or sleeved Azure', true],
			['⭐', 'mullet# Or'],
			['💪', '[an]arm# embowed fesseways Or'],
			['👂', 'ear# Or'],
			['👁️', '[an]eye pupiled Gules'],
			['🧜‍♀️', 'mermaid# proper'],
			['👣', 'footprints Gules', true],
			['📖', 'open book# proper'],
			['🦊', "fox's head cabossed proper", true],
			['🐮', "cow's head cabossed proper", true],
			['🌷', 'tulip slipped proper'],
			['🏵️', 'rosette proper'],
			['💮', 'cherry blossom Argent'],
			['🍀', 'four-leaf clover# proper'],
			['🌲', 'evergreen tree# proper'],
			['🍍', 'pineapple# bendwise'],
			['🍎', 'apple# Gules'],
			['🦐', 'shrimp embowed proper', true],
			['🦞', 'lobster# Gules'],
			['🏔️', 'snow-capped mountain# proper'],
			['⚓', 'anchor# Argent'],
 			['🌚', 'moon# Sable'],
			['☁', 'cloud# Argent'],
 			['🌫', 'fountain# Argent'],
			['♦️', 'lozengy Gules', true],
			['📯', 'bugle Or tasselled Gules'],
			['💰', 'bag# of money Or, marked Vert'],
			['🖋️', 'pen# bendwise sinister, Sable'],
			['🗝', 'key# fesswise, wards to sinister Or'],
			['🗡', 'dagger# bendwise proper'],
			['⚔', 'pair# of swords crossed proper'],
			['🏹', 'bow Gules and arrow Argent drawn, bendwise to chief proper'],
			['🤔', 'thinking face# Or'],
			['🛡️', 'shield# Gules, party per pale indented Argent'],
			['⚙', 'gear# Argent'],
 			['⚖', 'scales Or', true],
 			['🔗', 'pair# of chanlinks bendwise to chief Argent'],
			['🐬', 'dolphin# sautant Azure'],
			['🖖🏿', "Moor's Palm# palmate splayed of thumb, middle, and ring"],
			['🦉', 'owl# overt guardant'],
 			['⚜', 'fleur-de-lys Or', true],
 			['⚫', 'pellet'],
 			['💎', 'diamond# Azure'],
			['🙃', '[an]upside down smile emoji#']
 		]
		return e[Math.floor(Math.random() * e.length)]
	} else if (subset === 'alt') {
		const e = [
			['😩', 'weary face emoji# proper'],
			['💁‍♀️', "maiden's bust# vested Purpure, with dexter arm raised and hand splayed fesswise, proper"],
			['😍', 'heart eyes face# proper'],
			['💩', 'smiling turd emoji# proper'],
			['💦', 'trio of drops Azure'],
			['🍆', '[an]eggplant Purpure'],
			['😂', 'laughing crying emoji proper'],
			['🍑', 'peach# proper'],
			['🤑', 'money face emoji proper'],
			['🥑', '[an]avocado# proper'],
			['🧻', 'toilet paper roll# proper'],
			['🦵', 'leg# embowed Or'],
			['🤠', 'cowboy face# Or'],
			['👽', 'alien# Vert']
		]
		return e[Math.floor(Math.random() * e.length)]
	}
}

/**
 * Returns a gramatically correct string parsed from the charge data
 * @param {Object} charge a charge object as described above
 * @param {Number} count Number of charges currently placed in a group
 */
export function blazonEmoji(charge, count = 1) {
	let data = charge[1]
	let isPlural = charge[2] || false
	let number

	if (isPlural && count === 1) {
		let a = data.search(/\[(.*?)\]/g)
		console.log(a)
		number = `${a} `
	} else if (count === 1) {
		number = 'a'
	} else {
		switch (count) {
			case 2: number = 'two'; break
			case 3: number = 'three'; break
			case 4: number = 'four'; break
			case 5: number = 'five'; break
			case 6: number = 'six'; break
			case 7: number = 'seven'; break
			case 8: number = 'eight'; break
			default: number = ''
		}
	}

	// string contains '#' to be replaced as a plural placeholder
	if (RegExp(/#/g).test(data)) {
		if (count > 1) {
			data = data.replace(/#/g, 's')
		} else {
			data = data.replace(/#/g, '')
		}
	}


	return `${number} ${data}`
}
