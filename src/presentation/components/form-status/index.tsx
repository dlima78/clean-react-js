import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { isLoading, mainError } = state
  return (
    <S.ErrorWrap role='error-wrap'>
      { isLoading && <S.LoadSpinner role='spinner' />}
      { mainError && <S.Error>{ mainError }</S.Error> }
    </S.ErrorWrap>
  )
}

export default FormStatus
