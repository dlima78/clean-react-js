import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { ValidationStub } from '@/presentation/tests'
import Login from './'

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): RenderResult => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  return render(<Login validation={validationStub} />)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const errorWrap = screen.getByRole('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByRole('button',
      { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = screen.getByRole('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const emailStatus = screen.getByRole('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.password())
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const emailStatus = screen.getByRole('email-status')
    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.email())
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.email())
    const submitButton = screen.getByRole('button',
      { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
