import "react-hot-loader/patch"
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

const block_id = (typeof drupalSettings !== 'undefined' )? 
  drupalSettings.block_id : 'app';

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