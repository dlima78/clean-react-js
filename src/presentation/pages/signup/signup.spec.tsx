import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'

import { Signup } from '@/presentation/pages'

const makeSut = (): RenderResult => {
  return render(
    <Signup />
  )
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByRole(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testChildCount = (field: string, count: number): void => {
  const el = screen.getByRole(field)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisable = (fieldName: string, buttonName: RegExp, isDisabled: boolean): void => {
  const button = screen.getByRole(fieldName, { name: buttonName }) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Signup component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()
    testChildCount('error-wrap', 0)

    testButtonIsDisable('button', /Criar Conta/i, true)
    testStatusForField('name', validationError)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
    testStatusForField('passwordConfirmation', validationError)
  })
})
