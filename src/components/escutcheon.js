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
import React from 'react';


export function Shape({ type }) {
	let shape;

	switch (type) {
		case 'swiss': shape = "M8.3,6.4c-0.5,0,98.1,32.3,147.2,32.3S299.2,6.4,302.7,6.4c2.2,0,98.1,32.3,147.2,32.3s145-32.3,147.2-32.3V93 c0,453.1-288,605.9-294.4,605.9c-13.5,0-294.4-150.4-294.4-606V6.4z";
			break;
		case 'french': shape = 'M291.81,689.64c-34.68-25.81-76.72-31-119.43-33.36-32.38-1.79-64.83-2.41-97.2-4.44-47.8-3-67.35-22.14-72.33-70.25A479.86,479.86,0,0,1,0,533.07C-.16,366.14.45,0,.45,0h589.2s.07,371.77-.15,543.34c0,14.61-1.71,29.26-3.3,43.82-4.43,40.63-24.79,61-65.73,64.2-30.78,2.42-61.75,2.46-92.52,4.91-26.07,2.08-52.44,4.11-77.83,9.89C331,670.51,313.24,680.75,291.81,689.64Z';
			break;
		case 'papal': shape = 'M306.6,692.9c-1.4,2.7-4.8,3.8-7.5,2.2c-0.5-0.3-0.9-0.6-1-1c-19-38.1-50.6-52.1-91.7-50.1 c-24,1.2-48.2-1.2-72.2,0.5c-51,3.6-81.5-30.9-83.6-81.5c-0.3-6.2,0-12.4,0-18.6c0-142.9-0.9-285.7,0.6-428.5 c0.4-40.2-6.6-75-38.2-100c-1.8-1.4-2.5-3.8-1.6-6l0,0c0.3-0.6,0.9-1.6,1.3-1.6c190-0.1,380.1-0.1,572.5-0.1c4.4,0,6.9,5,4.4,8.5 c-0.7,1-1.5,1.9-2.4,2.7c-25.1,23-34.9,51.3-34.7,85.3c0.7,150.6,0.4,301.2,0.1,451.8c0,12.3-1.1,25-4.5,36.7 c-9.1,31.6-34.2,50.3-67.1,50.9c-27.2,0.5-54.4,1.2-81.5-0.1C358.3,642.1,326,654.9,306.6,692.9z';
			break;
		case 'spanish': shape = 'M40.4,4.1v434.8h0.2c0,144.1,116.9,261,261,261s261-116.9,261-261h-0.5V4.1H40.4z';
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
	let fill = (pattern) ? `url(#${pattern})` : colors[0]

	switch (type) {
		case 'party per pale': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="800" fill={ colors[1] }></rect>
				<rect width="300" height="800" x="301" fill={ fill }></rect>
			</g>
		); break;
		case 'party per fess': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="700" fill={ colors[1] }></rect>
				<rect width="700" height="300" fill={ fill }></rect>
			</g>
		); break;
		case 'party per quartely': division = (
			<g clipPath="url(#escutcheon)">
				<rect width="700" height="800" fill={ colors[1] }></rect>
				<rect x="-10" width="312" height="360" fill={ colors[0] } />
				<rect x="302" y="360" width="312" height="360" fill={ fill }/>
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
	let fill = (pattern) ? `url(#${pattern})` : colors[0]

	switch (type) {
		case 'bend-sinister': ordinary = (
			<rect kind="bend" x="-93.5" y="203" width="970" height="136" transform="rotate(-45 391 391)" fill={ colors[1] } />
		);
			break;
		case 'bend': ordinary = (
			<rect kind="bend" x="0" y="-70" width="970" height="136" transform="rotate(45)" fill={ colors[1] } />
		);
			break;
		case 'pale': ordinary = (
			<rect kind="pale" x="-266" y="467" width="738" height="204" transform="translate(-267.11 472.61) rotate(-90)" fill={ colors[1] } />
		);
			break;
		case 'cross': ordinary = (
			<polygon kind="cross" transform="translate(-150 -130)" points="905.52 376.88 529.01 376.88 529.01 0.38 376.88 0.38 376.88 376.88 0.38 376.88 0.38 529.01 376.88 529.01 376.88 905.52 529.01 905.52 529.01 529.01 905.52 529.01 905.52 376.88" fill={ colors[1] } />
		);
			break;
		case 'saltire': ordinary = (
			<polygon kind="saltire" transform="translate(-90 -60)" points="783.06 96.75 686.84 0.53 391.8 295.58 96.75 0.53 0.53 96.75 295.58 391.8 0.53 686.84 96.75 783.06 391.8 488.01 686.84 783.06 783.06 686.84 488.01 391.8 783.06 96.75" fill={ colors[1] } />
		);
			break;
		case 'chief': ordinary = (
			<rect kind="chief" x="0" y="0" width="970" height="136" fill={colors[1]} />
		);
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
export function Charge ({ charge, x = 300, y = 360, size = 140, color = '#111' }) {
	if (charge) {
		return (
			<text
				x={x}
				y={y}
				textAnchor="middle"
				style={
					{
						fontSize: size,
						fill: color,
						filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.1))',
						fontFamily: 'Segoe UI Emoji',
					}
				}
			>
				{ charge[0] }
			</text>
		)
	} else return null
}

/**
 * Most small charges can be depicted as semé, e.g. semé of roses, semé of estoiles, and so forth.
 * @param {string} options.type     The named type of pattern, corresponds to ID
 * @param {Array}  options.colors   The colors of the whole design, two used in pattern
 */
export function Seme ({ type, colors = ['#331', '#ddd', '#c61'] }) {
	let pattern
	switch (type) {
		case 'lozengy': pattern = (
			<g>
				<rect width='30' height='30' fill={colors[1]}/>
				<rect x="16" y="-14" width='28' height='28' transform='rotate(45)' fill={colors[2]}/>
			</g>
		)
		break;

		case 'fleur-de-lys': pattern = (
			<g>
				<text style={{ fontSize: 25, fill: colors[2], fontFamily: 'Segoe UI Emoji'}} transform="matrix(1 0 0 1 0 25)">⚜</text>
			</g>
		)
		break;

		case 'barry-dancetty': pattern = (
		<g transform="scale(4)">
			<path d="M0  0l5  3v5l-5 -3z" fill={colors[2]} />
			<path d="M10 0l-5 3v5l5  -3" fill={colors[2]} />
		</g>
		)
		break;

		case 'masoned': pattern = <g fillRule="evenodd"><path fill={colors[2]} d="M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z"/></g>;
		break;

		default: pattern = null
	}

	return (
		<pattern id={ type } width="40" height="40" patternUnits="userSpaceOnUse">
			<rect width="40" height="40" fill={ colors[1] } />
			{ pattern }
		</pattern>
	)
}
