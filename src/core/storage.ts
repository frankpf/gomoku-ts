import {Option, some, none} from 'fp-ts/lib/Option'
import {Point} from './point'
import {Piece} from './piece'
import {inspect} from 'util'

export interface Board {
	getSquare(point: Point): Option<Piece>
	setSquare(point: Point, piece: Piece): void
	unsetSquare(point: Point): void
}

export const DEFAULT_BOARD_SIZE = 15

export class ArrayStorage implements Board {
	private data: Option<Piece>[][]
	private readonly size: number

	constructor(size = DEFAULT_BOARD_SIZE) {
		this.data = Array(size).fill(undefined).map(() => Array(size).fill(none))
		this.size = size
	}

	public getSquare(p: Point): Option<Piece> {
		if (p.x < 0 || p.y < 0 || p.x >= this.size || p.y >= this.size) {
			return none
		}
		return this.data[p.x][p.y]
	}

	public setSquare(p: Point, piece: Piece): void {
		this.data[p.x][p.y] = some(piece)
	}

	public unsetSquare(p: Point): void {
		this.data[p.x][p.y] = none
	}

	public toString() {
		let str = ''

		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				const repr = this.data[i][j]
					.fold(
						'N',
						p => p == Piece.Black ? 'B' : 'W',
					)
				str += repr
			}
			str += '\n'
		}

		return str
	}

	public [inspect.custom]() {
		return this.toString()
	}
}
