import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'

const makeSut = (): RenderResult => {
  return render(
    <SurveyList />
  )
}

describe('SurveyList Component', () => {
  test('Should present four empty items on start ', () => {
    makeSut()
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
