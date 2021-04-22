import { fireEvent, waitFor, render, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import React from 'react'
import faker from 'faker'

import { ValidationStub, Helper } from '@/presentation/tests'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import { Authentication } from '@/domain/usecases'
import { AuthenticationSpy } from '@/domain/tests'

type SutParams = {
  validationError: string
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const setCurrentAccountMock = jest.fn()
  const authenticationSpy = new AuthenticationSpy()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history} >
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
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
    expect(screen.getByRole('error-wrap').children).toHaveLength(0)
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()
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
    expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByRole('spinner')).toBeInTheDocument()
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
    expect(screen.getByRole('error-wrap').children).toHaveLength(1)
    expect(screen.getByRole('main-error')).toHaveTextContent(error.message)
  })

  test('Should call setCurrentAccount with correct values', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', () => {
    makeSut()
    const signup = screen.getByRole('signup')
    userEvent.click(signup)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
