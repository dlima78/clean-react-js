import { SurveyItemEmpty, SurveyItem, SurveyContext } from '@/presentation/pages/survey-list/components'
import * as S from './styled'

import React, { useContext } from 'react'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <S.ListWrap>
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        : <SurveyItemEmpty />
      }
    </S.ListWrap>
  )
}

export default List
