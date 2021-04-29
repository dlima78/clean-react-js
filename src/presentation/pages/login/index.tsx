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

  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  const validate = (field: string): void => {
    const { password, email } = state
    const formData = { password, email }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
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
