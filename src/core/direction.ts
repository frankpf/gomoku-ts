export const North = 'north'
export const South = 'south'
export const West = 'west'
export const East = 'east'

export const Northwest = 'northwest'
export const Southwest = 'northeast'

export const Northeast = 'northeast'
export const Southeast = 'northeast'

export type Direction =
	| typeof North
	| typeof South
	| typeof West
	| typeof East
	| typeof Northwest
	| typeof Northeast
	| typeof Southwest
	| typeof Southeast
