import { render, RenderResult, screen } from '@testing-library/react'
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
  test('Should present correct initial state', () => {
    makeSut()
    const surveyResult = screen.getByRole('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
  })
})
