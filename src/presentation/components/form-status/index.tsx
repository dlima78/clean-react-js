import React from 'react'
import * as S from './styled'

const FormStatus: React.FC = () => {
  return (
    <S.ErrorWrap>
      <S.LoadingSpinner />
      <S.Error>Error</S.Error>
    </S.ErrorWrap>
  )
}

export default FormStatus
