import { SurveyResultAnswerModel } from '@/domain/models'
import React from 'react'
import * as S from './styled'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  return (
    <S.ResultItem active={!!answer.isCurrentAccountanswer} role='answer-wrap'>
      { answer.image && <S.Img role='image' src={answer.image} alt={answer.answer} /> }
      <S.Answer role='answer' >{ answer.answer }</S.Answer>
      <S.Percent role='percent' >{ answer.percent}%</S.Percent>
    </S.ResultItem>
  )
}

export default Answer
