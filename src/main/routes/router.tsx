import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { makeLogin, makeSignup, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import GlobalStyle from '@/presentation/styles/global'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path='/login' exact component={ makeLogin } />
          <Route path='/signup' exact component={ makeSignup} />
          <PrivateRoute path='/' exact component={makeSurveyList} />
          <PrivateRoute path='/surveys/:id' component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
