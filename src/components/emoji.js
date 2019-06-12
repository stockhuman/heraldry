/**
 * Returns an array with elements:
 * [0] - the emoji in unicode,
 * [1] - a heraldic description, with # as placeholders for plural endings
 * [2] - a boolean denoting that the description is already plural,
 * and does not take an automatic 's' at the end.
 *
 * Words in brackets are to be placed if singular (ie: an avocado)
 * Descriptions have been compiled and adapted from many places.
 *
 * A debt to r/heraldry and to http://roa.sca-caid.org/Royalty.php
 * ought be acknowledged.
 *
 * Descriptions match Microsoft Segoe UI Emojis as of June 2019
 *
 * @param {string} subset The subset of all emojis that could be retrieved
 */
export default function emojis (subset = 'all') {
	if (subset === 'all') {
		return null // temp, I can't support this now
	} else if (subset === 'recommended') {
		const e = [
			['🌞', 'sun# in splendor'],
			['💘', 'heart# of gules pierced bendwise sinister azure'],
 			['💚', 'heart# of vert'],
			['💙', 'heart# of azure'],
			['🖤', 'heart# of sable'],
			['💯', 'one hundred emoji# gules', true],
			['💣', 'bomb# sable'],
			['🖐', 'hand# palmate Or'],
			['👌', 'OK Hand# Or'],
			['🤘', 'Sign of the Horns Or', true],
			['🖕', 'Reversed Hand# With Middle Finger Extended Or'],
			['✊', 'Raised Fist Or'],
			['🙏', 'Folded Hands Or sleeved azure', true],
			['⭐', 'mullet# Or'],
			['💪', '[an]arm# embowed fesseways Or'],
			['👂', 'ear# Or'],
			['👁️', '[an]eye pupiled gules'],
			['🧜‍♀️', 'mermaid# proper'],
			['👣', 'footprints gules', true],
			['📖', 'open book# proper'],
			['🦊', "fox's head cabossed proper", true],
			['🐮', "cow's head cabossed proper", true],
			['🌷', 'tulip slipped and leaved proper'],
			['🏵️', 'rosette proper'],
			['💮', 'cherry blossom argent'],
			['🍀', 'four-leaf clover# proper'],
			['🌲', 'evergreen tree# proper'],
			['🍍', 'pineapple# bendwise'],
			['🍎', '[an]apple# gules'],
			['🦐', 'shrimp embowed proper', true],
			['🦞', 'lobster# gules'],
			['🏔️', 'snow-capped mountain# proper'],
			['⚓', 'anchor# argent'],
 			['🌚', 'moon# sable'],
			['☁', 'cloud# argent'],
 			['🌫', 'fountain# argent'],
			['♦️', 'lozengy gules', true],
			['📯', 'bugle Or tasselled gules'],
			['💰', 'bag# of money Or, marked vert'],
			['🖋️', 'pen# bendwise sinister sable'],
			['🗝', 'key# fesswise, wards to sinister Or'],
			['🗡', 'dagger# bendwise proper'],
			['⚔', 'pair# of swords crossed proper'],
			['🏹', 'bow# tensed gules and attached arrow# argent, bendwise to chief'],
			['🤔', 'thinking face emoji# Or'],
			['🛡️', 'escutcheons# gules, party per pale indented argent'],
			['⚙', 'gear# argent'],
 			['⚖', 'scales Or', true],
 			['🔗', 'pair# of chainlinks bendwise to chief argent'],
			['🐬', 'dolphin# sautant azure'],
			['🖖🏿', "Moor's Palm# palmate splayed of thumb, middle, and ring proper"],
			['🦉', 'owl# overt guardant'],
 			['⚜', 'fleur-de-lys Or', true],
 			['⚫', 'pellet#'],
 			['💎', 'diamond# azure'],
			['🙃', '[an]upside-down smile emoji#']
 		]
		return e[Math.floor(Math.random() * e.length)]
	} else if (subset === 'alt') {
		const e = [
			['😩', 'weary face emoji# proper'],
			['💁‍♀️', "maiden's bust# vested purpure, with dexter arm raised and hand splayed fesswise, proper"],
			['😍', 'heart eyes face# proper'],
			['💩', 'smiling turd emoji# proper'],
			['💦', 'trio of drops azure'],
			['🍆', '[an]eggplant# purpure'],
			['😂', 'laughing crying emoji# proper'],
			['🍑', 'peach# proper'],
			['🤑', 'money face emoji# proper'],
			['🥑', '[an]avocado# proper'],
			['🧻', 'toilet paper roll# proper'],
			['🦵', 'leg# embowed Or'],
			['🤠', 'cowboy face# proper'],
			['👽', 'alien# vert with eyes sable']
		]
		return e[Math.floor(Math.random() * e.length)]
	}
}

/**
 * Returns a gramatically correct string parsed from the charge data
 * @param {Array} charge an array comprised of an emoji at [0], and a desciprion at [1]
 * @param {Number} count Number of charges currently placed in a group
 */
export function blazonEmoji(charge, count = 1) {
	let data = charge[1]

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

	// string contains '#' to be replaced as a plural placeholder
	if (RegExp(/#/g).test(data)) {
		if (count === 1) {
			// search for [an] or [the]
			let article = data.search(/\[(.*?)\]/g)
			if (article !== -1) {
				// replace brackets with spaces
				data = data.replace(/\[\]/g, ' ')
			} else {
				// add 'a' to singular
				data = 'a ' + data.replace(/#/g, '')
			}
		} else if (count > 1) {
			data = data.replace(/#/g, 's')
		} else {
			data = 'a ' + data.replace(/#/g, '')
		}
	}


	return `${number} ${data}`
}
