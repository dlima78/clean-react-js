import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './'

describe('Login Component', () => {
  test('should not render spinner and error on start ', () => {
    render(<Login />)
    const errorWrap = screen.getByRole('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
