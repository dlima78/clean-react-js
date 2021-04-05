import { Footer, Header } from '@/presentation/components'
import React from 'react'

import * as S from './styled'

const Signup: React.FC = () => {
  return (
    <S.SignupWrapper>
      <Header />
      <S.Form>
        <S.TitleSignup>Criar conta</S.TitleSignup>
        <S.Input type='text' name='name' placeholder='Digite seu nome' />
        <S.Input type='email' name='email' placeholder='Digite seu email' />
        <S.Input type='password' name='password' placeholder='Escolha uma senha' />
        <S.Input type='password' name='passwordConfirmation' placeholder='Repita a senha' />
        <S.Button>Cadastrar</S.Button>
        <S.LinkStyled to='/login' >Fazer Login</S.LinkStyled>
      </S.Form>
      <Footer />
    </S.SignupWrapper>
  )
}

export default Signup
