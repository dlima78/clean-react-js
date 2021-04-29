import React from 'react'

import * as S from './styled'

type Props = {
  date: Date
  alingSelf?: string
  marginLeft?: string
}

const Calendar: React.FC<Props> = ({ date, alingSelf, marginLeft }: Props) => {
  return (
    <S.CalendarWrap
      alingSelf={alingSelf}
      marginLeft={marginLeft}
    >
      <S.Day role='day'>
        { date.getDate().toString().padStart(2, '0') }
      </S.Day>
      <S.Month role='month'>
        { date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
      </S.Month>
      <S.Year role='year'>
        { date.getFullYear() }
      </S.Year>
    </S.CalendarWrap>
  )
}

export default Calendar
