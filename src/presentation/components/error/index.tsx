import React from 'react'
import * as S from './styled'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <S.ErrorWrap>
      <S.ErrorMessage role='error'>{error}</S.ErrorMessage>
      <S.Button role='reload' onClick={reload}>Tentar novamente</S.Button>
    </S.ErrorWrap>
  )
}

export default Error
