import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import * as S from './styled'

const SurveyItem: React.FC = () => {
  return (
    <S.SurveyItemWrap>
      <S.SurveyContent>
        <Icon iconName={IconName.thumbUp} />
        <S.Time>
          <S.Day>22</S.Day>
          <S.Month>03</S.Month>
          <S.Year>2020</S.Year>
        </S.Time>
        <S.Title>Qual é o seu framework web favorito?</S.Title>
      </S.SurveyContent>
      <S.Button>Ver resultado</S.Button>
    </S.SurveyItemWrap>
  )
}

export default SurveyItem
