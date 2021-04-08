import styled from 'styled-components'

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
