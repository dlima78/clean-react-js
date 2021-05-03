import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { mockAccountModel, LoadSurveyResultSpy } from '@/domain/tests'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <ApiContext.Provider value={ {
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <SurveyResult loadSurveyResult={ loadSurveyResultSpy } />]
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByRole('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByRole('error')).not.toBeInTheDocument()
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByRole('survey-result'))
    expect(loadSurveyResultSpy.callscount).toBe(1)
  })
})
