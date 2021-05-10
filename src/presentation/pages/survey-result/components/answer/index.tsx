import { SurveyResultAnswerModel } from '@/domain/models'
import { SurveyResultContext } from '@/presentation/pages/survey-result/components'
import * as S from './styled'

import React, { useContext } from 'react'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext)
  const activeClassName = answer.isCurrentAccountAnswer ? 'active' : ''
  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains('active')) {
      return
    }
    onAnswer(answer.answer)
  }
  return (
    <S.ResultItem
      role='answer-wrap'
      onClick={answerClick}
      className={activeClassName}
    >
      { answer.image && <S.Img role='image' src={answer.image} alt={answer.answer} />}
      <S.Answer role='answer' >{answer.answer}</S.Answer>
      <S.Percent role='percent' >{answer.percent}%</S.Percent>
    </S.ResultItem>
  )
}

export default Answer
