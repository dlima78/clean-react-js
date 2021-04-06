import React from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, waitFor, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import faker from 'faker'

import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock, Helper } from '@/presentation/tests'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <Router history={history} >
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return {
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(email)
  populatePasswordField(password)
  const form = screen.getByRole('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByRole('email')
  userEvent.type(emailInput, email)
}

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByRole('password')
  userEvent.type(passwordInput, password)
}

const testElementExist = (fieldName: string): void => {
  const element = screen.getByRole(fieldName)
  expect(element).toBeTruthy()
}
const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByRole(fieldName)
  expect(el.textContent).toBe(text)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)

    Helper.testButtonIsDisable('button', /entrar/i, true)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateEmailField()
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populatePasswordField()
    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    populateEmailField()
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()
    Helper.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()
    Helper.testButtonIsDisable('button', /entrar/i, false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    testElementExist('spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    Helper.testChildCount('error-wrap', 1)
    testElementText('main-error', error.message)
  })

  test('Should call SaveAccessToken with correct values', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    Helper.testChildCount('error-wrap', 1)
    testElementText('main-error', error.message)
  })

  test('Should go to signup page', () => {
    makeSut()
    const signup = screen.getByRole('signup')
    userEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
