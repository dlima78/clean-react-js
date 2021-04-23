import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { SurveyList } from '@/presentation/pages'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/tests'
import { UnexpectedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { Router } from 'react-router'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router history={createMemoryHistory()}>
        <SurveyList loadSurveyList={ loadSurveyListSpy } />
      </Router>
    </ApiContext.Provider>
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

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByRole('reload'))
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
