import { mockSurveyModel } from '@/domain/tests'
import { IconName } from '@/presentation/components'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, RenderResult, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (survey = mockSurveyModel()): RenderResult => {
  return render(
    <SurveyItem survey={survey} />
  )
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
})
