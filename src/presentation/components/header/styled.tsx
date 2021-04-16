import styled from 'styled-components'

export const HeaderWrap = styled.div`
  display: flex;
  background-color: var(--greyDark);
  justify-content: center;
`

export const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  max-width: 800px;
  padding: 24px 40px;
`
export const LogoutWrap = styled.div`
  align-items: flex-end;
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const UserName = styled.span`
  margin-bottom: 8px;
`

export const LogoutLink = styled.a`
  color: var(--white);
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`
