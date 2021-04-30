import { Header, Footer, Loading, Calendar } from '@/presentation/components'
import * as S from './styled'

import React from 'react'
import FlipMove from 'react-flip-move'

const SurveyResult: React.FC = () => {
  return (
    <S.SurveyResultWrap>
      <Header />
      <S.ContentWrap>
        <S.HGroup>
          <Calendar date={new Date()} />
          <S.Question>Qual é o seu framework web favorito?</S.Question>
        </S.HGroup>
        <S.ResultList>
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
          <S.ResultItem>
            <S.Img src='http://fordevs.herokuapp.com/static/img/logo-react.png' />
            <S.Answer>ReactJs</S.Answer>
            <S.Percent>50%</S.Percent>
          </S.ResultItem>
          </FlipMove>
        </S.ResultList>
        <S.Button>Voltar</S.Button>
        <Loading />
      </S.ContentWrap>
      <Footer />
    </S.SurveyResultWrap>
  )
}

export default SurveyResult
