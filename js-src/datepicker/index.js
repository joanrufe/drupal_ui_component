import "react-hot-loader/patch"
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

let block_id = "app" // Default poijs id

if (typeof drupalSettings !== 'undefined') {
  block_id = drupalSettings.block_id
} 

const render = (Component, elemId) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById(elemId)
  )
}

render(App,block_id)

if (module.hot) {
  module.hot.accept('./app', () => { render(App, block_id) })
}