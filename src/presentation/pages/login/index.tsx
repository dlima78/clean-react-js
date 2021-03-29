import React, { useState } from 'react'
import {
  FormStatus,
  Header,
  Footer,
  Input
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })
  return (
    <S.LoginWrapper>
      <Header />
      <Context.Provider value = {{ state, errorState }}>
      <S.Form>
        <S.TitleLogin>Login</S.TitleLogin>
        <Input type="text" name='email' placeholder="Digite seu email" />
        <Input type="password" name='password' placeholder="Digite sua senha" />
        <S.Button disabled>Entrar</S.Button>
        <S.Link>Criar Conta</S.Link>
        <FormStatus />
      </S.Form>
      </Context.Provider>
      <Footer />
    </S.LoginWrapper>
  )
}

export default Login
