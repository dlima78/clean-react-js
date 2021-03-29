import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Validation } from '@/presentation/protocols'
import Login from './'

class ValidationSpy implements Validation {
  errorMessage: string
  input: object
  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  render(<Login validation={validationSpy} />)
  return {
    validationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    makeSut()
    const errorWrap = screen.getByRole('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = screen.getByRole('button',
      { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = screen.getByRole('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = screen.getByRole('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct values', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByRole('email')
    userEvent.type(emailInput, 'any_email')
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })
})
