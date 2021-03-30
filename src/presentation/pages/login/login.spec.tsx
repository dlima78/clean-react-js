import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { ValidationStub } from '@/presentation/tests'
import Login from './'

type SutTypes = {
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  render(<Login validation={validationStub} />)
  return {
    validationStub
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { validationStub } = makeSut()
    const errorWrap = screen.getByRole('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByRole('button',
      { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = screen.getByRole('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut()
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const emailStatus = screen.getByRole('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut()
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.password())
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const emailStatus = screen.getByRole('email-status')
    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.email())
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.email())
    const submitButton = screen.getByRole('button',
      { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
