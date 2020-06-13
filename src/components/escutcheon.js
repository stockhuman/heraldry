/**
 * The foundation of all heraldic arms is the escutcheon or shield.
 *
 * The base color of the escutcheon is called the field.
 * This color can be one of three types: tincture, metal, and fur.
 * The field can be divided or may bear an ordinary, and is also
 * colored according to one of the three types. European heraldry has a rule here:
 * one cannot place a division or ordinary from one color type atop
 * the field of the same type. For example, one cannot place a silver division
 * atop a gold field, as these are both metals. Finally, the boundary between
 * the field and division/ordinary may be modified in several ways
 */
import React, { useMemo } from 'react'
import twemoji from 'twemoji'
import { match } from './colors'


export function Shape({ type }) {
	let shape;

	switch (type) {
		case 'swiss': shape = "M8.3,6.4c-0.5,0,98.1,32.3,147.2,32.3S299.2,6.4,302.7,6.4c2.2,0,98.1,32.3,147.2,32.3s145-32.3,147.2-32.3V93 c0,453.1-288,605.9-294.4,605.9c-13.5,0-294.4-150.4-294.4-606V6.4z";
			break;
		case 'french': shape = "M301.83,704a156.39,156.39,0,0,1,44.6-22c32.49-10.11,56.8-9.41,81-10,76.27-1.87,115.27-2.82,141-23,14.32-11.23,38.61-39.45,34-117V0H.57V532c-4.61,77.55,19.68,105.77,34,117,25.73,20.18,64.73,21.13,141,23,24.2.59,48.51-.11,81,10a156.39,156.39,0,0,1,44.6,22";
			break;
		case 'papal': shape = 'M306.6,692.9c-1.4,2.7-4.8,3.8-7.5,2.2c-0.5-0.3-0.9-0.6-1-1c-19-38.1-50.6-52.1-91.7-50.1 c-24,1.2-48.2-1.2-72.2,0.5c-51,3.6-81.5-30.9-83.6-81.5c-0.3-6.2,0-12.4,0-18.6c0-142.9-0.9-285.7,0.6-428.5 c0.4-40.2-6.6-75-38.2-100c-1.8-1.4-2.5-3.8-1.6-6l0,0c0.3-0.6,0.9-1.6,1.3-1.6c190-0.1,380.1-0.1,572.5-0.1c4.4,0,6.9,5,4.4,8.5 c-0.7,1-1.5,1.9-2.4,2.7c-25.1,23-34.9,51.3-34.7,85.3c0.7,150.6,0.4,301.2,0.1,451.8c0,12.3-1.1,25-4.5,36.7 c-9.1,31.6-34.2,50.3-67.1,50.9c-27.2,0.5-54.4,1.2-81.5-0.1C358.3,642.1,326,654.9,306.6,692.9z';
			break;
		case 'spanish': shape = 'M40.4,4.1v434.8h0.2c0,144.1,116.9,261,261,261s261-116.9,261-261h-0.5V4.1H40.4z';
			break;
		case 'renaissance': shape = 'M580.9,92.1l-34.4-70.3c-119.1,19.6-159.7-48.7-245-9.4c-85.2-39.3-125.8,29-245.1,9.4L22.1,92.1 c50.4,43.1,32.7,197.6,32.7,361c0,125.2,94.6,249.8,245.7,250.9l0,0c0.3,0,0.6,0,1,0c0.3,0,0.6,0,1,0l0,0 c151.1-1.1,245.7-125.6,245.7-250.9C548.1,289.7,530.5,135.2,580.9,92.1z';
			break;
		case 'rn2': shape = 'M118.3,0h364.9c11.6,48.2,40.6,79,100.5,78.8c5.9,206.8-33.4,414.3-280.6,625.2 C89.4,530.6,10.7,317.3,19.4,78.1C64.6,75.1,102.9,59.2,118.3,0z';
			break;

		default: shape = "M596.4,6.4c0,0,1.5,196.9,0,295.2c-1.4,94.8-6.1,168.8-48.6,226.7c-51.1,69.7-136.4,120-246.1,169.4 C192,648.2,106.8,597.9,55.6,528.2C13.2,470.4,8.4,396.4,7,301.6C5.6,203.1,5.5,104.7,7,6.4H596.4z";
	}

	return (
		<clipPath id="shieldPath">
			<path id="clipMain" d={ shape } />
		</clipPath>
	)
}


