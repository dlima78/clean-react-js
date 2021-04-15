import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import GlobalStyle from '@/presentation/styles/global'
import { SurveyList } from '@/presentation/pages'

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
        <Route path='/surveys' exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
