import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { makeLogin, makeSignup } from '@/main/factories/pages'
import GlobalStyle from '@/presentation/styles/global'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import { setCurrentAccountAdapter } from '../adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter
      }}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path='/login' exact component={ makeLogin } />
          <Route path='/signup' exact component={ makeSignup} />
          <Route path='/' exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
