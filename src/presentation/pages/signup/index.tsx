import React, { useState, useEffect } from 'react'

import { Footer, Header, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols'
import * as S from './styled'

type Props = {
  validation: Validation
}

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    nameError: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    })
  }, [state.name, state.email])
  return (
    <S.SignupWrapper>
       <Header />
      <Context.Provider value = {{ state, setState }}>
      <S.Form role='form' >
        <S.TitleSignup>Login</S.TitleSignup>
        <Input type="text" name='name' placeholder="Digite seu nome" />
        <Input type="text" name='email' placeholder="Digite seu email" />
        <Input type="password" name='password' placeholder="Digite sua senha" />
        <Input type="password" name='passwordConfirmation' placeholder="Repita sua senha" />
        <S.Button disabled >Criar Conta</S.Button>
        <S.LinkStyled role='login'>Já possui conta?</S.LinkStyled>
        <FormStatus />
      </S.Form>
      </Context.Provider>
      <Footer />
    </S.SignupWrapper>
  )
}

export default Signup
