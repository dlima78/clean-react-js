import React from 'react'

import { Spinner } from '@/presentation/components'
import * as S from './styled'

const Loading: React.FC = () => {
  return (
    <S.LoadingWrap role='loading' >
      <S.LoadingComponent>
        <S.LoadingText>Aguarde...</S.LoadingText>
        <Spinner bgWhite/>
      </S.LoadingComponent>
    </S.LoadingWrap>
  )
}

export default Loading
