import {Coordinate} from './coordinate'
import {BoardStorage} from './storage'
import * as Direction from './direction'

const Negative = -1
const Positive = 1
const Neutral = 0

type MoveIncrement = -1 | 0 | 1

interface MoveOperation {
	x: MoveIncrement
	y: MoveIncrement
}

const getMoveOperation = (dir: Direction.Direction): MoveOperation => {
	switch (dir) {
		/* Positive Y */
		case Direction.North:
			return { x: Neutral, y: Positive }
		case Direction.Northeast:
			return { x: Positive, y: Positive }
		case Direction.Northwest:
			return { x: Negative, y: Positive }
		/* Negative Y */
		case Direction.South:
			return { x: Neutral, y: Negative }
		case Direction.Southeast:
			return { x: Positive, y: Negative }
		case Direction.Southwest:
			return { x: Negative, y: Negative }
		/* Neutral Y */
		case Direction.East:
			return { x: Positive, y: Neutral }
		case Direction.West:
			return { x: Negative, y: Neutral }
	}
}

const countUpTo = (bs: BoardStorage) => (dir: Direction.Direction, center: Coordinate, bit: boolean, upTo: number) => {
	const op = getMoveOperation(dir)

	let count = 0
	for (let i = 0; i < upTo; i++) {
		const currentCoord: Coordinate = {
			x: center.x + (op.x * i),
			y: center.y + (op.y * i),
		}
		const value = bs.getCoords(currentCoord)

		if (value != bit) {
			break
		}

		count++
	}

	return count
}

export const checkWin = (bs: BoardStorage) => (x: number, y: number) => {
	return true
}


const getBoardStorage = (): BoardStorage => {

	function getCoords(coord: Coordinate): boolean {

	}

	function setCoords(coord: Coordinate, bit: boolean) {

	}

	return {
		getCoords,
		setCoords
	}
}
