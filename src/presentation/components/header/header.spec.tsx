import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { mockAccountModel } from '@/domain/tests'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => account
    }}>
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

  test('Shoud render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByRole('username')).toHaveTextContent(account.name)
  })
})
