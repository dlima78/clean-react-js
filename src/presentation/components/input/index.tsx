import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  const getTitle = (): string => {
    return error || 'Tudo certo'
  }
  return (
    <S.InputWrap>
      <S.InputStyled
        role={props.name}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={e => setState({ ...state, [e.currentTarget.name]: e.currentTarget.value })}
      />
      <S.Status role={`${props.name}-status`} title={getTitle()} >
        {error ? '🔴' : '🟢'}
      </S.Status>
    </S.InputWrap>
  )
}

export default Input
