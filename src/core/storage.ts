import {Coordinate} from './coordinate'

export interface BoardStorage {
	getCoords(coord: Coordinate): boolean
	setCoords(coord: Coordinate, bit: boolean): void
}
