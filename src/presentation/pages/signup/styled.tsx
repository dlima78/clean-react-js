import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`
export const Form = styled.form`
  align-self: center;
  background: var(--white);
  box-shadow: 0px 1px 3px -1px var(--black);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 40px;
`
export const Button = styled.button`
  border: none;
  border-radius: 4px;
  background: var(--blue);
  color: var(--white);
  font-size: 16px;
  line-height: 40px;
  margin-top: 32px;
  outline: none;

  &:disabled {
    background-color: var(--disabled);
    color: var(--greyDark);
    
    &:hover {
      opacity: 1;
    }
  }

  &:hover {
    opacity: 0.9;
  }
`

export const LinkStyled = styled(Link)`
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

export const TitleSignup = styled.h3`
  color: var(--primaryDark);
  font-size: 20px;
  font-weight: 700;
`
