import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Square} from './components/Square'

const rootElement = <Square player='X' onClick={() => document.write('Clicked!')} />

ReactDOM.render(
	rootElement,
	document.getElementById('root'),
)
