/**
 * Returns an array with elements:
 * [0] - the emoji in unicode,
 * [1] - a heraldic description, with # as placeholders for plural endings
 * [2] - The tincture of the charge
 * [3] - An optional plural form if the blazon differs from singular
 *
 * Words in brackets are to be placed if singular (ie: an avocado)
 * Descriptions have been compiled and adapted from many places.
 *
 * A debt to r/heraldry and to http://roa.sca-caid.org/Royalty.php
 * ought be acknowledged. Likewise, one to http://mistholme.com/ for
 * the immense body of knowledge they've made freely available.
 *
 * @since June 2019 - Descriptions match Microsoft Segoe UI Emojis
 * @since Aug 2019 = Descriptions match Twitter 'Twemoji' Emojis
 *
 * @param {string} subset The subset of all emojis that could be retrieved
 */
export default function emojis (subset = 'reccomended') {
	// allows me to get some syntax highlighting and change the scheme, should I need to
	let or = 'or',
		gules = 'gules',
		vert = 'vert',
		azure = 'azure',
		purpure = 'purpure',
		sable = 'sable',
		argent = 'argent'
	let e = []
	if (subset === 'deprecated') {
		e = [
			['👂', '[an]ear# Or'], // removed as it looks ugly
			['🛡️', '[an]escutcheon# azure, party per pale azure', azure], // removed with switch as it broke tincture
			['🌫', 'fountain# argent'], // removed after switching to Twitter Emoji
			['💁‍♀️', "maiden's bust# vested purpure, with dexter arm raised and hand splayed fesswise, proper"], // ugly
		]
	} else if (subset === 'recommended') {
		e = [
			['🌞', 'sun# in their splendor', or],
			['💘', 'heart# of gules pierced bendwise sinister Or', gules],
 			['💚', 'heart# of vert', vert],
			['💙', 'heart# of azure', azure],
			['🖤', 'heart# of sable', sable],
			['💛', 'heart# of Or', sable],
			['🤍', 'heart# of argent', argent],
			['💯', 'one hundred emoji# gules', gules],
			['💣', 'bomb# sable', sable],
			['🖐', 'hand# palmate Or', or],
			['👌', 'OK Hand# Or', or],
			['🤘', 'Sign of the Horns Or', or],
			['🖕', 'Reversed Hand# With Middle Finger Extended Or', or],
			['✊', 'Raised Fist# Or', or],
			['🙏', 'Folded Hands Or sleeved azure'],
			['⭐', 'mullet# Or', or],
			['💪', '[an]arm# embowed fesseways Or', or],
			['👁️', '[an]eye# pupiled azure', argent],
			['🧜‍♀️', 'mermaid# Or vested gules of hair azure, dexter arm raised', azure],
			['🧜‍♂️', 'triton# without trident of hair and scales azure', azure],
			['👣', 'footprints gules', gules],
			['📖', '[an]open book# proper'],
			['🦊', "fox's head# cabossed proper"],
			['🐻', "bear's head# cabossed proper"],
			['🐺', "wolf's head# cabossed argent of eyes and nose sable"],
			['🐮', "cow's head# cabossed proper"],
			['🌷', 'tulip# slipped and leaved proper'],
			['🏵️', 'rosette# or', or],
			['💮', 'cherry blossom argent'],
			['🍀', 'four-leaf clover# vert', vert],
			['🌲', 'pine tree# proper', vert],
			['🍍', 'pineapple# bendwise proper', or],
			['🍎', '[an]apple# gules', gules],
			['🦞', 'lobster# gules', gules],
			['🐙', 'polypus affronty purpure', purpure, 'polypi affronty purpure'],
			['🗻', 'snow-capped mountain# of base sable and peak argent', sable],
			['⚓', '[an]anchor# azure', azure],
			['🌚', 'moon# in their plentitude', or], // https://mistholme.com/dictionary/moon/
			['☁', 'cloud# argent', argent],
			['♦️', 'lozengy gules', gules],
			['📯', 'bugle# Or tasselled gules', or],
			['💰', 'bag# of money Or, marked sable', or],
			['🖋️', 'pen# bendwise sinister sable', sable],
			['🗝', 'key# fesswise, wards to sinister Or'],
			['🗡️', 'dagger# bendwise inverted'],
			['⚔️', 'pair# of swords in saltire proper'],
			['🏹', 'bow# fully drawn and charged with arrows, bendwise to chief'],
			['🤔', 'thinking face emoji# Or', or],
			['⚙️', 'gear# sable', sable],
			['⚖️', 'standing balance# Or', or],
 			['🔗', 'pair# of chainlinks bendwise to chief argent', argent],
			['🐬', 'dolphin# sautant azure', azure],
			['🖖🏿', "Moor's Palm# palmate splayed of thumb, middle, and ring proper"],
			['🦉', 'owl# overt guardant proper'],
			['⚜️', 'fleur-de-lys purpure', purpure],
			['⚫', 'pellet#', sable],
			['🔴', 'torteau#', gules],
			['🟣', 'golpe#', purpure],
			['⚪', 'plate#', argent],
			['🟡', 'besant#', or],
			['🟢', 'pomme#', vert],
			['🧪', 'test tube# bendwise argent filled vert'],
 			['💎', 'diamond# azure', azure],
			['🙃', '[an]upside-down smile emoji# Or', or],
			['🥕', 'carrot# bendwise sinister proper'],
			['🧺', 'basket# gules', gules],
			['🐍', 'coiled snake# ward sinister vert of eye sable and tongue gules', vert],
			['🪓', '[an]axe# bendwise'],
			['🧅', '[an]onion# Or', or],
			['🧄', 'head# of garlic argent', argent],
			['🦨', 'skunk# statant proper', sable],
			['🐣', 'chick# Or guardant issuant from [an]eggshell# argent'],
			['🐓', 'cock#'],
			['🐻‍❄️', "bear's head# cabossed argent eyes sable", argent],
			['🪨', 'rock# argent', argent],
			['🍁', 'maple leaf gules', gules, 'maple leaves gules'],
			['🌴', 'palm tree# proper'],
			['🌿', 'sprig# proper'],
			['💀', 'death’s head# argent', argent],
			['🔔', 'bell# or', or],
			['🦅', '[an]eagle’s head# argent, beaked or, plumed sable', sable],
			['🦁', "lion's head# cabossed proper"],
		]
	} else if (subset === 'alt') {
		e = [
			['😩', 'weary face emoji# Or', or],
			['😍', 'heart-eyes emoji# proper', or],
			['💩', 'smiling turd emoji# proper'],
			['💦', 'trio# of drops falling bendwise azure', azure],
			['🍆', '[an]eggplant# purpure', purpure],
			['😂', 'laughing crying emoji# proper', or],
			['🍑', 'peach fruit# leaved proper'],
			['🤑', 'money face emoji# proper', or],
			['🥑', 'halved avocado# bendwise proper', vert],
			['🧻', 'toilet paper roll# argent', argent],
			['🦵', 'leg# embowed Or', or],
			['🤠', 'cowboy face# proper', or],
			['👽', 'alien head# cabossed argent with eyes sable', argent],
			['🍉', 'watermelon slice# tilted bendwise proper'],
			['🤡', 'clown face emoji# proper'],
			['🎅🏿', 'moorish Santa Claus emoji# proper'],
			['🌭', 'hotdog# bendwise proper'],
			['🌮', 'taco# fesswise Or, condiments proper', or],
			['🦐', 'shrimp embowed gules', gules],
			['📜', '[an]open scroll# or', or],
			['🐝', 'bee# tergiant proper', argent],
			['🏰', 'castle# argent spired azure', argent],
			['🩸', 'gout de sang', gules],
			['🥺', 'pleading emoji# proper', or]
		]
	}
	return e[Math.floor(Math.random() * e.length)]
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
	if (charge[3] && count > 1) {
		return `${number} ${charge[3]}`
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
