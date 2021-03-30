import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { AuthenticationSpy, ValidationStub } from '@/presentation/tests'
import Login from './'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  sut: RenderResult
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    authenticationSpy,
    sut
  }
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(email)
  populatePasswordField(password)
  const submitButton = screen.getByRole('button',
    { name: /entrar/i })
  userEvent.click(submitButton)
}

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByRole('email')
  userEvent.type(emailInput, email)
}

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByRole('password')
  userEvent.type(passwordInput, password)
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const field = screen.getByRole(`${fieldName}-status`)
  expect(field.title).toBe(validationError || 'Tudo certo')
  expect(field.textContent).toBe(validationError ? '🔴' : '🟢')
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
    simulateStatusForField('email', validationError)
    simulateStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateEmailField()
    simulateStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatePasswordField()
    simulateStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    simulateStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    simulateStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()
    const submitButton = screen.getByRole('button',
      { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    makeSut()
    simulateValidSubmit()
    const spinner = screen.getByRole('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })
})
