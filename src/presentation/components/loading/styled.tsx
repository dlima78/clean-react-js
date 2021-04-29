import styled from 'styled-components'

export const LoadingWrap = styled.div`
  align-items: center;
  background-color: rgba(255,255,255, 0.5);
  bottom: 0;
  cursor: wait;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

export const LoadingComponent = styled.div`
  align-items: center;  
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
  width: 300px;
`
export const LoadingText = styled.span`
  color: var(--white);
  margin-bottom: 8px;
  text-transform: lowercase;
`
