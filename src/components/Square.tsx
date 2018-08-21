import * as React from 'react'

interface SquareProps {
	player: 'X' | 'O'
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Square = (props: SquareProps) =>
	<button onClick={props.onClick}>
		{props.player}
	</button>
