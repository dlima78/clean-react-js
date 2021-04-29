import styled from 'styled-components'

type Props = {
  alingSelf?: string
  marginLeft?: string
}

export const CalendarWrap = styled.time.attrs((props: Props) => ({
  alingSelf: props.alingSelf,
  marginLeft: props.marginLeft
}))<Props>`
  align-items: center;
  align-self: ${props => props.alingSelf || 'none'};
  background: #006064;
  border-radius: 24px;
  box-shadow: 6px 8px 0px 0px rgba(0, 0, 0, 0.24);
  color: var(--white);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100px;
  justify-content: center;
  margin-left: ${props => `${props.marginLeft}px` || '0px'};
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
