import React, { useState, useEffect } from 'react'
import {
  FormStatus,
  Header,
  Footer,
  Input
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'
import { Validation } from '@/presentation/protocols'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
  }

  return (
    <S.LoginWrapper>
      <Header />
      <Context.Provider value = {{ state, setState }}>
      <S.Form onSubmit={handleSubmit}>
        <S.TitleLogin>Login</S.TitleLogin>
        <Input type="text" name='email' placeholder="Digite seu email" />
        <Input type="password" name='password' placeholder="Digite sua senha" />
        <S.Button disabled={!!state.emailError || !!state.passwordError} >Entrar</S.Button>
        <S.Link>Criar Conta</S.Link>
        <FormStatus />
      </S.Form>
      </Context.Provider>
      <Footer />
    </S.LoginWrapper>
  )
}

export default Login
