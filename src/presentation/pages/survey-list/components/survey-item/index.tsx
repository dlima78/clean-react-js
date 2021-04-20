import { SurveyModel } from '@/domain/models'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import * as S from './styled'

type Props = {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <S.SurveyItemWrap>
      <S.SurveyContent>
        <Icon iconName={IconName.thumbUp} />
        <S.Time>
          <S.Day role='day'>
            { survey.date.getDate() }
          </S.Day>
          <S.Month role='month'>
            { survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </S.Month>
          <S.Year role='year'>
            { survey.date.getFullYear() }
          </S.Year>
        </S.Time>
        <S.Title role='question'>{ survey.question }</S.Title>
      </S.SurveyContent>
      <S.Button>Ver resultado</S.Button>
    </S.SurveyItemWrap>
  )
}

export default SurveyItem
