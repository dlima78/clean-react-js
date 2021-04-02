import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import GlobalStyle from '@/presentation/styles/global'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path='/login' exact component={ makeLogin } />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
