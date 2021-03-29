import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name]
  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }
  return (
    <S.InputWrap>
      <S.InputStyled
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
      <S.Status role={`${props.name}-status`} title={getTitle()} >{getStatus()}</S.Status>
    </S.InputWrap>
  )
}

export default Input
