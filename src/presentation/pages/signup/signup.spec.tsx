import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import faker from 'faker'

import { Helper, ValidationStub, AddAccountSpy, UpdateCurrentAccountMock } from '@/presentation/tests'
import { EmailInUseError } from '@/domain/errors'
import { Signup } from '@/presentation/pages'
import userEvent from '@testing-library/user-event'

type SutParams = {
  validationError: string
}

type SutTypes = {
  addAccountSpy: AddAccountSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}
const history = createMemoryHistory({ initialEntries: ['/signup'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  validationStub.errorMessage = params?.validationError
  render(
    <Router history={history}>
      <Signup
        validation={validationStub}
        addAccount={addAccountSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )
  return {
    addAccountSpy,
    updateCurrentAccountMock
  }
}

export const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByRole('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)

    Helper.testButtonIsDisable('button', /Criar Conta/i, true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
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

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisable('button', /Criar Conta/i, false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExist('spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add')
      .mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testChildCount('error-wrap', 1)
    Helper.testElementText('main-error', error.message)
  })

  test('Should call UpdateCurrentAccountMock with correct values', async () => {
    const { addAccountSpy, updateCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(updateCurrentAccountMock.account).toBe(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if UpdateCurrentAccountMock fails', async () => {
    const { updateCurrentAccountMock } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(updateCurrentAccountMock, 'save')
      .mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testChildCount('error-wrap', 1)
    Helper.testElementText('main-error', error.message)
  })

  test('Should go to login page', () => {
    makeSut()
    const signup = screen.getByRole('login')
    userEvent.click(signup)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
