import styled from 'styled-components'

export const SurveyItemWrap = styled.li`
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px var(--black);
  display: flex;
  flex-basis: 49%;
  flex-direction: column;
  height: 240px;
  justify-content: space-between;
  margin-bottom: 24px;  

  @media only screen and (max-width: 620px) {
    flex-basis: 100%;
  }
`
export const SurveyContent = styled.div`
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  position: relative;

`

export const Button = styled.div`
  background: #03a9f4;
  border-radius: 0px 0px 8px 8px;
  color: var(--white);
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  text-transform: lowercase;

  &:hover {
    background: var(--primaryDark);
  }
`

export const Time = styled.time`
  align-items: center;
  align-self: center;
  background: #006064;
  border-radius: 24px;
  box-shadow: 6px 8px 0px 0px rgba(0, 0, 0, 0.24);
  color: var(--white);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100px;
  justify-content: center;
  margin-left: 24px;
  width: 100px;
`

export const Day = styled.span`
  font-weight: bold;
  font-size: 32px;
`

export const Month = styled.span`
  text-transform: lowercase;
  margin: 0px 0px 4px;
`

export const Year = styled.span`
  font-size: 16px;
`
export const Title = styled.p`
  align-self: center;
  flex-grow: 1;
  font-size: 18px;
  margin: 24px;
`
