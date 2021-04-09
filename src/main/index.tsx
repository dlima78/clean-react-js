import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import { makeLogin, makeSignup } from '@/main/factories/pages'

ReactDOM.render(
  <Router
    makeLogin={ makeLogin }
    makeSignup={ makeSignup }
  />,
  document.getElementById('main')
)
