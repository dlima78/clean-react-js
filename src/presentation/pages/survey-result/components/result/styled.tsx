import styled from 'styled-components'

type Props = {
  active: boolean
}

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

export const ResultItem = styled.li.attrs((props: Props) => ({
  active: props.active
}))<Props>`
  align-items: center;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px var(--black);
  color: var(--greyDark);
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 16px;

  border: ${props => props.active ? '2px solid #006064' : 'none'}; 
`

export const Img = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 16px;

  @media only screen and (max-width: 620px) {
    height: 40px;
    width: 40px;
  }  
`

export const Answer = styled.span`
  margin-right: 16px;
  flex-grow: 1;
  font-size: 20px;

  @media only screen and (max-width: 620px) {
    font-size: 16px;
  }
`

export const Percent = styled.span`
  font-size: 30px;

  @media only screen and (max-width: 620px) {
    font-size: 20px;
  }
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
