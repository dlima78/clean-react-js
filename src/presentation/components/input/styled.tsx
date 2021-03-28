import styled from 'styled-components'

export const InputWrap = styled.div`
align-items: center;
display: flex;
margin-top: 16px;
position: relative;
`
export const InputContainer = styled.input`
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
export const Status = styled.span`
cursor: help;
position: absolute;
font-size: 12px;
right: 8px;
`
