/**
 * A charge is any object or figure placed on a heraldic shield
 * or on any other object of an armorial composition.
 * Any object found in nature or technology may appear
 * as a heraldic charge in armory.
 * Charges can be animals, objects, or geometric shapes.
 */

import React from 'react';

export function Charge ({ charge, x = 300, y = 360, size = 140, color = '#000' }) {
	if (charge) {
		return <text x={x} y={y} textAnchor="middle" style={{ fontSize: size, color: color }}>{ charge }</text>
	} else return null
}
