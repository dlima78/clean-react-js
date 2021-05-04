import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  100% {
    transform: translateX(100%)
  }
`

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
