import React from 'react'
import { render, screen } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'
import { LoadSurveyListSpy } from '@/domain/tests'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(
    <SurveyList loadSurveyList={ loadSurveyListSpy } />
  )
  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  test('Should present four empty items on start ', () => {
    makeSut()
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('Should call loadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
