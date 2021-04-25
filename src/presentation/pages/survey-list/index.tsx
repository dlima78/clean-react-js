import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer, Header } from '@/presentation/components'

import React, { useEffect, useState } from 'react'
import { Error, List, SurveyContext } from './components'
import { useErrorHandler } from '@/presentation/components/hooks'

import * as S from './styled'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => handleError(error))
  }, [state.reload])

  const reload = (): void => {
    setState({
      surveys: [], error: '', reload: !state.reload
    })
  }

  return (
    <S.SurveyListWrap role='survey-list'>
      <Header />
      <S.ContentWrap>
        <S.ContentTitle>Enquetes</S.ContentTitle>
        <SurveyContext.Provider value={{ state, setState }}>
          { state.error ? <Error error={state.error} reload={reload} /> : <List /> }
        </SurveyContext.Provider>
      </S.ContentWrap>
      <Footer />
    </S.SurveyListWrap>
  )
}

export default SurveyList
