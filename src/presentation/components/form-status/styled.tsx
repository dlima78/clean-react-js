import styled from 'styled-components'
import Spinner from '@/presentation/components/spinner'

export const ErrorWrap = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
export const LoadSpinner = styled(Spinner)`
  margin-top: 30px;
`
export const Error = styled.span`
  margin-top: 30px;
  color: var(--invalid);
  font-size: 14px;
`
