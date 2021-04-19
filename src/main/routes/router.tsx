import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { makeLogin, makeSignup } from '@/main/factories/pages'
import GlobalStyle from '@/presentation/styles/global'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

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
          <PrivateRoute path='/' exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
