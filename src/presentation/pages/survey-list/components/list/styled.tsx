import styled from 'styled-components'

export const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 620px) {
    flex-direction: column;
  }
`
