import styled, { keyframes } from 'styled-components'

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

const shimmer = keyframes`
  100% {
    transform: translateX(100%)
  }
`

export const ListItem = styled.li`
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px var(--black);
  display: flex;
  flex-basis: 49%;
  flex-direction: column;
  height: 240px;
  justify-content: space-between;
  margin-bottom: 24px;

  &:empty {    
    background-repeat: no-repeat;
    background-image: 
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc);
    background-position: 
      24px 60px,
      left 0 bottom 0,
      148px 82px,
      148px 102px,
      148px 122px;;
    background-size:
      100px 100px,
      100% 40px,
      140px 16px,
      120px 16px,
      160px 16px;
    position: relative;
    overflow: hidden;

      &::after {
        content: '';
        animation: ${shimmer} 1.2s infinite;
        background-image: linear-gradient(to right, transparent, rgba(255,255,255, 0.2), transparent);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform: translateX(-100%);
      }
  }

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
