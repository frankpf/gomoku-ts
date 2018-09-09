import {Point} from './point'
import {Piece} from './piece'
import {Board} from './storage'
import {Direction} from './direction'

const Negative = -1
const Positive = 1
const Neutral = 0

type MoveIncrement = -1 | 0 | 1

interface MoveOperation {
	x: MoveIncrement
	y: MoveIncrement
}

export const getMoveOperation = (dir: Direction): MoveOperation => {
	switch (dir) {
		/* Positive Y */
		case Direction.North:
			return { x: Neutral, y: Negative }
		case Direction.Northeast:
			return { x: Positive, y: Negative }
		case Direction.Northwest:
			return { x: Negative, y: Negative }
		/* Negative Y */
		case Direction.South:
			return { x: Neutral, y: Positive }
		case Direction.Southeast:
			return { x: Positive, y: Positive }
		case Direction.Southwest:
			return { x: Negative, y: Positive }
		/* Neutral Y */
		case Direction.East:
			return { x: Positive, y: Neutral }
		case Direction.West:
			return { x: Negative, y: Neutral }
	}
}

export const countUpTo = (b: Board) => (dir: Direction, center: Point, piece: Piece, upTo: number) => {
	const op = getMoveOperation(dir)

	let count = 0
	for (let i = 0; i < upTo; i++) {
		const currentCoord: Point = {
			x: center.x + (op.x * i),
			y: center.y + (op.y * i),
		}
		const square = b.getSquare(currentCoord)

		if (square.isNone() || square.isSome() && square.value !== piece) {
			break
		}

		count++
	}

	return count
}

export const checkWin = (b: Board) => (x: number, y: number) => {
	return true
}
