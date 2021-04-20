import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  100% {
    transform: translateX(100%)
  }
`

export const SurveyItemEmptyWrap = styled.li`
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px var(--black);
  display: flex;
  flex-basis: 49%;
  flex-direction: column;
  height: 240px;
  justify-content: space-between;
  margin-bottom: 24px;
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

  @media only screen and (max-width: 620px) {
    flex-basis: 100%;
  }
`
