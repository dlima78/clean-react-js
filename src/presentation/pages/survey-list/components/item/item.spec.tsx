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
      didAnswer: true
    }
    makeSut(survey)
    expect(screen.getByRole('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByRole('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values ', () => {
    const survey = {
      ...mockSurveyModel(),
      didAnswer: false
    }
    makeSut(survey)
    expect(screen.getByRole('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByRole('question')).toHaveTextContent(survey.question)
  })
})
