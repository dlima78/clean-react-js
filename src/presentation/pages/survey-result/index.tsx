import { Header, Footer, Spinner } from '@/presentation/components'
import * as S from './styled'

import React from 'react'
import FlipMove from 'react-flip-move'

const SurveyResult: React.FC = () => {
  return (
    <S.SurveyResultWrap>
      <Header />
      <S.ContentWrap>
        <S.Question>Qual é o seu framework web favorito?</S.Question>
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
        <S.LoadingWrap>
          <S.Loading>
            <S.LoadingText>Aguarde...</S.LoadingText>
            <Spinner bgWhite/>
          </S.Loading>
        </S.LoadingWrap>
      </S.ContentWrap>
      <Footer />
    </S.SurveyResultWrap>
  )
}

export default SurveyResult
