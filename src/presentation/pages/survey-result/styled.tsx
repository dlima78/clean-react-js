import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  100% {
    transform: translateX(100%)
  }
`

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

  &:empty {
    background-repeat: no-repeat;
    background-image: 
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc),
      linear-gradient(to right, #ccc, #ccc);
    background-position: 
      40px 40px,
      156px 45px,
      156px 70px,
      156px 95px,
      40px 172px,
      40px 270px,
      40px 368px;
    background-size:
      100px 100px,
      40% 20px,
      75% 20px,
      60% 20px,
      90% 82px,
      90% 82px,
      90% 82px;
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
        
    @media only screen and (max-width: 620px) {
      background-repeat: no-repeat;
      background-image: 
        linear-gradient(to right, #ccc, #ccc),
        linear-gradient(to right, #ccc, #ccc),
        linear-gradient(to right, #ccc, #ccc),
        linear-gradient(to right, #ccc, #ccc),
        linear-gradient(to right, #ccc, #ccc),
        linear-gradient(to right, #ccc, #ccc),
        linear-gradient(to right, #ccc, #ccc);
      background-position: 
        40px 40px,
        156px 45px,
        156px 70px,
        156px 95px,
        40px 224px,
        40px 312px,
        40px 400px;
      background-size:
        100px 100px,
        40% 20px,
        75% 20px,
        60% 20px,
        78% 76px,
        78% 76px,
        78% 76px;
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
  }
`

export const Question = styled.h2`
  color: var(--primaryDark);
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;
  margin-left: 16px;
  text-transform: uppercase;

  @media only screen and (max-width: 620px) {
    font-size: 16px;
  }
`
export const HGroup = styled.hgroup`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
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
  margin-right: 16px;

  @media only screen and (max-width: 620px) {
    height: 40px;
    width: 40px;
  }  
`

export const Answer = styled.span`
  margin-right: 16px;
  flex-grow: 1;
  font-size: 20px;

  @media only screen and (max-width: 620px) {
    font-size: 16px;
  }
`

export const Percent = styled.span`
  font-size: 30px;

  @media only screen and (max-width: 620px) {
    font-size: 20px;
  }
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