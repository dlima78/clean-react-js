import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components'
import * as S from './styled'

import React from 'react'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <S.ListWrap>
      {surveys.length
        ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </S.ListWrap>
  )
}

export default List
