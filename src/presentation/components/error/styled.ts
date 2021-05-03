import styled from 'styled-components'

export const ErrorWrap = styled.div`
  align-items: center;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px var(--black);
  display: flex;
  flex-direction: column;
  padding: 40px;
`

export const ErrorMessage = styled.span`
  font-size: 20px;
  margin-bottom: 24px;
  text-align: center;
`

export const Button = styled.button`
  background: var(--invalid);
  border: none;
  border-radius: 4px;
  color: var(--white);
  padding: 8px 24px;
`
