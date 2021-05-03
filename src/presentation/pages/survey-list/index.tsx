import { Footer, Header, Error } from '@/presentation/components'
import { List, SurveyContext } from '@/presentation/pages/survey-list/components'
import { useErrorHandler } from '@/presentation/components/hooks'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

import React, { useEffect, useState } from 'react'

import * as S from './styled'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(error => handleError(error))
  }, [state.reload])

  const reload = (): void => setState(old => ({ surveys: [], error: '', reload: !old.reload }))

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
