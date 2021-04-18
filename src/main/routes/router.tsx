import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { makeLogin, makeSignup } from '@/main/factories/pages'
import GlobalStyle from '@/presentation/styles/global'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path='/login' exact component={ makeLogin } />
        <Route path='/signup' exact component={ makeSignup} />
        <Route path='/' exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
