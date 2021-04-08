import React, { useState, useEffect } from 'react'
import { FormStatus, Header, Footer, Input, SubmitButton } from '@/presentation/components'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'

import * as S from './styled'
import { Validation } from '@/presentation/protocols'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (state.isLoading || state.isFormInvalid) {
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
        <SubmitButton text='Entrar' />
        <S.LinkStyled role='signup' to='/signup'>Criar Conta</S.LinkStyled>
        <FormStatus />
      </S.Form>
      </Context.Provider>
      <Footer />
    </S.LoginWrapper>
  )
}

export default Login
