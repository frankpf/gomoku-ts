import {testProp, fc} from 'ava-fast-check'
import test from 'ava'
import {countUpTo, checkWin, getMoveOperation} from '../src/core/checkWin'
import {Direction} from '../src/core/direction'
import {ArrayStorage, DEFAULT_BOARD_SIZE} from '../src/core/storage'
import {Piece} from '../src/core/piece'

const size = DEFAULT_BOARD_SIZE

let b: ArrayStorage
let counter: ReturnType<typeof countUpTo>
test.beforeEach('setup ArrayStorage instance', () => {
	b = new ArrayStorage(size)
	counter = countUpTo(b)
})

test('countUpTo works correctly in empty board', t => {
	const count = counter(Direction.Northwest, { x: 0, y: 0 }, Piece.Black, 5)
	t.deepEqual(count, 0)
})

test('countUpTo works correctly on a partial board', t => {
	b.setSquare({ x: 0, y: 0 }, Piece.Black)
	b.setSquare({ x: 0, y: 1 }, Piece.Black)
	b.setSquare({ x: 0, y: 2 }, Piece.Black)
	b.setSquare({ x: 0, y: 3 }, Piece.White)
	b.setSquare({ x: 0, y: 4 }, Piece.Black)
	b.setSquare({ x: 0, y: 5 }, Piece.Black)

	b.setSquare({ x: 1, y: 1 }, Piece.Black)
	b.setSquare({ x: 2, y: 2 }, Piece.Black)
	b.setSquare({ x: 3, y: 3 }, Piece.Black)

	const c1 = counter(Direction.South, { x: 0, y: 0 }, Piece.Black, 5)
	t.deepEqual(c1, 3)

	const c2 = counter(Direction.South, { x: 0, y: 0 }, Piece.Black, 2)
	t.deepEqual(c2, 2)

	const c3 = counter(Direction.North, { x: 0, y: 5 }, Piece.Black, 5)
	t.deepEqual(c3, 2)

	const c4 = counter(Direction.North, { x: 0, y: 0 }, Piece.Black, 5)
	t.deepEqual(c4, 1)

	const c5 = counter(Direction.Southeast, { x: 0, y: 0 }, Piece.Black, 5)
	t.deepEqual(c5, 4)
})


const boundedInt = fc.integer(0, size-1)
const pieceArbitrary = fc.constantFrom(Piece.Black, Piece.White)
const directionArbitrary = fc.constantFrom(
	Direction.North,
	Direction.Northeast,
	Direction.Northwest,

	Direction.South,
	Direction.Southeast,
	Direction.Southwest,

	Direction.East,
	Direction.West,
)

testProp('countUpTo works correctly', [
	fc.integer(5, 14), /* center x */
	fc.integer(5, 14), /* center y */
	pieceArbitrary, /* Random piece to compare to */
	pieceArbitrary, /* Random piece to fill the board with */
	fc.integer(0, 5), /* Number of times to fill */
	directionArbitrary, /* Random direction */
	] as any,
	(x: number, y: number, piece: Piece, filler: Piece, num: number, dir: Direction) => {
		const center = { x, y }
		const moveOp = getMoveOperation(dir)

		const points = []

		for (let i = 0; i < num; i++) {
			points.push({
				x: center.x + (moveOp.x * i),
				y: center.y + (moveOp.y * i),
			})
		}

		for (const point of points) {
			b.setSquare(point, filler)
		}

		const count = counter(dir, center, piece, num)
		if (piece !== filler) {
			return count === 0
		} else {
			return count === num
		}

	})
