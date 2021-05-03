import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/tests'

const makeSut = (): RenderResult => {
  return render(
    <ApiContext.Provider value={ {
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <SurveyResult />]
    </ApiContext.Provider>
  )
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
})
