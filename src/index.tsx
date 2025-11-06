/* @refresh reload */
import { render } from 'solid-js/web'

import type { Component } from 'solid-js'
import './index.css'

const App: Component = () => {
    return <p>hello!</p>
}

render(() => <App />, document.getElementById('root')!)
