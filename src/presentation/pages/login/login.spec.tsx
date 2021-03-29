import React from 'react'
import { render, screen, RenderResult } from '@testing-library/react'
import Login from './'

const makeSut = (): RenderResult => render(<Login />)

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
})
