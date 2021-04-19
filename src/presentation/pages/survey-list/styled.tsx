import styled from 'styled-components'

export const SurveyListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

export const ContentWrap = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 800px;
  padding: 40px;
  width: 100%;
`

export const ContentTitle = styled.h3`
  color: var(--primaryDark);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
  text-transform: uppercase;
`

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 620px) {
    flex-direction: column;
  }
`
