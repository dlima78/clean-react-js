import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'
import { LoadSurveyListSpy } from '@/domain/tests'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
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
    expect(screen.queryByRole('error')).not.toBeInTheDocument()
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
    expect(screen.queryByRole('error')).not.toBeInTheDocument()
    expect(surveyList.querySelectorAll('li:not(:empty)')).toHaveLength(3)
  })

  test('Should render error on failure', async () => {
    const error = new UnexpectedError()
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByRole('ul')).not.toBeInTheDocument()
    expect(screen.getByRole('error')).toHaveTextContent(error.message)
  })
})
