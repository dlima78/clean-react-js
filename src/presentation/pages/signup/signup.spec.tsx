import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { Signup } from '@/presentation/pages'
import { Helper } from '@/presentation/tests'

const makeSut = (): RenderResult => {
  return render(
    <Signup />
  )
}

describe('Signup component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()
    Helper.testChildCount('error-wrap', 0)

    Helper.testButtonIsDisable('button', /Criar Conta/i, true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })
})
