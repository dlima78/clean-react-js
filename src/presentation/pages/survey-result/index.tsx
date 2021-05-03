import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import * as S from './styled'

import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
  }, [])
  return (
    <S.SurveyResultWrap>
      <Header />
      <S.ContentWrap role='survey-result' >
        { state.surveyResult &&
          <>
            <S.HGroup>
            <Calendar date={new Date()} />
            <S.Question>Qual é o seu framework web favorito Qual é o seu framework web favorito Qual é o seu framework web favorito?</S.Question>
            </S.HGroup><S.ResultList>
                <FlipMove>
                  <S.ResultItem>
                    <S.Img src='http://fordevs.herokuapp.com/static/img/logo-react.png' />
                    <S.Answer>ReactJs</S.Answer>
                    <S.Percent>50%</S.Percent>
                  </S.ResultItem>
                  <S.ResultItem>
                    <S.Img src='http://fordevs.herokuapp.com/static/img/logo-react.png' />
                    <S.Answer>ReactJs</S.Answer>
                    <S.Percent>50%</S.Percent>
                  </S.ResultItem>
                  <S.ResultItem active>
                    <S.Img src='http://fordevs.herokuapp.com/static/img/logo-react.png' />
                    <S.Answer>ReactJs</S.Answer>
                    <S.Percent>50%</S.Percent>
                  </S.ResultItem>
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
