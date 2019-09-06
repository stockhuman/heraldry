/**
 * Returns an array with elements:
 * [0] - the emoji in unicode,
 * [1] - a heraldic description, with # as placeholders for plural endings
 * [2] - An optional plural form if the blazon differs from singular
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
			['💛', 'heart# of Or'],
			['💯', 'one hundred emoji# gules'],
			['💣', 'bomb# sable'],
			['🖐', 'hand# palmate Or'],
			['👌', 'OK Hand# Or'],
			['🤘', 'Sign of the Horns Or'],
			['🖕', 'Reversed Hand# With Middle Finger Extended Or'],
			['✊', 'Raised Fist Or'],
			['🙏', 'Folded Hands Or sleeved azure'],
			['⭐', 'mullet# Or'],
			['💪', '[an]arm# embowed fesseways Or'],
			['👂', '[an]ear# Or'],
			['👁️', '[an]eye# pupiled gules'],
			['🧜‍♀️', 'mermaid# proper'],
			['👣', 'footprints gules'],
			['📖', '[an]open book# proper'],
			['🦊', "fox's head# cabossed proper"],
			['🐻', "bear's head# cabossed proper"],
			['🐺', "wolf's head# cabossed argent of eyes and nose sable"],
			['🐮', "cow's head# cabossed proper"],
			['🌷', 'tulip# slipped and leaved proper'],
			['🏵️', 'rosette# proper'],
			['💮', 'cherry blossom argent'],
			['🍀', 'four-leaf clover# vert'],
			['🌲', '[an]evergreen tree# proper'],
			['🍍', 'pineapple# bendwise'],
			['🍎', '[an]apple# gules'],
			['🦐', 'shrimp embowed proper'],
			['🦞', 'lobster# gules'],
			['🐙', '[an]octopus affronty gules', 'octopuses affronty gules'],
			['🏔️', 'snow-capped mountain# proper'],
			['⚓', '[an]anchor# argent'],
 			['🌚', 'moon# sable'],
			['☁', 'cloud# argent'],
 			['🌫', 'fountain# argent'],
			['♦️', 'lozengy gules'],
			['📯', 'bugle# Or tasselled gules'],
			['💰', 'bag# of money Or, marked vert'],
			['🖋️', 'pen# bendwise sinister sable'],
			['🗝', 'key# fesswise, wards to sinister Or'],
			['🗡️', 'dagger# bendwise inverted proper'],
			['⚔️', 'pair# of swords in saltire proper'],
			['🏹', 'bow# tensed gules and attached arrow# argent, bendwise to chief'],
			['🤔', 'thinking face emoji# Or'],
			['🛡️', '[an]escutcheon# gules, party per pale indented argent'],
			['⚙️', 'gear# argent'],
			['⚖️', 'standing balance# Or'],
 			['🔗', 'pair# of chainlinks bendwise to chief argent'],
			['🐬', 'dolphin# sautant azure'],
			['🖖🏿', "Moor's Palm# palmate splayed of thumb, middle, and ring proper"],
			['🦉', 'owl# overt guardant'],
			['⚜️', 'fleur-de-lys Or'],
			['⚫', 'pellet#'],
			['🔴', 'pomme#'],
 			['💎', 'diamond# azure'],
			['🙃', '[an]upside-down smile emoji#'],
			['🥕', 'carrot# bendwise sinister proper'],
			['🧺', 'basket# argent with contents azur']
		]
		return e[Math.floor(Math.random() * e.length)]
	} else if (subset === 'alt') {
		const e = [
			['😩', 'weary face emoji# proper'],
			['💁‍♀️', "maiden's bust# vested purpure, with dexter arm raised and hand splayed fesswise, proper"],
			['😍', 'heart-eyes face# proper'],
			['💩', 'smiling turd emoji# proper'],
			['💦', 'trio# of drops azure'],
			['🍆', '[an]eggplant# purpure'],
			['😂', 'laughing crying emoji# proper'],
			['🍑', 'peach fruit# leaved proper'],
			['🤑', 'money face emoji# proper'],
			['🥑', 'halved avocado# bendwise proper'],
			['🧻', 'toilet paper roll# proper'],
			['🦵', 'leg# embowed Or'],
			['🤠', 'cowboy face# proper'],
			['👽', 'alien# vert with eyes sable'],
			['🍉', 'watermelon slice# bendwise proper'],
			['🤡', 'clown face# argent, lips, nose and hair of gules, eyes azure'],
			['🎅🏿', 'moorish Santa Claus emoji# proper'],
			['🌯', 'burrito# bendwise proper'],
			['🌭', 'hotdog# bendwise sinister proper'],
			['🌮', 'taco# fesswise Or, condiments vert'],
			['🐍', 'coiled snake# ward sinister vert of eye sable and tongue gules']
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
	let hasArticle = false
	let number

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

	// if the charge has a prescribed plural, set it instead.
	if (charge[2] && count > 1) {
		return `${number} ${charge[2]}`
	}

	let a = RegExp(/[[?\]]/g) // search for [an] or [the]
	if (a.test(data)) {
		hasArticle = true
		if (count === 1) {
			// replace brackets with spaces
			data = data.replace(/[[?\]]/g, ' ')
		} else {
			// remove article
			data = data.replace(/\[([\d\w]+)\]/g, '')
		}
	}

	// string contains '#' to be replaced as a plural placeholder
	if (RegExp(/#/g).test(data)) {
		if (count === 1) {
			if (!hasArticle) {
				// add 'a' to singular
				data = 'a ' + data.replace(/#/g, '')
			} else {
				data = data.replace(/#/g, '')
			}
		} else {
			data = data.replace(/#/g, 's')
		}
	}

	return `${number} ${data}`
}
