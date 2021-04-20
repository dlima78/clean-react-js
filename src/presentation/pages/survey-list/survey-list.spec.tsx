import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

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
  test('Should present four empty items on start ', async () => {
    makeSut()
    const surveyList = screen.getByRole('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  test('Should call loadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByRole('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li:not(:empty)')).toHaveLength(3)
  })
})
