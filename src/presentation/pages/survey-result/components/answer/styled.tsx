import styled from 'styled-components'

type Props = {
  active: boolean
}

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
