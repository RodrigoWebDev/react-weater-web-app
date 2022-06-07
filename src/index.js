import { h, render } from 'preact'
import htm from 'htm'
import App from './components/App'
import './main.css'

const html = htm.bind(h)

render(html`<${App}/>`, document.getElementById('app'))