export function Divisions({ type, colors, pattern = null }) {

	let division
	let fill = (pattern) ? `url(#${pattern})` : match(colors[0]).hex

	switch (type) {
		case 'party per pale': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="800" fill={match(colors[1]).hex}></rect>
				<rect width="303" height="800" x="301" fill={ fill }></rect>
			</g>
		); break;
		case 'party per pale indented': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="800" fill={match(colors[1]).hex}></rect>
				<polygon transform="translate(290)" fill={fill} points="52 0 329 0 329 704 27.5 796 52 704 0 616 52 528 0 440 52 352 0 264 52 176 0 88 52 0 52 0"/>
			</g>
		); break;
		case 'party per bend': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="800" fill={match(colors[1]).hex}></rect>
				<rect width="800" height="900" x="0" fill={ fill } transform="rotate(-43)"></rect>
			</g>
		); break;
		case 'party per fess': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="700" fill={match(colors[1]).hex}></rect>
				<rect width="700" height="300" fill={ fill }></rect>
			</g>
		); break;
		case 'party per fess embattled': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="700" fill={match(colors[1]).hex}></rect>
				<polygon transform="translate(0 300)" points="565.31 55 565.31 0 489.94 0 489.94 55 414.56 55 414.56 0 339.19 0 339.19 55 263.81 55 263.81 0 188.44 0 188.44 55 113.06 55 113.06 0 37.69 0 37.69 55 0 55 0 423 603 423 603 55 565.31 55" fill={ fill } />
			</g>
		); break;
		case 'party per quartely': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="800" fill={match(colors[1]).hex}></rect>
				<rect x="-10" width="312" height="360" fill={ match(colors[0]).hex } />
				<rect x="302" y="360" width="312" height="360" fill={ fill }/>
			</g>
		); break;
		case 'party per chevron': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="800" fill={match(colors[1]).hex}></rect>
				<rect x="-48" y="302" width="400" height="400" fill={fill} transform="rotate(-45 391 391)" />
			</g>
		); break;
		default: division = ( // plain field
			<rect clipPath="url(#escutcheon)" width="700" height="800" fill={ fill }></rect>
		);
	}

	return division
}


