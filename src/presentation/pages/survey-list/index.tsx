import { Footer, Header, Icon, IconName } from '@/presentation/components'
import React from 'react'
import styled from 'styled-components'

const SurveyList: React.FC = () => {
  return (
    <SurveyListWrap>
      <Header />
      <ContentWrap>
        <ContentTitle>Enquetes</ContentTitle>
        <List>
          <ListItem>
            <SurveyContent>
              <Icon iconName={IconName.thumbUp} />
              <Time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </Time>
              <Title>Qual é o seu framework web favorito?</Title>
            </SurveyContent>
            <Button>Ver resultado</Button>
          </ListItem>
          <ListItem>
            <SurveyContent>
              <Icon iconName={IconName.thumbDown} />
              <Time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </Time>
              <Title>Qual é o seu framework web favorito?</Title>
            </SurveyContent>
            <Button>Ver resultado</Button>
          </ListItem>
          <ListItem>
            <SurveyContent>
              <Icon iconName={IconName.thumbUp} />
              <Time>
                <Day>22</Day>
                <Month>03</Month>
                <Year>2020</Year>
              </Time>
              <Title>Qual é o seu framework web favorito?</Title>
            </SurveyContent>
            <Button>Ver resultado</Button>
          </ListItem>
        </List>
      </ContentWrap>
      <Footer />
    </SurveyListWrap>
  )
}

export default SurveyList

const SurveyListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`

const ContentWrap = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 800px;
  padding: 40px;
  width: 100%;
`

const ContentTitle = styled.h3`
  color: var(--primaryDark);
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 24px;
  text-transform: uppercase;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 620px) {
    flex-direction: column;
  }
`

const ListItem = styled.li`
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px var(--black);
  display: flex;
  flex-basis: 49%;
  flex-direction: column;
  height: 240px;
  justify-content: space-between;
  margin-bottom: 24px;

  @media only screen and (max-width: 620px) {
    flex-basis: 100%;
  }
`

const SurveyContent = styled.div`
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  position: relative;

`

const Button = styled.div`
  background: #03a9f4;
  border-radius: 0px 0px 8px 8px;
  color: var(--white);
  cursor: pointer;
  line-height: 40px;
  text-align: center;
  text-transform: lowercase;

  &:hover {
    background: var(--primaryDark);
  }
`

const Time = styled.time`
  align-items: center;
  align-self: center;
  background: #006064;
  border-radius: 24px;
  box-shadow: 6px 8px 0px 0px rgba(0, 0, 0, 0.24);
  color: var(--white);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100px;
  justify-content: center;
  margin-left: 24px;
  width: 100px;
`

const Day = styled.span`
  font-weight: bold;
  font-size: 32px;
`

const Month = styled.span`
  text-transform: lowercase;
  margin: 0px 0px 4px;
`

const Year = styled.span`
  font-size: 16px;
`

const Title = styled.p`
  align-self: center;
  flex-grow: 1;
  font-size: 18px;
  margin: 24px;
`
