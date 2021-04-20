import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Footer, Header } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import { Error, List, SurveyContext } from './components'

import * as S from './styled'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ ...state, surveys }))
      .catch(error => setState({ ...state, error: error.message }))
  }, [])
  return (
    <S.SurveyListWrap role='survey-list'>
      <Header />
      <S.ContentWrap>
        <S.ContentTitle>Enquetes</S.ContentTitle>
        <SurveyContext.Provider value={{ state, setState }}>
          { state.error ? <Error error={state.error} /> : <List /> }
        </SurveyContext.Provider>
      </S.ContentWrap>
      <Footer />
    </S.SurveyListWrap>
  )
}

export default SurveyList
