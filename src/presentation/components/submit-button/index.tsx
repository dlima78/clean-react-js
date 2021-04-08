import React, { useContext } from 'react'

import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)
  return (
    <S.Button disabled={state.isFormInvalid}>{text}</S.Button>
  )
}

export default SubmitButton
