import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  FormStatus,
  Header,
  Footer,
  Input
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'
import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <S.LoginWrapper>
      <Header />
      <Context.Provider value = {{ state, setState }}>
      <S.Form role='form' onSubmit={handleSubmit}>
        <S.TitleLogin>Login</S.TitleLogin>
        <Input type="text" name='email' placeholder="Digite seu email" />
        <Input type="password" name='password' placeholder="Digite sua senha" />
        <S.Button disabled={!!state.emailError || !!state.passwordError} >Entrar</S.Button>
        <S.LinkStyled role='signup' to='/signup'>Criar Conta</S.LinkStyled>
        <FormStatus />
      </S.Form>
      </Context.Provider>
      <Footer />
    </S.LoginWrapper>
  )
}

export default Login