export function Ordinaries({ type, colors, pattern = null }) {

	let ordinary
	let fill = (pattern) ? `url(#${pattern})` : match(colors[0]).hex

	switch (type) {
		case 'bend-sinister': ordinary = (
			<rect kind="bend" x="-93.5" y="203" width="970" height="136" transform="rotate(-45 391 391)" fill={ match(colors[1]).hex } />
		);
			break;
		case 'bend': ordinary = (
			<rect kind="bend" x="0" y="-70" width="970" height="136" transform="rotate(45)" fill={ match(colors[1]).hex } />
		);
			break;
		case 'pale': ordinary = (
			<rect kind="pale" x="-266" y="467" width="738" height="204" transform="translate(-267.11 472.61) rotate(-90)" fill={ match(colors[1]).hex } />
		);
			break;
		case 'cross': ordinary = (
			<polygon kind="cross" transform="translate(-150 -130)" points="905.52 376.88 529.01 376.88 529.01 0.38 376.88 0.38 376.88 376.88 0.38 376.88 0.38 529.01 376.88 529.01 376.88 905.52 529.01 905.52 529.01 529.01 905.52 529.01 905.52 376.88" fill={ match(colors[1]).hex } />
		);
			break;
		case 'saltire': ordinary = (
			<polygon kind="saltire" transform="translate(-90 -60)" points="783.06 96.75 686.84 0.53 391.8 295.58 96.75 0.53 0.53 96.75 295.58 391.8 0.53 686.84 96.75 783.06 391.8 488.01 686.84 783.06 783.06 686.84 488.01 391.8 783.06 96.75" fill={ match(colors[1]).hex } />
		);
			break;
		case 'chief': ordinary = (
			<rect kind="chief" x="0" y="0" width="970" height="136" fill={match(colors[1]).hex} />
		);
		break;
		case 'pile': ordinary = (
			<polygon points="310.5 710 604 0 0 0 310.5 710" kind="pile" x="0" y="0" fill={match(colors[1]).hex}/>
		);
			break;
		case 'gyronny': ordinary = (
			<g kind="gyronny">
				<polygon points="0 0 301.5 337 301.5 0 0 0" fill={match(colors[1]).hex}/><polygon points="0 704 301.5 337 0 337 0 704" fill={match(colors[1]).hex}/><polygon points="603 704 301.5 337 301.5 704 603 704" fill={match(colors[1]).hex}/><polygon points="603 0 301.5 337 603 337 603 0" fill={match(colors[1]).hex}/>
			</g>
		)
			break;
		default: ordinary = null
	}

	return (
		<g clipPath="url(#escutcheon)">
			<rect width="700" height="800" fill={ fill }></rect>
			{ ordinary }
		</g>
	)
}

/**
 * A charge is any object or figure placed on a heraldic shield
 * or on any other object of an armorial composition.
 * Any object found in nature or technology may appear
 * as a heraldic charge in armory.
 * Charges can be animals, objects, or geometric shapes.
 */
export function Charge ({ charge, x = 300, y = 360, size = 140 }) {
	// note, twemoji returns a DOM string...
	const url = useMemo(() => twemoji.parse(charge, {
		folder: 'svg',
		ext: '.svg'
	}).split('"')[7], [charge]) // ... easily parsed like so


	if (charge) {
		return (
			<svg x={x} y={y} xmlns="http://www.w3.org/2000/svg"
				transform={`translate(-${size/2} -${size/2 + 25})`} filter="url(#dropshadow)">
				<image width={size} height={size} href={url} />
			</svg>
		)
	} else return null
}

/**
 * Most small charges can be depicted as semé, e.g. semé of roses, semé of estoiles, and so forth.
 * @param {string} options.type     The named type of pattern, corresponds to ID
 * @param {Array}  options.colors   The colors of the whole design, two used in pattern
 */
export function Seme ({ type, colors = ['vert', 'sable', 'argent'] }) {

	let pattern
	switch (type) {
		case 'lozengy': pattern = (
			<g>
				<rect width='30' height='30' fill={match(colors[1]).hex}/>
				<rect x="16" y="-14" width='28' height='28' transform='rotate(45)' fill={match(colors[2]).hex}/>
			</g>
		)
		break;

		case 'fleur-de-lys': pattern = (
			<g>
				<text style={{ fontSize: 25, fill: match(colors[2]).hex, fontFamily: 'Segoe UI Emoji'}} transform="matrix(1 0 0 1 0 25)">⚜</text>
			</g>
		)
		break;

		case 'barry-dancetty': pattern = (
		<g transform="scale(4)">
			<path d="M0  0l5  3v5l-5 -3z" fill={match(colors[2]).hex} />
			<path d="M10 0l-5 3v5l5  -3" fill={match(colors[2]).hex} />
		</g>
		)
		break;

		case 'masoned': pattern = <g fillRule="evenodd"><path fill={match(colors[2]).hex} d="M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z"/></g>;
		break;

		default: pattern = null
	}

	return (
		<pattern id={ type } width="40" height="40" patternUnits="userSpaceOnUse">
			<rect width="40" height="40" fill={ match(colors[1]).hex } />
			{ pattern }
		</pattern>
	)
}
