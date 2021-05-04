import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router'

import { Calendar } from '@/presentation/components'
import * as S from './styled'
import { LoadSurveyResult } from '@/domain/usecases'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()
  return (
    <>
      <S.HGroup>
        <Calendar date={ surveyResult.date } />
        <S.Question role='question'>{ surveyResult.question } </S.Question>
      </S.HGroup>
      <S.ResultList >
        <FlipMove data-testid='answers'>
          { surveyResult.answers.map(answer => (
            <S.ResultItem active={!!answer.isCurrentAccountanswer} role='answer-wrap' key={answer.answer}>
              { answer.image && <S.Img role='image' src={answer.image} alt={answer.answer} /> }
              <S.Answer role='answer' >{ answer.answer }</S.Answer>
              <S.Percent role='percent' >{ answer.percent}%</S.Percent>
            </S.ResultItem>
          ))}
        </FlipMove>
      </S.ResultList>
      <S.Button role='back-button' onClick={goBack} >Voltar</S.Button>
    </>
  )
}

export default Result
