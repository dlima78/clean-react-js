import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    render(<Login />)
    const errorWrap = screen.getByRole('error-wrap')
    const submitButton = screen.getByRole('submit') as HTMLButtonElement
    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
  })
})
