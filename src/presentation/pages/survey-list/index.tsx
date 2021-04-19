import { Footer, Header, Icon, IconName } from '@/presentation/components'
import React from 'react'

import * as S from './styled'

const SurveyList: React.FC = () => {
  return (
    <S.SurveyListWrap>
      <Header />
      <S.ContentWrap>
        <S.ContentTitle>Enquetes</S.ContentTitle>
        <S.List>
          <S.ListItem>
            <S.SurveyContent>
              <Icon iconName={IconName.thumbUp} />
              <S.Time>
                <S.Day>22</S.Day>
                <S.Month>03</S.Month>
                <S.Year>2020</S.Year>
              </S.Time>
              <S.Title>Qual é o seu framework web favorito?</S.Title>
            </S.SurveyContent>
            <S.Button>Ver resultado</S.Button>
          </S.ListItem>
          <S.ListItem></S.ListItem>
        </S.List>
      </S.ContentWrap>
      <Footer />
    </S.SurveyListWrap>
  )
}

export default SurveyList
