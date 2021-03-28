import React from 'react'
import styled from 'styled-components'
import {
  Spinner,
  Header,
  Footer,
  Input
} from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <LoginWrapper>
      <Header />
      <Form>
        <TitleLogin>Login</TitleLogin>
        <Input type="text" placeholder="Digite seu email" />
        <Input type="password" placeholder="Digite sua senha" />
        <Button>Entrar</Button>
        <Link>Criar Conta</Link>
        <ErrorWrap>
          <LoadingSpinner />
          <Error>Error</Error>
        </ErrorWrap>
      </Form>
      <Footer />
    </LoginWrapper>
  )
}

export default Login

const ErrorWrap = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const LoadingSpinner = styled(Spinner)`
  margin-top: 30px;
`
const Error = styled.span`
  margin-top: 30px;
  color: var(--invalid);
  font-size: 14px;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`
const Form = styled.form`
  align-self: center;
  background: var(--white);
  box-shadow: 0px 1px 3px -1px var(--black);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 40px;
`
const Button = styled.button`
  border: none;
  border-radius: 2px;
  background: var(--blue);
  color: var(--white);
  font-size: 16px;
  line-height: 48px;
  margin-top: 32px;

  &:hover {
    opacity: 0.9;
  }
`

const Link = styled.span`
  color: var(--blueDark);
  cursor: pointer;
  font-size: 12px;
  margin-top: 16px;
  text-align: center;

  &:hover {
    color: var(--blue);
    text-decoration: underline;
  }
`

const TitleLogin = styled.h3`
  color: var(--primaryDark);
  font-size: 20px;
  font-weight: 700;
`
