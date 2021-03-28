import React from 'react'
import {
  FormStatus,
  Header,
  Footer,
  Input
} from '@/presentation/components'
import * as S from './styled'

const Login: React.FC = () => {
  return (
    <S.LoginWrapper>
      <Header />
      <S.Form>
        <S.TitleLogin>Login</S.TitleLogin>
        <Input type="text" placeholder="Digite seu email" />
        <Input type="password" placeholder="Digite sua senha" />
        <S.Button>Entrar</S.Button>
        <S.Link>Criar Conta</S.Link>
        <FormStatus />
      </S.Form>
      <Footer />
    </S.LoginWrapper>
  )
}

export default Login
