import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const getStatus = (): string => {
    return '🔴'
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const getTitle = (): string => {
    return error
  }
  return (
    <S.InputWrap>
      <S.InputStyled
        role={props.name}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
      <S.Status role={`${props.name}-status`} title={getTitle()} >{getStatus()}</S.Status>
    </S.InputWrap>
  )
}

export default Input
