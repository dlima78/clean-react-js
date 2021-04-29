import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Calendar, Icon, IconName } from '@/presentation/components'
import React from 'react'
import * as S from './styled'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <S.SurveyItemWrap>
      <S.SurveyContent>
        <Icon iconName={iconName} />
        <Calendar
          alingSelf='center'
          marginLeft='24'
          date={survey.date} />
        <S.Title role='question'>{ survey.question }</S.Title>
      </S.SurveyContent>
      <S.Button>Ver resultado</S.Button>
    </S.SurveyItemWrap>
  )
}

export default SurveyItem
