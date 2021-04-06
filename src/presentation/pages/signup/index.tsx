import React, { useState } from 'react'

import { Footer, Header, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import * as S from './styled'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })
  return (
    <S.SignupWrapper>
       <Header />
      <Context.Provider value = {{ state }}>
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
