import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import React from 'react'

import { LoadSurveyListSpy, mockAccountModel } from '@/domain/tests'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router history={history}>
        <SurveyList loadSurveyList={ loadSurveyListSpy } />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyListSpy,
    setCurrentAccountMock,
    history
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

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByRole('ul')).not.toBeInTheDocument()
    expect(screen.getByRole('error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
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
