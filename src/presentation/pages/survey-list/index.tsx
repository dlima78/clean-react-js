import { Footer, Header } from '@/presentation/components'
import React from 'react'
import { SurveyItemEmpty } from './components'

import * as S from './styled'

const SurveyList: React.FC = () => {
  return (
    <S.SurveyListWrap role='survey-list'>
      <Header />
      <S.ContentWrap>
        <S.ContentTitle>Enquetes</S.ContentTitle>
        <S.List>
          <SurveyItemEmpty />
        </S.List>
      </S.ContentWrap>
      <Footer />
    </S.SurveyListWrap>
  )
}

export default SurveyList
