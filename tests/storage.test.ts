import {testProp, fc} from 'ava-fast-check'
import test from 'ava'
import {ArrayStorage, DEFAULT_BOARD_SIZE} from '../src/core/storage'
import {Piece} from '../src/core/piece'
import {some, none} from 'fp-ts/lib/Option'

const size = DEFAULT_BOARD_SIZE

const boundedInt = fc.integer(0, size - 1)

let b: ArrayStorage

test.beforeEach('setup ArrayStorage instance', () => {
	b = new ArrayStorage(size)
})

test('ArrayStorage initializes to empty board', t => {
	for (let i = 0; i < DEFAULT_BOARD_SIZE; i++) {
		for (let j = 0; j < DEFAULT_BOARD_SIZE; j++) {
			const point = { x: i, y: j }
			t.true(b.getSquare(point).isNone())
		}
	}
})

test('ArrayStorage returns none for out-of-bounds square', t => {
	const p1 = { x: -1, y: -1 }
	const p2 = { x: size, y: size }
	const p3 = { x: size, y: 0 }
	const p4 = { x: 0, y: size }

	const points = [p1, p2, p3, p4]
	const squares = points.map(p => b.getSquare(p))


	t.true(squares.every(s => s.isNone()))
})

test('ArrayStorage unsets a square correctly', t => {
	const point = { x: 3, y: 4 }
	b.unsetSquare({ x: 3, y: 4 })

	t.deepEqual(b.getSquare(point), none)
})

testProp('ArrayStorage sets a square correctly', [boundedInt!, boundedInt!] as any, (x: number, y: number) => {
	const point = { x, y }
	b.setSquare(point, Piece.Black)
	const square = b.getSquare(point)
	return square.isSome() && square.value == Piece.Black
})
