import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  const { main } = errorState
  const { isLoading } = state
  return (
    <S.ErrorWrap role='error-wrap'>
      { isLoading && <S.LoadSpinner />}
      { main && <S.Error>{ main }</S.Error> }
    </S.ErrorWrap>
  )
}

export default FormStatus
