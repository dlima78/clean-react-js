import styled from 'styled-components'

export const Header = styled.header`
  align-items: center;
  background: var(--greyDark);
  border-top: 40px solid var(--black);
  display: flex;
  flex-direction: column;
  padding-top: 40px;

  @media only screen and (max-width: 620px) {
    padding-top: 20px;
  }
`

export const LogoDescription = styled.h1`
  color: var(--white);
  margin: 16px 0px 40px;
`
