import styled from 'styled-components'

import { Calendar } from '@/presentation/components'
import { Link } from 'react-router-dom'

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

export const LinkStyled = styled(Link)`
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
export const Title = styled.p`
  align-self: center;
  flex-grow: 1;
  font-size: 18px;
  margin: 24px;
`

export const CalendarWrap = styled.time`
  align-items: center;
  margin-left: 24px;
`

export const CalendarStyled = styled(Calendar)`
  align-self: center;
  margin-left: 24px;
`
