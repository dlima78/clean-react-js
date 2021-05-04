import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import * as S from './styled'

import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch()
  }, [])
  return (
    <S.SurveyResultWrap>
      <Header />
      <S.ContentWrap role='survey-result' >
        { state.surveyResult &&
          <>
            <S.HGroup>
              <Calendar date={ state.surveyResult.date } />
              <S.Question role='question'>{ state.surveyResult.question } </S.Question>
            </S.HGroup>
            <S.ResultList >
              <FlipMove data-testid='answers'>
                { state.surveyResult.answers.map(answer => (
                  <S.ResultItem active={!!answer.isCurrentAccountanswer} role='answer-wrap' key={answer.answer}>
                    { answer.image && <S.Img role='image' src={answer.image} alt={answer.answer} /> }
                    <S.Answer role='answer' >{ answer.answer }</S.Answer>
                    <S.Percent role='percent' >{ answer.percent}%</S.Percent>
                  </S.ResultItem>
                ))}
              </FlipMove>
            </S.ResultList>
              <S.Button>Voltar</S.Button>
            </>
        }
        { state.isLoading && <Loading /> }
        { state.error && <Error error={state.error} reload={ () => {}} /> }
      </S.ContentWrap>
      <Footer />
    </S.SurveyResultWrap>
  )
}

export default SurveyResult
