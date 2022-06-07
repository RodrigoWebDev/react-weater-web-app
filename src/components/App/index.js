import { h } from 'preact'
import htm from 'htm'

const html = htm.bind(h)

const App = () => html`<h1>Hello World</h1>`

export default App
