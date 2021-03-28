import React from 'react'
import * as S from './styled'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <S.InputWrap>
      <S.InputContainer
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
      <S.Status>🔴</S.Status>
    </S.InputWrap>
  )
}

export default Input
