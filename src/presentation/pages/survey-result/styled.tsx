import styled from 'styled-components'

type Props = {
  active: boolean
}
export const SurveyResultWrap = styled.div`
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

export const Question = styled.h2`
  color: var(--primaryDark);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
`

export const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`

export const ResultItem = styled.li.attrs((props: Props) => ({
  active: props.active
}))<Props>`
  align-items: center;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px var(--black);
  color: var(--greyDark);
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 16px;

  border: ${props => props.active ? '2px solid #006064' : 'none'}; 
`

export const Img = styled.img`
  height: 50px;
  width: 50px;
`

export const Answer = styled.span`
  margin: 0px 16px;
  flex-grow: 1;
  font-size: 20px;
`

export const Percent = styled.span`
  font-size: 30px;
`

export const Button = styled.button`
  background: #006064;
  border: none;
  border-radius: 4px;
  color: var(--white);
  margin-top: 24px;
  padding: 16px;

  &:hover {
    background: #00838f;
  }
`
export const LoadingWrap = styled.div`
  align-items: center;
  background-color: rgba(255,255,255, 0.5);
  bottom: 0;
  cursor: wait;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

export const Loading = styled.div`
  align-items: center;  
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
  width: 300px;
`
export const LoadingText = styled.span`
  color: var(--white);
  margin-bottom: 8px;
  text-transform: lowercase;
`
