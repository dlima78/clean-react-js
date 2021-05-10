import React from 'react'
import { useHistory } from 'react-router-dom'

import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import { Answer } from '@/presentation/pages/survey-result/components'
import * as S from './styled'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()
  return (
    <>
      <S.HGroup>
        <Calendar date={surveyResult.date} />
        <S.Question role='question'>{surveyResult.question} </S.Question>
      </S.HGroup>
      <S.ResultList data-testid='answers'>
        {surveyResult.answers.map(answer => <Answer key={answer.answer} answer={answer} />)}
      </S.ResultList>
      <S.Button role='back-button' onClick={goBack} >Voltar</S.Button>
    </>
  )
}

export default Result
