import { Footer, Header } from '@/presentation/components'
import React from 'react'
import { SurveyItem, SurveyItemEmpty } from './components'

import * as S from './styled'

const SurveyList: React.FC = () => {
  return (
    <S.SurveyListWrap>
      <Header />
      <S.ContentWrap>
        <S.ContentTitle>Enquetes</S.ContentTitle>
        <S.List>
          <SurveyItem />
          <SurveyItem />
          <SurveyItem />
          <SurveyItemEmpty />
        </S.List>
      </S.ContentWrap>
      <Footer />
    </S.SurveyListWrap>
  )
}

export default SurveyList
