import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import GlobalStyle from '@/presentation/styles/global'

type Factory = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path='/login' exact component={ factory.makeLogin } />
        <Route path='/signup' exact component={factory.makeSignup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
