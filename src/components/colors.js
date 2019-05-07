export default function colors () {
	const colorpairs = [
		['#ebf2fa','#427aa1','#a5be00 '],
		['#5e2bff','#f7f6c5','#c04cfd'],
		['#afd2e9','#fcd0a1','#a690a4'],
		['#f4f606','#d7d0f3','#bcf8ec '],
		['#095256','#bb9f06','#208aae'],
		['#abc798','#ffe4fa','#f9ebe0'],
		['#087e8b','#ff5a5f','#3c3c3c'],
		['#3c3c3c','#f5f5f5','#c1839f'],
		['#ffc857','#2e4052','#bdd9bf'],
		['#412234','#ffffff','#ffc857'],
		['#5e2bff','#f5f5f5','#f34213'],
		['#000f08','#e0ca3c','#00b295'],
		['#3e2f5b','#faa6ff','#335c67'],
		['#c9daea','#494949','#9e2a2b'],
		['#7353ba','#2f195f','#0f1020']
	]
	return colorpairs[Math.floor(Math.random() * colorpairs.length)]
}
