import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Footer, LoginHeader, Input, FormStatus, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'
import * as S from './styled'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount, updateCurrentAccount }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await updateCurrentAccount.save(account)
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
    <S.SignupWrap>
       <LoginHeader />
      <Context.Provider value = {{ state, setState }}>
      <S.Form role='form' onSubmit={handleSubmit} >
        <S.TitleSignup>Login</S.TitleSignup>
        <Input type="text" name='name' placeholder="Digite seu nome" />
        <Input type="text" name='email' placeholder="Digite seu email" />
        <Input type="password" name='password' placeholder="Digite sua senha" />
        <Input type="password" name='passwordConfirmation' placeholder="Repita sua senha" />
        <SubmitButton text='Criar Conta' />
        <S.LinkStyled role='login' to='/login' replace>Já possui conta?</S.LinkStyled>
        <FormStatus />
      </S.Form>
      </Context.Provider>
      <Footer />
    </S.SignupWrap>
  )
}

export default Signup
