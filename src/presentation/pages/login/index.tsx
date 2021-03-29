import React, { useState } from 'react'
import {
  FormStatus,
  Header,
  Footer,
  Input
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

type StateProps = {
  isLoading: boolean
  errorMesssage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMesssage: ''
  })
  return (
    <S.LoginWrapper>
      <Header />
      <Context.Provider value = {state}>
      <S.Form>
        <S.TitleLogin>Login</S.TitleLogin>
        <Input type="text" placeholder="Digite seu email" />
        <Input type="password" placeholder="Digite sua senha" />
        <S.Button role="submit" disabled>Entrar</S.Button>
        <S.Link>Criar Conta</S.Link>
        <FormStatus />
      </S.Form>
      </Context.Provider>
      <Footer />
    </S.LoginWrapper>
  )
}

export default Login
