import styled from 'styled-components'

export const Question = styled.h2`
  color: var(--primaryDark);
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;
  margin-left: 16px;
  text-transform: uppercase;

  @media only screen and (max-width: 620px) {
    font-size: 16px;
  }
`
export const HGroup = styled.hgroup`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
`
export const ResultList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`
export const Button = styled.button`
  background: #006064;
  border: none;
  border-radius: 4px;
  color: var(--white);
  margin-top: 24px;
  padding: 16px;

  &:hover {
    background: #00838f;
  }
`
