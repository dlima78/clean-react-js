import { Header, Footer, Loading, Error } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import * as S from './styled'

import React, { useEffect, useState } from 'react'

import { useErrorHandler } from '@/presentation/components/hooks'
import { SurveyResultContext, SurveyResultData } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, isLoading: false, surveyResult })))
      .catch(handleError)
  }
  const reload = (): void => setState(old => ({
    isLoading: false, surveyResult: null, error: '', reload: !old.reload
  }))

  return (
    <S.SurveyResultWrap>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <S.ContentWrap role='survey-result' >
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </S.ContentWrap>
      </SurveyResultContext.Provider>
      <Footer />
    </S.SurveyResultWrap>
  )
}

export default SurveyResult
