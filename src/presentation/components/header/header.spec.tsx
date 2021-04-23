import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { Authentication } from '@/domain/usecases'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  setCurrentAccountMock: (account: Authentication.Model) => void
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  )
  return {
    setCurrentAccountMock,
    history
  }
}

describe('Header Component', () => {
  test('Shoud call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    userEvent.click(screen.getByRole('link', { name: /Sair/i }))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
