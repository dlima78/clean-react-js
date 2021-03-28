import React from 'react'
import ReactDOM from 'react-dom'
import { Login } from '@/presentation/pages'
import GlobalStyle from './global-styled'

ReactDOM.render(
  <>
    <GlobalStyle />
    <Login />
  </>
  ,
  document.getElementById('main')
)
