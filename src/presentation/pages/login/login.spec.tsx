import React from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, waitFor, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import faker from 'faker'

import { AuthenticationSpy, ValidationStub, UpdateCurrentAccountMock, Helper } from '@/presentation/tests'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  const authenticationSpy = new AuthenticationSpy()
  render(
    <Router history={history} >
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )
  return {
    authenticationSpy,
    updateCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByRole('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.testButtonIsDisable('button', /entrar/i, false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExist('spinner')
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
    Helper.testElementText('main-error', error.message)
  })

  test('Should call UpdateCurrentAccountMock with correct values', async () => {
    const { authenticationSpy, updateCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(updateCurrentAccountMock.account).toBe(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if UpdateCurrentAccount fails', async () => {
    const { updateCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccountMock, 'save')
      .mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testChildCount('error-wrap', 1)
    Helper.testElementText('main-error', error.message)
  })

  test('Should go to signup page', () => {
    makeSut()
    const signup = screen.getByRole('signup')
    userEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
