// Hand-picked, pretty but innacurate color combinatinos
export default function colors () {
	const colorpairs = [
		['#ebf2fa','#427aa1','#a5be00'],
		['#5e2bff','#f7f6c5','#c04cfd'],
		['#afd2e9','#fcd0a1','#a690a4'],
		['#f4f606','#d7d0f3','#bcf8ec'],
		['#095256','#bb9f06','#208aae'],
		['#abc798','#ffe4fa','#f9ebe0'],
		['#087e8b','#ff5a5f','#3c3c3c'],
		['#3c3c3c','#f5f5f5','#c1839f'],
		['#ffc857','#2e4052','#bdd9bf'],
		['#412234','#ffffff','#ffc857'],
		['#5e2bff','#f5f5f5','#f34213'],
		['#000f08','#e0ca3c','#00b295'],
		['#b7ad99','#faa6ff','#335c67'],
		['#c9daea','#494949','#ff4365'],
		['#00d9c0','#fffff3','#030301'],
		['#008dd5','#dfbbb1','#373f51'],
		['#f56476','#fffff3','#50514f'],
		['#23ce6b','#272d2d','#f6f8ff'],
		['#f2e7c9','#a846a0','#413c58'],
		['#a3c4bc','#bfd7b5','#563f1b'],
		['#345995','#eac435','#03cea4'],
		['#fb4d3d','#f1ffe7','#ca1551'],
		['#6c464e','#a9fdac','#44cf6c'],
		['#d34e24','#f7f052','#32a287'],
		['#000000','#FFFFFF','#F6F2F1']
	]
	return colorpairs[Math.floor(Math.random() * colorpairs.length)]
}

// Includes only valid tincture / metal combinations and accurate historical colors
export function heraldicColors () {
	const tinctures = [
		'#52de9a', // vert
		'#0a3b84', // azure
		'#491984', // purpure
		'#b20505', // gules
		'#0f0f0f', // sable
	]
	const metals = [
		'#e6dd65', // Or
		'#f4f4f4', // Argent
	]

	if (Math.random() > 0.5) {
		return [
			tinctures[Math.floor(Math.random() * 5)],
			metals[Math.floor(Math.random() * 2)]
		]
	} else {
		return [
			metals[Math.floor(Math.random() * 2)],
			tinctures[Math.floor(Math.random() * 5)]
		]
	}
}

export function match (hex) {
	let name, type
	const tinctures = [
		['#52de9a', 'vert'],
		['#0a3b84', 'azure'],
		['#491984', 'purpure'],
		['#b20505', 'gules'],
		['#0f0f0f', 'sable']
	]
	const metals = [
		['#e6dd65', 'Or'],
		['#f4f4f4', 'argent']
	]

	for (let i = 0; i < tinctures.length; i++) {
		if (tinctures[i][0] === hex) {
			name = tinctures[i][1]
			type = 'tincture'
		}
	}

	for (let i = 0; i < metals.length; i++) {
		if (metals[i][0] === hex) {
			name = metals[i][1]
			type = 'metal'
		}
	}

	return { name, type }
}
