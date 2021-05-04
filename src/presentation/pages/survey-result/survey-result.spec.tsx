import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import React from 'react'

import { mockAccountModel, LoadSurveyResultSpy, mockSurveyResultModel } from '@/domain/tests'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveyResult } from '@/presentation/pages'
import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const history = createMemoryHistory({ initialEntries: ['/', '/surveys/any_id'], initialIndex: 1 })
  render(
    <ApiContext.Provider value={ {
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router history={history} >
        <SurveyResult loadSurveyResult={ loadSurveyResultSpy } />]
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    setCurrentAccountMock,
    history
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
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  test('Should present SurveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2021-01-10T00:00:00')
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByRole('survey-result'))
    expect(screen.getByRole('day')).toHaveTextContent('10')
    expect(screen.getByRole('month')).toHaveTextContent('jan')
    expect(screen.getByRole('year')).toHaveTextContent('2021')
    expect(screen.getByRole('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    const images = screen.getAllByRole('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.getAllByRole('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.getAllByRole('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(error)
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByRole('survey-result'))
    expect(screen.queryByRole('question')).not.toBeInTheDocument()
    expect(screen.queryByRole('loading')).not.toBeInTheDocument()
    expect(screen.getByRole('error')).toHaveTextContent(error.message)
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByRole('survey-result'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByRole('survey-result'))
    fireEvent.click(screen.getByRole('reload'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('survey-result'))
  })

  test('Should goto SurveyList on back button click', async () => {
    const { history } = makeSut()
    await waitFor(() => screen.getByRole('survey-result'))
    fireEvent.click(screen.getByRole('back-button'))
    expect(history.location.pathname).toBe('/')
  })
})
