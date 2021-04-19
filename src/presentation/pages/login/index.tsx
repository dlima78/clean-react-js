import React, { useState, useEffect, useContext } from 'react'
import { FormStatus, LoginHeader, Footer, Input, SubmitButton } from '@/presentation/components'
import { Authentication } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'

import * as S from './styled'
import { Validation } from '@/presentation/protocols'
import { FormContext, ApiContext } from '@/presentation/contexts'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
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
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
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
      setCurrentAccount(account)
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
    <S.LoginWrap>
      <LoginHeader />
      <FormContext.Provider value = {{ state, setState }}>
      <S.Form role='form' onSubmit={handleSubmit}>
        <S.TitleLogin>Login</S.TitleLogin>
        <Input type="text" name='email' placeholder="Digite seu email" />
        <Input type="password" name='password' placeholder="Digite sua senha" />
        <SubmitButton text='Entrar' />
        <S.LinkStyled role='signup' to='/signup'>Criar Conta</S.LinkStyled>
        <FormStatus />
      </S.Form>
      </FormContext.Provider>
      <Footer />
    </S.LoginWrap>
  )
}

export default Login
