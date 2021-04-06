import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import faker from 'faker'

import { Helper, ValidationStub } from '@/presentation/tests'
import { Signup } from '@/presentation/pages'

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): RenderResult => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  return render(
    <Signup validation={validationStub} />
  )
}

describe('Signup component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)

    Helper.testButtonIsDisable('button', /Criar Conta/i, true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })
})
