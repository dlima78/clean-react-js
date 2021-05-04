import { mockSurveyModel } from '@/domain/tests'
import { IconName } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )
  return {
    history
  }
}

describe('Name of the group', () => {
  test('Should render with correct values ', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: true,
      date: new Date('2021-01-10T06:00:00Z')
    }
    makeSut(survey)
    expect(screen.getByRole('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByRole('question')).toHaveTextContent(survey.question)
    expect(screen.getByRole('day')).toHaveTextContent('10')
    expect(screen.getByRole('month')).toHaveTextContent('jan')
    expect(screen.getByRole('year')).toHaveTextContent('2021')
  })

  test('Should render with correct values ', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: false,
      date: new Date('2019-06-03T06:00:00Z')
    }
    makeSut(survey)
    expect(screen.getByRole('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByRole('question')).toHaveTextContent(survey.question)
    expect(screen.getByRole('day')).toHaveTextContent('03')
    expect(screen.getByRole('month')).toHaveTextContent('jun')
    expect(screen.getByRole('year')).toHaveTextContent('2019')
  })

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    const { history } = makeSut(survey)
    userEvent.click(screen.getByRole('link'))
    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
