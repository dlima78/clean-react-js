import React from 'react'
import styled from 'styled-components'
import {
  Spinner,
  Header
} from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <LoginWrapper>
      <Header />
      <Form>
        <TitleLogin>Login</TitleLogin>
        <InputWrap>
          <Input type="text" placeholder="Digite seu email" />
          <Status>🔴</Status>
        </InputWrap>
        <InputWrap>
          <Input type="password" placeholder="Digite sua senha" />
          <Status>🟢</Status>
        </InputWrap>
        <Button>Entrar</Button>
        <Link>Criar Conta</Link>
        <ErrorWrap>
          <LoadingSpinner />
          <Error>Error</Error>
        </ErrorWrap>
      </Form>
      <Footer></Footer>
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

const InputWrap = styled.div`
  align-items: center;
  display: flex;
  margin-top: 16px;
  position: relative;
`
const Input = styled.input`
  border: 1px solid var(--grey);
  border-radius: 2px;
  flex-grow: 1;
  line-height: 40px;
  outline: none;
  padding: 0px 40px 0px 8px;
  
  &:focus {
    border: 1px solid var(--primaryDark);
  }
`
const Status = styled.span`
  cursor: help;
  position: absolute;
  font-size: 12px;
  right: 8px;
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

const Footer = styled.footer`
  background: var(--primaryDark);
  height: 48px;
`
