import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'
import * as S from './styled'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <S.ErrorWrap role='error-wrap'>
      { isLoading && <S.LoadSpinner />}
      { errorMessage && <S.Error>{ errorMessage }</S.Error> }
    </S.ErrorWrap>
  )
}

export default FormStatus
