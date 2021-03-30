import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { AuthenticationSpy, ValidationStub } from '@/presentation/tests'
import Login from './'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    authenticationSpy
  }
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
    userEvent.type(passwordInput, faker.internet.password())
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.password())
    const submitButton = screen.getByRole('button',
      { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    makeSut()
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, faker.internet.email())
    const passwordInput = screen.getByRole('password')
    userEvent.type(passwordInput, faker.internet.password())
    const submitButton = screen.getByRole('button',
      { name: /entrar/i })
    userEvent.click(submitButton)
    const spinner = screen.getByRole('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const emailInput = screen.getByRole('email')
    const email = faker.internet.email()
    userEvent.type(emailInput, email)
    const passwordInput = screen.getByRole('password')
    const password = faker.internet.password()
    userEvent.type(passwordInput, password)
    const submitButton = screen.getByRole('button',
      { name: /entrar/i })
    userEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
