import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {
  fireEvent,
  waitFor,
  render,
  screen
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import 'jest-localstorage-mock'

import { AuthenticationSpy, ValidationStub } from '@/presentation/tests'
import { InvalidCredentialsError } from '@/domain/errors'
import Login from './'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
}

const history = createMemoryHistory()
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <Router history={history} >
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )
  return {
    authenticationSpy
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
  beforeEach(() => {
    localStorage.clear()
  })
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

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    populateEmailField()
    fireEvent.submit(screen.getByRole('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    simulateValidSubmit()
    const errorWrap = screen.getByRole('error-wrap')
    await waitFor(() => errorWrap)
    const mainError = screen.getByRole('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    await waitFor(() => screen.getByRole('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  test('Should go to signup page', () => {
    makeSut()
    const signup = screen.getByRole('signup')
    userEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
